/*
  # Create subscriptions table

  1. New Tables
    - `subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `accountId` (text, not null, unique)
      - `token` (text)
      - `currentWeek` (integer, default: 1)
      - `subscriptionActive` (boolean, default: true)
      - `createdAt` (timestamp with time zone, default: now())

  2. Security
    - Enable RLS on `subscriptions` table
    - Add policy for service role to manage subscriptions
*/

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  accountId text NOT NULL UNIQUE,
  token text,
  currentWeek integer DEFAULT 1,
  subscriptionActive boolean DEFAULT true,
  createdAt timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service can manage subscriptions"
  ON subscriptions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX subscriptions_email_idx ON subscriptions(email);
CREATE INDEX subscriptions_accountId_idx ON subscriptions(accountId);