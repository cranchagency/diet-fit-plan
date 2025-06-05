/*
  # Update subscriptions table schema

  1. Changes
    - Add test_mode column for tracking test payments
  
  2. Notes
    - The account_id column is already in the correct format
    - Adding test_mode column with default false value
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'subscriptions' AND column_name = 'test_mode'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN test_mode boolean DEFAULT false;
  END IF;
END $$;