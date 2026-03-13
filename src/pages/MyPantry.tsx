import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  ArrowLeft, Plus, Camera, BookOpen, ScanBarcode, ShoppingCart,
  Trash2, Package, Search, X, Loader2
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { usePantryItems, PantryItem } from '@/hooks/usePantryItems';
import { useGroceryList } from '@/hooks/useGroceryList';
import FridgeScanner, { DetectedIngredient } from '@/components/FridgeScanner';
import BarcodeScanner, { ScannedProduct } from '@/components/BarcodeScanner';
import { foods } from '@/data/foods';
import { jarFoods } from '@/data/jarFoods';

const CATEGORIES = [
  { value: 'fruit', label: 'Fruits', emoji: '🍎' },
  { value: 'vegetable', label: 'Vegetables', emoji: '🥦' },
  { value: 'protein', label: 'Protein', emoji: '🥩' },
  { value: 'dairy', label: 'Dairy', emoji: '🥛' },
  { value: 'grain', label: 'Grains', emoji: '🌾' },
  { value: 'legume', label: 'Legumes', emoji: '🫘' },
  { value: 'baby-food', label: 'Baby Food', emoji: '🍼' },
  { value: 'formula', label: 'Formula', emoji: '🧴' },
  { value: 'diapers', label: 'Diapers', emoji: '🧷' },
  { value: 'other', label: 'Other', emoji: '🍽️' },
];

const CATEGORY_EMOJI: Record<string, string> = Object.fromEntries(CATEGORIES.map(c => [c.value, c.emoji]));

const FOOD_GROUP_TO_CATEGORY: Record<string, string> = {
  fruits: 'fruit', vegetables: 'vegetable', proteins: 'protein',
  dairy: 'dairy', grains: 'grain', legumes: 'legume', other: 'other',
};

export default function MyPantry() {
  const navigate = useNavigate();
  const { items, isLoading, addItem, addItems, toggleStock, deleteItem } = usePantryItems();
  const { addItems: addGroceryItems } = useGroceryList();

  const [activeLocation, setActiveLocation] = useState('fridge');
  const [fridgeScannerOpen, setFridgeScannerOpen] = useState(false);
  const [barcodeScannerOpen, setBarcodeScannerOpen] = useState(false);
  const [manualDialogOpen, setManualDialogOpen] = useState(false);
  const [libraryDialogOpen, setLibraryDialogOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');

  // Manual form
  const [manualName, setManualName] = useState('');
  const [manualCategory, setManualCategory] = useState('other');
  const [manualQuantity, setManualQuantity] = useState('');
  const [manualBrand, setManualBrand] = useState('');

  const locationItems = items.filter(i => i.location === activeLocation);
  const grouped = CATEGORIES.map(cat => ({
    ...cat,
    items: locationItems.filter(i => i.category === cat.value),
  })).filter(g => g.items.length > 0);

  const inStockCount = items.filter(i => i.in_stock).length;
  const outCount = items.filter(i => !i.in_stock).length;

  // Manual add
  const handleManualAdd = () => {
    if (!manualName.trim()) return;
    addItem.mutate({
      name: manualName.trim(),
      emoji: CATEGORY_EMOJI[manualCategory] || '🍽️',
      category: manualCategory,
      location: activeLocation,
      quantity: manualQuantity || null,
      food_id: null,
      upc_code: null,
      brand: manualBrand || null,
      in_stock: true,
      added_via: 'manual',
    }, {
      onSuccess: () => {
        toast(`✅ ${manualName} added!`);
        setManualName(''); setManualCategory('other'); setManualQuantity(''); setManualBrand('');
        setManualDialogOpen(false);
      },
    });
  };

  // Photo scan
  const handlePhotoScan = (ingredients: DetectedIngredient[]) => {
    const newItems = ingredients.map(ing => ({
      name: ing.name,
      emoji: CATEGORY_EMOJI[ing.category] || '🍽️',
      category: ing.category || 'other',
      location: activeLocation,
      added_via: 'scan' as const,
      in_stock: true,
    }));
    addItems.mutate(newItems, {
      onSuccess: () => toast(`📸 ${ingredients.length} items added from scan!`),
    });
  };

  // Barcode scan
  const handleBarcodeScan = (product: ScannedProduct) => {
    addItem.mutate({
      name: product.name,
      emoji: product.emoji,
      category: product.category,
      location: activeLocation,
      quantity: null,
      food_id: null,
      upc_code: product.barcode,
      brand: product.brand,
      in_stock: true,
      added_via: 'barcode',
    }, {
      onSuccess: () => toast(`🔲 ${product.name} added!`),
    });
  };

  // Library add
  const handleLibraryAdd = (name: string, emoji: string, category: string, foodId: string) => {
    addItem.mutate({
      name, emoji, category,
      location: activeLocation,
      quantity: null,
      food_id: foodId,
      upc_code: null,
      brand: null,
      in_stock: true,
      added_via: 'library',
    }, {
      onSuccess: () => toast(`📚 ${name} added!`),
    });
  };

  // Grocery list
  const handleAddToGrocery = (item: PantryItem) => {
    addGroceryItems.mutate([{ name: item.name, source: 'pantry' }], {
      onSuccess: () => toast(`🛒 ${item.name} added to grocery list!`),
    });
  };

  // Library items
  const allLibraryItems = [
    ...foods.map(f => ({
      id: f.id, name: f.name, emoji: f.emoji,
      category: FOOD_GROUP_TO_CATEGORY[f.foodGroup] || 'other',
    })),
    ...jarFoods.map(f => ({
      id: f.id, name: `${f.brand} ${f.name}`, emoji: f.emoji,
      category: 'baby-food',
    })),
  ];

  const filteredLibrary = librarySearch
    ? allLibraryItems.filter(f => f.name.toLowerCase().includes(librarySearch.toLowerCase()))
    : allLibraryItems.slice(0, 50);

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Package className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-black">My Pantry & Fridge</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {items.length} items total · {inStockCount} in stock{outCount > 0 ? ` · ${outCount} out` : ''}
        </p>
      </motion.div>

      {/* Action buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-auto py-2 text-[10px]" onClick={() => setManualDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Manual
        </Button>
        <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-auto py-2 text-[10px]" onClick={() => setFridgeScannerOpen(true)}>
          <Camera className="h-4 w-4" />
          Photo
        </Button>
        <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-auto py-2 text-[10px]" onClick={() => setLibraryDialogOpen(true)}>
          <BookOpen className="h-4 w-4" />
          Library
        </Button>
        <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-auto py-2 text-[10px]" onClick={() => setBarcodeScannerOpen(true)}>
          <ScanBarcode className="h-4 w-4" />
          Barcode
        </Button>
      </div>

      {/* Location tabs */}
      <Tabs value={activeLocation} onValueChange={setActiveLocation}>
        <TabsList className="w-full">
          <TabsTrigger value="fridge" className="flex-1">🧊 Fridge</TabsTrigger>
          <TabsTrigger value="pantry" className="flex-1">🗄️ Pantry</TabsTrigger>
          <TabsTrigger value="freezer" className="flex-1">❄️ Freezer</TabsTrigger>
        </TabsList>

        {['fridge', 'pantry', 'freezer'].map(loc => (
          <TabsContent key={loc} value={loc}>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : grouped.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="text-4xl mb-3">📦</div>
                <p className="text-sm text-muted-foreground">No items in your {loc} yet</p>
                <p className="text-xs text-muted-foreground mt-1">Use the buttons above to add items</p>
              </motion.div>
            ) : (
              <div className="space-y-4 mt-3">
                <AnimatePresence>
                  {grouped.map(group => (
                    <motion.div key={group.value} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                        {group.emoji} {group.label} ({group.items.length})
                      </h3>
                      <div className="space-y-1.5">
                        {group.items.map(item => (
                          <Card key={item.id} className={`transition-colors ${!item.in_stock ? 'opacity-50' : ''}`}>
                            <CardContent className="p-3 flex items-center gap-3">
                              <span className="text-lg">{item.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.name}</p>
                                <div className="flex items-center gap-2">
                                  {item.brand && <span className="text-[10px] text-muted-foreground">{item.brand}</span>}
                                  {item.quantity && <span className="text-[10px] text-muted-foreground">· {item.quantity}</span>}
                                </div>
                              </div>

                              {!item.in_stock && (
                                <Button
                                  variant="ghost" size="sm"
                                  className="h-7 text-[10px] gap-1 text-primary"
                                  onClick={() => handleAddToGrocery(item)}
                                >
                                  <ShoppingCart className="h-3 w-3" />
                                  List
                                </Button>
                              )}

                              <Switch
                                checked={item.in_stock}
                                onCheckedChange={(checked) => toggleStock.mutate({ id: item.id, in_stock: checked })}
                                className="scale-75"
                              />

                              <button
                                onClick={() => deleteItem.mutate(item.id)}
                                className="p-1 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Manual Add Dialog */}
      <Dialog open={manualDialogOpen} onOpenChange={setManualDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Add Item Manually</DialogTitle>
            <DialogDescription>Add to your {activeLocation}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Item name *" value={manualName} onChange={e => setManualName(e.target.value)} />
            <Select value={manualCategory} onValueChange={setManualCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => (
                  <SelectItem key={c.value} value={c.value}>{c.emoji} {c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Quantity (optional)" value={manualQuantity} onChange={e => setManualQuantity(e.target.value)} />
            <Input placeholder="Brand (optional)" value={manualBrand} onChange={e => setManualBrand(e.target.value)} />
            <Button className="w-full" onClick={handleManualAdd} disabled={!manualName.trim() || addItem.isPending}>
              {addItem.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add Item'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Library Dialog */}
      <Dialog open={libraryDialogOpen} onOpenChange={setLibraryDialogOpen}>
        <DialogContent className="max-w-md mx-4 max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Add from Food Library</DialogTitle>
            <DialogDescription>Tap any item to add to your {activeLocation}</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search foods..."
              value={librarySearch}
              onChange={e => setLibrarySearch(e.target.value)}
              className="pl-9"
            />
            {librarySearch && (
              <button onClick={() => setLibrarySearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 mt-2 max-h-[50vh]">
            {filteredLibrary.map(item => (
              <button
                key={item.id}
                onClick={() => handleLibraryAdd(item.name, item.emoji, item.category, item.id)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm font-medium flex-1">{item.name}</span>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
            {filteredLibrary.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">No foods found</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Scanners */}
      <FridgeScanner open={fridgeScannerOpen} onOpenChange={setFridgeScannerOpen} onIngredientsDetected={handlePhotoScan} />
      <BarcodeScanner open={barcodeScannerOpen} onOpenChange={setBarcodeScannerOpen} onProductScanned={handleBarcodeScan} />
    </div>
  );
}
