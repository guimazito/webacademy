import { PrismaClient, User } from "@prisma/client";
import { LoginDTO } from "./auth.types";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const checkCredentials = async (data: LoginDTO): Promise<User | null> => {
    const user = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    });
    if (user) {
        const ok = await compare(data.password, user.password);
        if (ok) {
            return user;
        }
    }
    return null;
};