'use client';
import { use } from 'react';

import { api } from '@/lib/axios';
import { queryClient } from '@/utils/queryClient';
import { Avatar, Heading, Text } from '@ignite-ui/react';

import { ScheduleForm } from './ScheduleForm';
import { Container, UserHeader } from './styles';

interface ScheduleProps {
  params: {
    username: string;
  };
}

interface User {
  name: string;
  bio: string;
  avatar_url: string;
}

export const revalidate = 86400; // 24 hours

async function getUser(username: string) {
  const { data } = await api.get(`/users/?username=${username}`);

  return { name: data.name, bio: data.bio, avatar_url: data.avatar_url };
}

export default function Schedule({ params }: ScheduleProps) {
  const { username } = params;
  const user = use<User>(queryClient('user', () => getUser(username)));

  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatar_url} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  );
}
