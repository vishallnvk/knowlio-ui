import ProtectedLayout from '@/components/ProtectedLayout';

export default function LicenseLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout redirectTo="/login">{children}</ProtectedLayout>;
}
