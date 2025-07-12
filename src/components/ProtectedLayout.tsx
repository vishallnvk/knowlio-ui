// app/components/ProtectedLayout.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import LoadingSpinner from './LoadingSpinner';

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
    return <LoadingSpinner fullScreen />;
  }

  return <>{children}</>;
}
