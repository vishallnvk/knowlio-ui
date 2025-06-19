import ProtectedLayout from '@/components/ProtectedLayout';

export default function LicenseAgreementLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout redirectTo="/login">{children}</ProtectedLayout>;
}
