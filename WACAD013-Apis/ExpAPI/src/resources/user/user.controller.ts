import { usertError } from "./user.errors";
import { Request, Response } from "express";
import { changePasswordDTO, CreateUserDTO } from "./user.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { createUser, getUserByEmail, changePasswordUser, getUsers, getUserById } from "./user.service";

const index = async(req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        usertError(res, error);
    }
};

const create = async(req: Request, res: Response) => {
    const data = req.body as CreateUserDTO;
    try {
        if (await getUserByEmail(data.email)) {
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
        } else {
            const user = await createUser(data);
            res.status(StatusCodes.CREATED).json(user);
        }
    } catch (error) {
        usertError(res, error);
    }
};

const read = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (user) {
            res.status(StatusCodes.OK).json(user);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
        }
    } catch (error) {
        usertError(res, error);
    }
};

const update = async(req: Request, res: Response) => {};
const remove = async(req: Request, res: Response) => {};

const changePassword = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { newPassword, oldPassword } = req.body as changePasswordDTO
    try {
        const ok = await changePasswordUser(id, oldPassword, newPassword);
        if (ok) {
            res.status(StatusCodes.OK).send(ReasonPhrases.OK);
        } else {
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
        }
    } catch (error) {
        usertError(res, error);
    }
};

export default {
  index,
  create,
  read,
  update,
  remove,
  changePassword
};