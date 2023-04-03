'use client';

import { Container } from './styles';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
