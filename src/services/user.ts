import { prisma } from '../libs/prisma';
import { Prisma } from '@prisma/client';

type CreateUserProps = {
	name: string;
	email: string;
};

export const createUser = async (data: Prisma.UserCreateInput) => {
	try {
		return await prisma.user.create({ data })
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				console.error('Email already exists');
				return false;
			}
		}
		console.error('Error creating user:', error);
		return false;
	}
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
	const result = await prisma.user.createMany({
		data: [
			{name: 'João', email: 'joao@example.com'},
			{name: 'João 2', email: 'joao@example.com'},
			{name: 'Maria', email: 'maria@example.com'},
			{name: 'Pedro', email: 'pedro@example.com'}
		],
		skipDuplicates: true
	})
}

export const getAllUsers = async () => {
	try {
		return await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				status: true
			}
		})
	} catch (error) {
		console.error('Error fetching users:', error);
		return false;
	}
}

export const getUserByEmail = async (email: string) => {
	try {
		return await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				name: true,
				status: true
			}
		})
	} catch (error) {
		console.error('Error fetching user by email:', error);
		return false;
	}
}

export const getUserByFields = async () => {
	try {
		const page = 2;
		const pageSize = 10;
		return await prisma.user.findMany({
			skip: (page - 1) * pageSize,
			take: pageSize,
			where: {
				posts: {
					some: {
						title: {
							contains: 'Post 1'
						}
					}
				}
			},
			select: {
				id: true,
				name: true,
				status: true
			}
		})
	} catch (error) {
		console.error('Error fetching user by email:', error);
		return false;
	}
}