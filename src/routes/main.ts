import { Router } from 'express';
import { prisma } from '../libs/prisma';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.get('/test', (req, res) => {
    res.json({ testando: true });
});

mainRouter.post('/user', async (req, res) => {
    const user = await prisma.user.create({
        data: {
            name: 'Billy Bob',
            email: 'billy.bob@example.com'
        }
    });

    res.json(user);
});
