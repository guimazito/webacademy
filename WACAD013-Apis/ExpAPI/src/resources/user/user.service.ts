import { PrismaClient, User } from "@prisma/client";
import { compare, genSalt, hash } from "bcryptjs";
import { CreateUserDTO } from "./user.types"

const prisma = new PrismaClient();

export const getUserByEmail = async(email: string): Promise<User | null> => {
    return await prisma.user.findFirst({
        where: {
            email
        }
    });
};

export const createUser = async(data: CreateUserDTO):Promise<User> => {
    const rounds = parseInt(process.env.ROUNDS_BCRYPT ?? "10");
    const salt = await genSalt(rounds);
    const password = await hash(data.password, salt);
    return await prisma.user.create({
        data: {
            ...data,
            password
        }
    })
};

export const changePasswordUser = async(id: string, oldPassword: string, newPassword: string): Promise<boolean> => {
    const user = await prisma.user.findFirst({
        where: { id }
    });
    if (user) {
        const ok = await compare(oldPassword, user.password);
        if (ok) {
            const rounds = parseInt(process.env.ROUNDS_BCRYPT ?? "10");
            const salt = await genSalt(rounds);
            const password = await hash(newPassword, salt);
            await prisma.user.update({
                where: { id },
                data: { ...user, password }
            });
            return true;
        }
    }
    return false;
};

export const getUsers = async(): Promise<User[]> => {
    return await prisma.user.findMany();
};

export const getUserById = async(id: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: { id }
    })
};

export const removeUser = async(id: string): Promise<void> => {
    await prisma.user.delete({
        where: { id }
    })
};

export const updateUser = async(id: string, data: CreateUserDTO): Promise<User> => {
    return await prisma.user.update({
        where: { id },
        data
    });
};