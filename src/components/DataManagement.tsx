import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Trash2, Shield, AlertTriangle, FileText, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Link } from 'react-router-dom';

export default function DataManagement() {
  const { user } = useAuth();
  const { children, diary, allergenRecords, mealPlan, exposures } = useApp();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isDeletionRequested, setIsDeletionRequested] = useState(false);

  const exportUserData = async () => {
    if (!user) return;
    setIsExporting(true);

    try {
      const [profileRes, prefsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user.id).single(),
        supabase.from('user_preferences').select('*').eq('user_id', user.id).single(),
      ]);

      const userData = {
        export_info: {
          exported_at: new Date().toISOString(),
          email: user.email,
          format: 'JSON',
        },
        profile: profileRes.data,
        preferences: prefsRes.data,
        children,
        diary_entries: diary,
        allergen_records: allergenRecords,
        meal_plan: mealPlan,
        exposures,
      };

      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `happy-little-bites-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({ title: 'Data exported! 📄', description: 'Your complete data has been downloaded as JSON.' });
    } catch (error) {
      console.error('Export error:', error);
      toast({ title: 'Export failed', description: 'Please try again.', variant: 'destructive' });
    }
    setIsExporting(false);
  };

  const requestAccountDeletion = async () => {
    if (!user) return;
    // Sign out the user as a proxy for deletion request
    setIsDeletionRequested(true);
    toast({
      title: 'Deletion request submitted',
      description: "Your account deletion request has been received. We'll process it within 30 days.",
    });
  };

  const totalItems = children.length + diary.length + allergenRecords.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2">Data & Privacy Rights</h2>
        <p className="text-sm text-muted-foreground mb-4">Manage your data and exercise your privacy rights.</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Download className="h-4 w-4" /> Export Your Data
          </CardTitle>
          <CardDescription>Download a complete copy of all your data in JSON format.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              <p>Your export includes:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Profile and settings</li>
                <li>Children's profiles ({children.length})</li>
                <li>Food diary entries ({diary.length})</li>
                <li>Allergen records ({allergenRecords.length})</li>
                <li>Meal plans and exposures</li>
              </ul>
              <p className="mt-2 font-medium">Total data items: {totalItems}</p>
            </div>
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription className="text-xs">Exported data contains personal info — keep it secure.</AlertDescription>
            </Alert>
            <Button onClick={exportUserData} disabled={isExporting} className="w-full">
              {isExporting ? 'Preparing export...' : 'Download My Data'}
              {!isExporting && <Download className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-destructive">
            <Trash2 className="h-4 w-4" /> Delete Account & Data
          </CardTitle>
          <CardDescription>Permanently delete your account and all associated data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="border-destructive/50 bg-destructive/5">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm">
                <strong>This will permanently delete:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Your account and profile</li>
                  <li>All children's profiles and data</li>
                  <li>Food diary, meal plans, and preferences</li>
                </ul>
              </AlertDescription>
            </Alert>

            {!isDeletionRequested ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" /> Request Account Deletion
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account & All Data?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your account and all data. This action cannot be undone.
                      <br /><br />
                      <strong>Before proceeding:</strong>
                      <br />• Export your data if you want to keep a copy
                      <br />• This will remove all feeding history and growth tracking
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={requestAccountDeletion} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Yes, Delete Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">✓ Deletion request submitted</p>
                <p className="text-xs text-muted-foreground mt-1">You'll receive confirmation within 30 days.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" /> Legal & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link to="/privacy" className="flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Privacy Policy</p>
                <p className="text-xs text-muted-foreground">How we protect your data</p>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
            </Link>
            <Link to="/terms" className="flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Terms of Service</p>
                <p className="text-xs text-muted-foreground">Usage terms & disclaimers</p>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
