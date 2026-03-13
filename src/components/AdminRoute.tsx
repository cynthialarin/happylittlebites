import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import logoOption3 from '@/assets/logo-option-3.png';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <img src={logoOption3} alt="Loading" className="w-12 h-12 object-contain animate-pulse" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
