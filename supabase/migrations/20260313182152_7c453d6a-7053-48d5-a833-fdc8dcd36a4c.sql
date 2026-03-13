
-- Admin notifications table
CREATE TABLE public.admin_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'new_feedback',
  title text NOT NULL,
  message text NOT NULL DEFAULT '',
  reference_id uuid,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- Only admins can view/update notifications
CREATE POLICY "Admin can view notifications"
  ON public.admin_notifications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update notifications"
  ON public.admin_notifications FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger function to create notification on new feedback ticket
CREATE OR REPLACE FUNCTION public.notify_admin_new_feedback()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.admin_notifications (type, title, message, reference_id)
  VALUES (
    'new_feedback',
    'New ' || INITCAP(NEW.category) || ' Ticket',
    LEFT(NEW.description, 100),
    NEW.id
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_new_feedback_ticket
  AFTER INSERT ON public.feedback_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_new_feedback();
