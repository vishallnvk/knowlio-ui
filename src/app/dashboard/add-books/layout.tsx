import ProtectedLayout from '@/components/ProtectedLayout';

export default function AddBooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
