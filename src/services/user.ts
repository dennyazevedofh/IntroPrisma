import { prisma } from '../libs/prisma';
import { Prisma } from '@prisma/client';

type CreateUserProps = {
	name: string;
	email: string;
};

export const createUser = async ({ name, email }: CreateUserProps) => {
	try {
	const user = await prisma.user.create({
		data: {
			name,
			email
		}
	})
		return user;
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