import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import PhotoCropDialog from './PhotoCropDialog';

interface ChildAvatarProps {
  photoUrl?: string;
  emoji: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
  onPhotoSelect?: (file: File) => void;
  className?: string;
}

const sizes = {
  sm: 'w-8 h-8 text-base',
  md: 'w-10 h-10 text-xl',
  lg: 'w-16 h-16 text-3xl',
};

export default function ChildAvatar({ photoUrl, emoji, name, size = 'md', editable, onPhotoSelect, className }: ChildAvatarProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return;
    const url = URL.createObjectURL(file);
    setCropSrc(url);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleCropComplete = (croppedFile: File) => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    onPhotoSelect?.(croppedFile);
  };

  const handleCropClose = () => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
  };

  const sizeClass = sizes[size];

  const content = photoUrl ? (
    <img src={photoUrl} alt={name} className={cn("rounded-full object-cover", sizeClass, className)} />
  ) : (
    <span className={cn("rounded-full bg-muted flex items-center justify-center", sizeClass, className)}>
      {emoji}
    </span>
  );

  if (!editable) return content;

  return (
    <>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="relative group"
      >
        {content}
        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="h-4 w-4 text-white" />
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </button>

      {cropSrc && (
        <PhotoCropDialog
          open={!!cropSrc}
          imageSrc={cropSrc}
          onClose={handleCropClose}
          onCropComplete={handleCropComplete}
        />
      )}
    </>
  );
}