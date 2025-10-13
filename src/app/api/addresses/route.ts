import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { savedAddresses } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { stackServerApp } from '@/stack/server';

/**
 * GET /api/addresses
 * Haal alle opgeslagen adressen van de ingelogde user op
 */
export async function GET(request: NextRequest) {
  try {
    // Check if user is logged in
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Fetch all addresses for this user
    const addresses = await db
      .select()
      .from(savedAddresses)
      .where(eq(savedAddresses.user_id, user.id))
      .orderBy(sql`is_default DESC, created_at DESC`);

    return NextResponse.json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error('Get addresses error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch addresses',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/addresses
 * Voeg een nieuw adres toe
 */
export async function POST(request: NextRequest) {
  try {
    // Check if user is logged in
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, street, city, postal_code, country, phone, is_default } = body;

    // Validation
    if (!name || !street || !city || !postal_code || !country) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If this is set as default, unset all other default addresses
    if (is_default) {
      await db
        .update(savedAddresses)
        .set({ is_default: false })
        .where(eq(savedAddresses.user_id, user.id));
    }

    // Create new address
    const [address] = await db
      .insert(savedAddresses)
      .values({
        user_id: user.id,
        name,
        street,
        city,
        postal_code,
        country,
        phone: phone || null,
        is_default: is_default || false,
      })
      .returning();

    return NextResponse.json({
      success: true,
      address,
    });
  } catch (error) {
    console.error('Create address error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create address',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
