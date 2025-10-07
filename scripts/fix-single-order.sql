-- Update the single existing order with order number ORD-2025-0001
UPDATE orders
SET order_number = 'ORD-2025-0001'
WHERE id = (
  SELECT id
  FROM orders
  WHERE order_number IS NULL
  ORDER BY created_at
  LIMIT 1
);
