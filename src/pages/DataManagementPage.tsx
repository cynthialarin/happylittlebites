import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DataManagement from '@/components/DataManagement';

export default function DataManagementPage() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>
      <DataManagement />
    </div>
  );
}
