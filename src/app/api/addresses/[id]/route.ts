import { NextRequest, NextResponse } from 'next/server';
import { convex, convexServerAuth } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
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
 * PUT /api/addresses/[id]
 * Update een bestaand adres
 */
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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

    // Update address (Convex mutation verifies ownership and handles default unsetting)
    try {
      await convex.mutation(api.savedAddresses.update, {
        ...convexServerAuth(),
        id: params.id as Id<"savedAddresses">,
        user_id: user.id,
        ...address,
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
    if (error instanceof RequestBodyTooLargeError) {
      return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 });
    }
    if (error instanceof InvalidRequestBodyError) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
    console.error('Update address error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update address',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/addresses/[id]
 * Verwijder een adres
 */
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
        ...convexServerAuth(),
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
      },
      { status: 500 }
    );
  }
}
