import { User } from "@prisma/client"

export type SignUpDTO = Pick<User, "name" | "email" | "password">
export type LoginDTO = Pick<User, "email" | "password">