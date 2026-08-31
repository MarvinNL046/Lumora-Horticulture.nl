import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireServerSecret } from "./lib/serverSecret";
import { savedAddressValidator } from "./validators";

const MAX_ADDRESSES_PER_USER = 10;

function validateAddressFields(fields: {
  user_id?: string;
  name?: string;
  street?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
}): void {
  if (fields.user_id !== undefined && (fields.user_id.length < 1 || fields.user_id.length > 200)) {
    throw new Error("Invalid user id");
  }
  const limits: Array<[string | undefined, number, number]> = [
    [fields.name, 1, 100],
    [fields.street, 2, 200],
    [fields.city, 2, 100],
    [fields.postal_code, 3, 20],
    [fields.phone, 3, 40],
  ];
  for (const [value, minimum, maximum] of limits) {
    if (value !== undefined && (value.trim().length < minimum || value.length > maximum)) {
      throw new Error("Invalid address field");
    }
  }
  if (fields.country !== undefined && !["NL", "BE", "DE"].includes(fields.country)) {
    throw new Error("Invalid country");
  }
}

export const list = query({
  args: { server_secret: v.string(), user_id: v.string() },
  returns: v.array(savedAddressValidator),
  handler: async (ctx, { server_secret, user_id }) => {
    requireServerSecret(server_secret);
    const addresses = await ctx.db
      .query("savedAddresses")
      .withIndex("by_user", (q) => q.eq("user_id", user_id))
      .take(25);

    // Sort by is_default descending (defaults first)
    addresses.sort((a, b) => {
      const aDefault = a.is_default ? 1 : 0;
      const bDefault = b.is_default ? 1 : 0;
      return bDefault - aDefault;
    });

    return addresses;
  },
});

export const create = mutation({
  args: {
    server_secret: v.string(),
    user_id: v.string(),
    name: v.string(),
    street: v.string(),
    city: v.string(),
    postal_code: v.string(),
    country: v.string(),
    phone: v.optional(v.string()),
    is_default: v.optional(v.boolean()),
  },
  returns: v.id("savedAddresses"),
  handler: async (ctx, { server_secret, ...args }) => {
    requireServerSecret(server_secret);
    validateAddressFields(args);
    const currentAddresses = await ctx.db
      .query("savedAddresses")
      .withIndex("by_user", (q) => q.eq("user_id", args.user_id))
      .take(MAX_ADDRESSES_PER_USER + 1);
    if (currentAddresses.length >= MAX_ADDRESSES_PER_USER) {
      throw new Error("Address limit reached");
    }
    // If this address is default, unset other defaults for this user
    if (args.is_default) {
      const existing = await ctx.db
        .query("savedAddresses")
        .withIndex("by_user", (q) => q.eq("user_id", args.user_id))
        .take(25);

      for (const addr of existing) {
        if (addr.is_default) {
          await ctx.db.patch(addr._id, { is_default: false });
        }
      }
    }

    const now = Date.now();
    return await ctx.db.insert("savedAddresses", {
      ...args,
      created_at: now,
      updated_at: now,
    });
  },
});

export const update = mutation({
  args: {
    server_secret: v.string(),
    id: v.id("savedAddresses"),
    user_id: v.string(),
    name: v.optional(v.string()),
    street: v.optional(v.string()),
    city: v.optional(v.string()),
    postal_code: v.optional(v.string()),
    country: v.optional(v.string()),
    phone: v.optional(v.string()),
    is_default: v.optional(v.boolean()),
  },
  returns: v.null(),
  handler: async (ctx, { server_secret, id, user_id, ...fields }) => {
    requireServerSecret(server_secret);
    validateAddressFields({ user_id, ...fields });
    // Verify ownership
    const address = await ctx.db.get(id);
    if (!address || address.user_id !== user_id) {
      throw new Error("Address not found or not owned by user");
    }

    // If setting as default, unset other defaults
    if (fields.is_default) {
      const existing = await ctx.db
        .query("savedAddresses")
        .withIndex("by_user", (q) => q.eq("user_id", user_id))
        .take(25);

      for (const addr of existing) {
        if (addr._id !== id && addr.is_default) {
          await ctx.db.patch(addr._id, { is_default: false });
        }
      }
    }

    const patch: Record<string, unknown> = { updated_at: Date.now() };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    await ctx.db.patch(id, patch);
    return null;
  },
});

export const remove = mutation({
  args: {
    server_secret: v.string(),
    id: v.id("savedAddresses"),
    user_id: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, { server_secret, id, user_id }) => {
    requireServerSecret(server_secret);
    const address = await ctx.db.get(id);
    if (!address || address.user_id !== user_id) {
      throw new Error("Address not found or not owned by user");
    }
    await ctx.db.delete(id);
    return null;
  },
});
