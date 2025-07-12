import ProtectedLayout from '@/components/ProtectedLayout';

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout redirectTo="/login">{children}</ProtectedLayout>;
}
