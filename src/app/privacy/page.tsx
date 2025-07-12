'use client';

import dynamic from 'next/dynamic';
import { Container } from '@mui/material';

const PDFViewer = dynamic(() => import('../../components/PDFViewer'), {
  ssr: false,
});

export default function PrivacyPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PDFViewer 
        fileUrl="/knowlio-privacy-policy.pdf"
        errorMessage="Failed to load Privacy Policy document"
      />
    </Container>
  );
}
