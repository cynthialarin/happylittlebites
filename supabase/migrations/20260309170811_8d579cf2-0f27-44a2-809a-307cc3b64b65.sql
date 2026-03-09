
-- Create public storage bucket for AI-generated food images
INSERT INTO storage.buckets (id, name, public) VALUES ('food-images', 'food-images', true);

-- Allow public read access to food images
CREATE POLICY "Food images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'food-images');

-- Allow edge functions (service role) to upload food images - using anon for edge function uploads
CREATE POLICY "Allow public upload to food-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'food-images');

-- Allow updates to food-images bucket
CREATE POLICY "Allow public update to food-images" ON storage.objects FOR UPDATE USING (bucket_id = 'food-images');
