import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  // Deliberately disabled: the old endpoint disclosed whether someone had
  // ordered before and returned their name and phone number to any caller.
  return NextResponse.json(
    { success: false, error: 'Email lookup is no longer available' },
    {
      status: 410,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
