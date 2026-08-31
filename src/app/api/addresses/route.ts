import { NextRequest, NextResponse } from 'next/server';
import { convex, convexServerAuth } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { stackServerApp } from '@/stack/server';
import {
  InvalidRequestBodyError,
  readLimitedJson,
  RequestBodyTooLargeError,
} from '@/lib/limited-json';
import { parseSavedAddressInput } from '@/lib/saved-address-input';

export const dynamic = 'force-dynamic';
const MAX_ADDRESS_BODY_BYTES = 10_000;

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
    const addresses = await convex.query(api.savedAddresses.list, {
      ...convexServerAuth(),
      user_id: user.id,
    });

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

    const body = await readLimitedJson(request, MAX_ADDRESS_BODY_BYTES);
    const address = parseSavedAddressInput(body);

    // Validation
    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new address (Convex mutation handles unsetting other defaults)
    const addressId = await convex.mutation(api.savedAddresses.create, {
      ...convexServerAuth(),
      user_id: user.id,
      ...address,
    });

    return NextResponse.json({
      success: true,
      address: { _id: addressId },
    });
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 });
    }
    if (error instanceof InvalidRequestBodyError) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
    console.error('Create address error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create address',
      },
      { status: 500 }
    );
  }
}
