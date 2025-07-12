import ProtectedLayout from '@/components/ProtectedLayout';

export default function LicensingOptionsLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout redirectTo="/login">{children}</ProtectedLayout>;
}
