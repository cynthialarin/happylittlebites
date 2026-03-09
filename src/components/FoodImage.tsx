import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface FoodImageProps {
  type: 'food' | 'recipe';
  id: string;
  name: string;
  description?: string;
  fallbackEmoji?: string;
  className?: string;
}

async function fetchFoodImage(type: string, id: string, name: string, description?: string): Promise<string | null> {
  // First check if image already exists in storage
  const { data: publicUrlData } = supabase.storage
    .from('food-images')
    .getPublicUrl(`${type}/${id}.png`);

  // Try to fetch the image to see if it exists
  try {
    const checkResponse = await fetch(publicUrlData.publicUrl, { method: 'HEAD' });
    if (checkResponse.ok) {
      return publicUrlData.publicUrl;
    }
  } catch {
    // Image doesn't exist, generate it
  }

  // Call edge function to generate
  const { data, error } = await supabase.functions.invoke('generate-food-image', {
    body: { type, id, name, description },
  });

  if (error || !data?.url) {
    console.error('FoodImage generation failed:', error || data?.error);
    return null;
  }

  return data.url;
}

export default function FoodImage({ type, id, name, description, fallbackEmoji, className }: FoodImageProps) {
  const [imgError, setImgError] = useState(false);

  const { data: imageUrl, isLoading } = useQuery({
    queryKey: ['food-image', type, id],
    queryFn: () => fetchFoodImage(type, id, name, description),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 1,
  });

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
