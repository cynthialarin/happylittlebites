import { useState, useRef, useCallback } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PhotoCropDialogProps {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 80 }, 1, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export default function PhotoCropDialog({ open, imageSrc, onClose, onCropComplete }: PhotoCropDialogProps) {
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setCrop(centerAspectCrop(naturalWidth, naturalHeight));
  }, []);

  const handleSave = useCallback(async () => {
    const image = imgRef.current;
    if (!image || !crop) return;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelCrop = {
      x: (crop.unit === '%' ? (crop.x / 100) * image.width : crop.x) * scaleX,
      y: (crop.unit === '%' ? (crop.y / 100) * image.height : crop.y) * scaleY,
      width: (crop.unit === '%' ? (crop.width / 100) * image.width : crop.width) * scaleX,
      height: (crop.unit === '%' ? (crop.height / 100) * image.height : crop.height) * scaleY,
    };

    const size = Math.min(pixelCrop.width, pixelCrop.height, 512);
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      image,
      pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
      0, 0, size, size
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        onCropComplete(file);
      }
    }, 'image/jpeg', 0.9);
  }, [crop, onCropComplete]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle>Crop Photo</DialogTitle>
          <DialogDescription>Drag to position your baby's face in the circle</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <ReactCrop
            crop={crop}
            onChange={setCrop}
            aspect={1}
            circularCrop
            className="max-h-[50vh]"
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop preview"
              onLoad={onImageLoad}
              className="max-h-[50vh] w-auto"
            />
          </ReactCrop>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 rounded-full" onClick={onClose}>Cancel</Button>
          <Button className="flex-1 rounded-full" onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}