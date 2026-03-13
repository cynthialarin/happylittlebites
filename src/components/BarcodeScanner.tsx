import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, ScanBarcode } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

export interface ScannedProduct {
  name: string;
  brand: string | null;
  category: string;
  emoji: string;
  imageUrl: string | null;
  barcode: string;
}

interface BarcodeScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductScanned: (product: ScannedProduct) => void;
}

export default function BarcodeScanner({ open, onOpenChange, onProductScanned }: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [product, setProduct] = useState<ScannedProduct | null>(null);
  const scannerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setProduct(null);
      setLookingUp(false);
      setScanning(false);
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
      return;
    }

    let cancelled = false;
    const startScanner = async () => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        if (cancelled) return;

        const scanner = new Html5Qrcode('barcode-reader');
        scannerRef.current = scanner;
        setScanning(true);

        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 280, height: 120 },
            aspectRatio: 1.6,
          },
          async (decodedText) => {
            // Stop scanning on first detection
            await scanner.stop().catch(() => {});
            scannerRef.current = null;
            setScanning(false);
            handleBarcode(decodedText);
          },
          () => {} // ignore scan failures
        );
      } catch (err) {
        console.error('Scanner start error:', err);
        if (!cancelled) {
          toast('Camera access needed', { description: 'Please allow camera access to scan barcodes.' });
          setScanning(false);
        }
      }
    };

    // Small delay to let dialog render
    const timer = setTimeout(startScanner, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [open]);

  const handleBarcode = async (code: string) => {
    setLookingUp(true);
    try {
      const { data, error } = await supabase.functions.invoke('lookup-upc', {
        body: { barcode: code },
      });
      if (error) throw error;
      if (!data?.found) {
        toast('Product not found', { description: `Barcode ${code} not recognized. Try manual entry.` });
        onOpenChange(false);
        return;
      }
      setProduct(data.product as ScannedProduct);
    } catch (err: any) {
      console.error('UPC lookup error:', err);
      toast('Lookup failed', { description: err?.message || 'Please try again' });
      onOpenChange(false);
    } finally {
      setLookingUp(false);
    }
  };

  const handleConfirm = () => {
    if (product) {
      onProductScanned(product);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ScanBarcode className="h-5 w-5" /> Scan Barcode
          </DialogTitle>
          <DialogDescription>
            {!product ? 'Point your camera at a barcode on any baby food, formula, or diaper package' : 'Confirm the product details'}
          </DialogDescription>
        </DialogHeader>

        {!product && !lookingUp && (
          <div className="space-y-3">
            <div
              id="barcode-reader"
              ref={containerRef}
              className="w-full rounded-xl overflow-hidden border border-border bg-black min-h-[200px]"
            />
            {scanning && (
              <p className="text-xs text-center text-muted-foreground animate-pulse">
                Scanning... hold steady over the barcode
              </p>
            )}
          </div>
        )}

        {lookingUp && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground font-medium">Looking up product...</p>
          </div>
        )}

        {product && (
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-2xl">
                  {product.emoji}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{product.name}</h3>
                {product.brand && <p className="text-xs text-muted-foreground">{product.brand}</p>}
                <p className="text-xs mt-1 capitalize text-primary">{product.category.replace('-', ' ')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleConfirm}>
                Add to Pantry
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
