'use client';
import '@/lib/dayjs';

import { SessionProvider } from 'next-auth/react';

import { queryClient } from '@/lib/react-query';
import { globalStyles } from '@/styles/global';
import { QueryClientProvider } from '@tanstack/react-query';

globalStyles();

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
