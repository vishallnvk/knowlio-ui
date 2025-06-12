// app/components/ProtectedLayout.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import {
  Typography,
  Box
} from '@mui/material';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedLayout({ children, redirectTo = '/login' }: ProtectedLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(redirectTo);
    }
  }, [loading, user, redirectTo, router]);

  if (loading || (!user && typeof window !== 'undefined')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <Typography variant="h6" className="text-gray-600">
            Loading
          </Typography>
        </Box>
      </div>
    );
  }

  return <>{children}</>;
}
