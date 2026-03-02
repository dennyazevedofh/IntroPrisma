import { Router } from 'express';
import { createUser } from '../services/user';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.get('/test', (req, res) => {
    res.json({ testando: true });
});

mainRouter.post('/user', async (req, res) => {
    //Validar os dados de entrada
    const user = await createUser({
        name: 'Peter Bob',
        email: 'peter.bob@example.com'
    });
    if (user) {
        res.status(201).json({ user });
    } else {
        res.status(400).json({ error: 'Email already exists' });
    }
});
