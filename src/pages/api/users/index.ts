import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

import { prisma } from '@/lib/prisma';

async function getUserByUsername(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (!username) return res.status(400).json({ message: 'Missing username' });

  const user = await prisma.user.findUnique({
    where: { username: String(username) }
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { username, name } = req.body;

  const userExixts = await prisma.user.findUnique({ where: { username } });

  if (userExixts) {
    return res.status(409).json({ message: 'Username already taken' });
  }

  const user = await prisma.user.create({ data: { username, name } });

  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  });

  return res.status(201).json(user);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getUserByUsername(req, res);
    case 'POST':
      return createUser(req, res);
    default:
      return res.status(405).end();
  }
}
