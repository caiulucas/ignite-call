'use client';

import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight } from 'phosphor-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { api } from '@/lib/axios';
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';

import { Form, FormError, Header } from './styles';

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, 'O usuário precisa ter pelo menos 3 caracteres.')
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.'
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, 'O nome precisa ter pelo menos 3 caracteres.')
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const username = searchParams?.get('username') || '';

    if (username) setValue('username', username);
  }, [searchParams, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', data);

      await router.push('/register/connect-calendar');
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
      }
    }
  }

  return (
    <>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label htmlFor="username">
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            id="username"
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label htmlFor="name">
          <Text size="sm">Nome completo</Text>
          <TextInput id="name" placeholder="Seu nome" {...register('name')} />

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </>
  );
}
