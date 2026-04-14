import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../convex/_generated/api';
import { stackServerApp } from '@/stack/server';

export const dynamic = 'force-dynamic';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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

    // Create new address (Convex mutation handles unsetting other defaults)
    const addressId = await convex.mutation(api.savedAddresses.create, {
      user_id: user.id,
      name,
      street,
      city,
      postal_code,
      country,
      phone: phone || undefined,
      is_default: is_default || false,
    });

    return NextResponse.json({
      success: true,
      address: { _id: addressId },
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
