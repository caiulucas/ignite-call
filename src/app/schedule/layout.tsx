import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agende seu horário | Ignite Call'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
