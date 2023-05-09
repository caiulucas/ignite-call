'use client';

import { Container } from './styles';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return <Container>{children}</Container>;
}
