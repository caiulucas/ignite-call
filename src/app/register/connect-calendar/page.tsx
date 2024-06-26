'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Check } from 'phosphor-react';

import { Button, Heading, MultiStep, Text } from '@ignite-ui/react';

import { Header } from '../styles';
import { AuthError, ConnectBox, ConnectItem } from './styles';

export default function Register() {
  const session = useSession();
  const searchParams = useSearchParams();

  const hasAuthError = searchParams?.get('error') || '';
  const isSignedIn = session.status === 'authenticated';
  const router = useRouter();

  function handleNavigateToNextStep() {
    router.push('/register/time-intervals');
  }

  return (
    <>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => signIn('google')}
            >
              Conectar <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError>
            Falha ao se conectar ao Google. Verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthError>
        )}

        <Button onClick={handleNavigateToNextStep} disabled={!isSignedIn}>
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </>
  );
}
