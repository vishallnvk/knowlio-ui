import ProtectedLayout from '@/components/ProtectedLayout';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout redirectTo="/login">{children}</ProtectedLayout>;
}
