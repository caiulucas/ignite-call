import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';
import { CalendarBlank, Clock } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { api } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react';

import { ConfirmForm, FormActions, FormError, FormHeader } from './styles';

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancel: () => void;
}

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa de no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().optional()
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

export function ConfirmStep({ schedulingDate, onCancel }: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<ConfirmFormData>({ resolver: zodResolver(confirmFormSchema) });

  const describedDate = dayjs(schedulingDate).format('DD [de] MMMM [de] YYYY');
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]');
  const pathname = usePathname();
  const username = pathname?.replace('/schedule/', '') ?? '';

  async function handleConfirmScheduling(data: ConfirmFormData) {
    await api.post(`/users/${username}/schedule`, {
      ...data,
      date: schedulingDate
    });

    onCancel();
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
}
