-- Cleanup test orders that were never completed
-- This will delete all pending orders and their items

-- First delete the order items for pending orders
DELETE FROM order_items
WHERE order_id IN (
  SELECT id FROM orders WHERE payment_status = 'pending'
);

-- Then delete the pending orders themselves
DELETE FROM orders
WHERE payment_status = 'pending';

-- Verify what's left
SELECT
  id,
  order_number,
  customer_name,
  status,
  payment_status,
  total_amount,
  created_at
FROM orders
ORDER BY created_at DESC;
