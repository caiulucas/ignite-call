import { Metadata } from 'next';

import { ClientHome } from './client';

export const metadata: Metadata = {
  title: 'Descomplique sua agenda | Ignite Call',
  description:
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.'
};
export default function Home() {
  return <ClientHome />;
}
