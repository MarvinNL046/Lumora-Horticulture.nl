import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { savedAddresses } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { stackServerApp } from '@/stack/server';

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

    // If this is set as default, unset all other default addresses
    if (is_default) {
      await db
        .update(savedAddresses)
        .set({ is_default: false })
        .where(eq(savedAddresses.user_id, user.id));
    }

    // Update address (only if it belongs to the user)
    const [address] = await db
      .update(savedAddresses)
      .set({
        name,
        street,
        city,
        postal_code,
        country,
        phone: phone || null,
        is_default: is_default || false,
        updated_at: sql`NOW()`,
      })
      .where(
        and(
          eq(savedAddresses.id, params.id),
          eq(savedAddresses.user_id, user.id)
        )
      )
      .returning();

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      address,
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

    // Delete address (only if it belongs to the user)
    const [deleted] = await db
      .delete(savedAddresses)
      .where(
        and(
          eq(savedAddresses.id, params.id),
          eq(savedAddresses.user_id, user.id)
        )
      )
      .returning();

    if (!deleted) {
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
