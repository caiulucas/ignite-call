'use client';

import { ArrowRight } from 'phosphor-react';

import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';

import { Header, Form } from './styles';

export default function Register() {
  return (
    <>
      <Header>
        <Heading>Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form">
        <label htmlFor="username">
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            id="username"
            prefix="ignite.com/"
            placeholder="seu-usuario"
          />
        </label>

        <label htmlFor="name">
          <Text size="sm">Nome completo</Text>
          <TextInput id="name" placeholder="Seu nome" />
        </label>

        <Button type="submit">
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </>
  );
}
