import { User } from "@prisma/client"

export type CreateUserDTO = Pick<User, "name" | "email" | "password" | "userTypeId">;

export type changePasswordDTO = {
    oldPassword: string;
    newPassword: string;
};

/* 
Sempre que usamos um formulário, precisamos de um DTO
DTO existe no frontend e backend
*/