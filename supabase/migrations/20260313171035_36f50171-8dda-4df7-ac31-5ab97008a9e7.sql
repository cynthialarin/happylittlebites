
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: users can read their own, admin can read all
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed admin role for cynthialarin76@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'cynthialarin76@gmail.com'
ON CONFLICT DO NOTHING;

-- Create feedback_tickets table
CREATE TABLE public.feedback_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'feedback',
  description text NOT NULL,
  priority text NOT NULL DEFAULT 'medium',
  screenshots text[] NOT NULL DEFAULT '{}',
  wants_response boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  admin_notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback_tickets ENABLE ROW LEVEL SECURITY;

-- Users can insert their own tickets
CREATE POLICY "Users can insert own tickets" ON public.feedback_tickets
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own tickets
CREATE POLICY "Users can view own tickets" ON public.feedback_tickets
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Admin can view all tickets
CREATE POLICY "Admin can view all tickets" ON public.feedback_tickets
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin can update all tickets
CREATE POLICY "Admin can update all tickets" ON public.feedback_tickets
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create feedback_replies table
CREATE TABLE public.feedback_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES public.feedback_tickets(id) ON DELETE CASCADE NOT NULL,
  admin_id uuid NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback_replies ENABLE ROW LEVEL SECURITY;

-- Admin can insert replies
CREATE POLICY "Admin can insert replies" ON public.feedback_replies
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin can view all replies
CREATE POLICY "Admin can view all replies" ON public.feedback_replies
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Users can view replies on their own tickets
CREATE POLICY "Users can view replies on own tickets" ON public.feedback_replies
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.feedback_tickets
      WHERE feedback_tickets.id = feedback_replies.ticket_id
      AND feedback_tickets.user_id = auth.uid()
    )
  );

-- Create feedback-attachments storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('feedback-attachments', 'feedback-attachments', true);

-- Storage RLS: authenticated users can upload
CREATE POLICY "Authenticated users can upload feedback attachments"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'feedback-attachments');

-- Anyone can view feedback attachments (public bucket)
CREATE POLICY "Anyone can view feedback attachments"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'feedback-attachments');

-- Admin function to get all profiles (bypasses RLS)
CREATE OR REPLACE FUNCTION public.admin_get_all_profiles()
RETURNS SETOF public.profiles
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.profiles
$$;

-- Admin function to get all children counts
CREATE OR REPLACE FUNCTION public.admin_get_user_stats()
RETURNS TABLE(
  user_id uuid,
  children_count bigint,
  diary_entries_count bigint,
  feedback_count bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.user_id,
    (SELECT COUNT(*) FROM public.children c WHERE c.user_id = p.user_id),
    (SELECT COUNT(*) FROM public.diary_entries d WHERE d.user_id = p.user_id),
    (SELECT COUNT(*) FROM public.feedback_tickets f WHERE f.user_id = p.user_id)
  FROM public.profiles p
$$;

-- Admin function to get user emails (from auth.users)
CREATE OR REPLACE FUNCTION public.admin_get_user_emails()
RETURNS TABLE(id uuid, email text, created_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT au.id, au.email::text, au.created_at
  FROM auth.users au
$$;
