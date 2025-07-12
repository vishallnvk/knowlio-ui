import ProtectedLayout from '@/components/ProtectedLayout';

export default function UserAgreementLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout redirectTo="/login">{children}</ProtectedLayout>;
}
