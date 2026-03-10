import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface FoodImageProps {
  type: 'food' | 'recipe';
  id: string;
  name: string;
  description?: string;
  fallbackEmoji?: string;
  className?: string;
  /** If true, only show cached images — don't trigger generation */
  cacheOnly?: boolean;
}

async function checkCachedImage(type: string, id: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from('food-images')
    .list(type, { search: `${id}.png`, limit: 1 });

  if (error || !data || data.length === 0) {
    return null;
  }

  // File exists — return the public URL
  const filePath = `${type}/${id}.png`;
  const { data: publicUrlData } = supabase.storage
    .from('food-images')
    .getPublicUrl(filePath);
  return publicUrlData.publicUrl;
}

async function fetchFoodImage(
  type: string,
  id: string,
  name: string,
  description?: string,
  cacheOnly?: boolean
): Promise<string | null> {
  // Check if image already exists in storage using signed URL (reliable existence check)
  const cached = await checkCachedImage(type, id);
  if (cached) return cached;

  // In cache-only mode (grid views), don't trigger generation
  if (cacheOnly) return null;

  // Call edge function to generate
  const { data, error } = await supabase.functions.invoke('generate-food-image', {
    body: { type, id, name, description },
  });

  if (error || !data?.url) {
    const errorMsg = data?.error || error?.message || 'Unknown error';

    if (data?.error === 'Rate limited, please try again later') {
      toast({
        title: 'Image generation busy',
        description: 'Too many images being generated. Try again in a moment.',
        variant: 'destructive',
      });
    } else if (data?.error === 'AI credits exhausted') {
      toast({
        title: 'Image generation unavailable',
        description: 'AI image credits have been used up.',
        variant: 'destructive',
      });
    }

    console.error('FoodImage generation failed:', errorMsg);
    return null;
  }

  return data.url;
}

export default function FoodImage({
  type,
  id,
  name,
  description,
  fallbackEmoji,
  className,
  cacheOnly = false,
}: FoodImageProps) {
  const [imgError, setImgError] = useState(false);

  const { data: imageUrl, isLoading } = useQuery({
    queryKey: ['food-image', type, id, cacheOnly ? 'cache' : 'full'],
    queryFn: () => fetchFoodImage(type, id, name, description, cacheOnly),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    retry: cacheOnly ? 0 : 1,
  });

  // In cache-only mode, don't show skeleton — just show emoji or nothing
  if (cacheOnly && (isLoading || !imageUrl || imgError)) {
    if (fallbackEmoji) {
      return <span className={className}>{fallbackEmoji}</span>;
    }
    return null;
  }

  if (isLoading) {
    return <Skeleton className={cn('rounded-xl', className)} />;
  }

  if (!imageUrl || imgError) {
    if (fallbackEmoji) {
      return <span className={className}>{fallbackEmoji}</span>;
    }
    return null;
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      className={cn('object-cover rounded-xl', className)}
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}
