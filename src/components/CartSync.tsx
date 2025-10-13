'use client';

import { useEffect, Suspense } from 'react';
import { useUser } from '@stackframe/stack';
import { useCart } from '@/contexts/CartContext';

/**
 * Inner component that uses useUser hook
 */
function CartSyncInner() {
  const user = useUser({ or: 'return-null' });
  const { loadCartFromDatabase } = useCart();

  useEffect(() => {
    if (user) {
      // Load cart from database when user is logged in
      loadCartFromDatabase();
    }
  }, [user, loadCartFromDatabase]);

  return null;
}

/**
 * Component that syncs cart from database when user logs in
 * Wrapped in Suspense to handle SSR properly
 */
export default function CartSync() {
  return (
    <Suspense fallback={null}>
      <CartSyncInner />
    </Suspense>
  );
}
