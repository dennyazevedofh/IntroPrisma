import { Router } from 'express';
import {
    createUser,
    createUsers,
    getAllUsers,
    getUserByEmail
} from '../services/user';

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
        name: 'Wild Bill',
        email: 'wild.bill@example.com',
        posts: {
            create: {
                title: 'Post 1 - Wild Bill',
                body: 'This is the first post by Wild Bill'
            }
        }
    });
    if (user) {
        res.status(201).json({ user });
    } else {
        res.status(400).json({ error: 'Email already exists' });
    }
});

mainRouter.post('/users', async (req, res) => {
    const result = await createUsers([]);
    res.status(201).json({ ok: true });
});

mainRouter.get('/users', async (req, res) => {
    const users = await getAllUsers();
    if (users) {
        res.json({ users });
    } else {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

mainRouter.get('/user', async (req, res) => {
    const user = await getUserByEmail('wilder.bill@example.com');
    if (user) {
        res.json({ user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});
