ALTER TABLE public.diary_entries ADD COLUMN photo_url text DEFAULT NULL;

-- Create diary-photos storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('diary-photos', 'diary-photos', true);

-- Allow authenticated users to upload to diary-photos
CREATE POLICY "Users can upload diary photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'diary-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public read access to diary photos
CREATE POLICY "Public read access for diary photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'diary-photos');

-- Allow users to delete their own diary photos
CREATE POLICY "Users can delete own diary photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'diary-photos' AND (storage.foldername(name))[1] = auth.uid()::text);