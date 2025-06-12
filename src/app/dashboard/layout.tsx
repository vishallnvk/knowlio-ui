import ProtectedLayout from '@/components/ProtectedLayout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout redirectTo="/login">{children}</ProtectedLayout>;
}
