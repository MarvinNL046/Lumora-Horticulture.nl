-- Update existing orders with order numbers
-- Run this manually in your Neon database console

-- Update orders with sequential numbers based on created_at
WITH numbered_orders AS (
  SELECT
    id,
    ROW_NUMBER() OVER (ORDER BY created_at) as row_num,
    EXTRACT(YEAR FROM created_at) as year
  FROM orders
  WHERE order_number IS NULL
)
UPDATE orders
SET order_number = CONCAT('ORD-', numbered_orders.year, '-', LPAD(numbered_orders.row_num::TEXT, 4, '0'))
FROM numbered_orders
WHERE orders.id = numbered_orders.id;
