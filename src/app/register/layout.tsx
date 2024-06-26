import { Metadata } from 'next';

import { ClientLayout } from './client-layout';

export const metadata: Metadata = {
  title: 'Crie uma conta | Ignite Call'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
