ALTER TABLE public.children ADD COLUMN photo_url text DEFAULT NULL;

INSERT INTO storage.buckets (id, name, public) VALUES ('child-photos', 'child-photos', true);

CREATE POLICY "Users can upload child photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'child-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Public read access for child photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'child-photos');

CREATE POLICY "Users can update own child photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'child-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete own child photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'child-photos' AND (storage.foldername(name))[1] = auth.uid()::text);