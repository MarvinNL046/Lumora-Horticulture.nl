import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { stackServerApp } from '@/stack/server';

export const dynamic = 'force-dynamic';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * PUT /api/addresses/[id]
 * Update een bestaand adres
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Update address (Convex mutation verifies ownership and handles default unsetting)
    try {
      await convex.mutation(api.savedAddresses.update, {
        id: params.id as Id<"savedAddresses">,
        user_id: user.id,
        name,
        street,
        city,
        postal_code,
        country,
        phone: phone || undefined,
        is_default: is_default || false,
      });
    } catch (err) {
      return NextResponse.json(
        { success: false, error: 'Address not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      address: { _id: params.id },
    });
  } catch (error) {
    console.error('Update address error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update address',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/addresses/[id]
 * Verwijder een adres
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is logged in
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Delete address (Convex mutation verifies ownership)
    try {
      await convex.mutation(api.savedAddresses.remove, {
        id: params.id as Id<"savedAddresses">,
        user_id: user.id,
      });
    } catch (err) {
      return NextResponse.json(
        { success: false, error: 'Address not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Address deleted',
    });
  } catch (error) {
    console.error('Delete address error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete address',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
