'use client';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'phosphor-react';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { api } from '@/lib/axios';
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea
} from '@ignite-ui/react';

import { Header } from '../styles';
import { FormAnnotation, ProfileBox } from './styles';

const updateProfileFormSchema = z.object({
  bio: z
    .string()
    .min(3, 'O usuário precisa ter pelo menos 3 caracteres.')
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.'
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, 'O nome precisa ter pelo menos 3 caracteres.')
});

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;

const sessionPromise = getSession();

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<UpdateProfileFormData>();

  const session = use(sessionPromise);
  const router = useRouter();

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put('/users/profile', data);

    router.push(`/schedule/${session?.user.username}`);
  }

  return (
    <>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label htmlFor="username">
          <Text size="sm">Foto de perfil</Text>
          <Avatar src={session?.user.avatar_url} />
        </label>

        <label htmlFor="bio">
          <Text size="sm">Sobre você</Text>
          <TextArea id="bio" {...register('bio')} />
          <FormAnnotation>
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar <ArrowRight />
        </Button>
      </ProfileBox>
    </>
  );
}
