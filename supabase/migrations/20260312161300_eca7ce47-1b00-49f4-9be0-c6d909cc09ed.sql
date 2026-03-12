-- Fix search_path on functions
CREATE OR REPLACE FUNCTION public.increment_post_likes(post_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.community_posts SET likes = likes + 1 WHERE id = post_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_reply_count(post_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.community_posts SET reply_count = reply_count + 1 WHERE id = post_id;
END;
$$;