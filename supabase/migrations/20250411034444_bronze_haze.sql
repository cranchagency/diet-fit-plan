/*
  # Update subscriptions table and policies

  1. Table Structure
    - `subscriptions`
      - `id` (uuid, primary key)
      - `email` (text)
      - `accountId` (text, unique)
      - `token` (text)
      - `currentWeek` (integer)
      - `subscriptionActive` (boolean)
      - `createdAt` (timestamp)
  
  2. Security
    - Enable RLS
    - Add service role policy
  
  3. Indexes
    - Email index
    - AccountId index
*/

-- Create table if not exists
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  accountId text NOT NULL UNIQUE,
  token text,
  currentWeek integer DEFAULT 1,
  subscriptionActive boolean DEFAULT true,
  createdAt timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscriptions' 
    AND policyname = 'Service can manage subscriptions'
  ) THEN
    CREATE POLICY "Service can manage subscriptions"
      ON subscriptions
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Create indexes if not exist
CREATE INDEX IF NOT EXISTS subscriptions_email_idx ON subscriptions(email);
CREATE INDEX IF NOT EXISTS subscriptions_accountId_idx ON subscriptions(accountId);