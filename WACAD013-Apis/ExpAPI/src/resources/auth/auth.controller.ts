import { Request, Response } from "express"
import { LoginDTO, SignUpDTO } from "./auth.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { createUser, getUserByEmail } from "../user/user.service";
import { UserTypes } from "../userType/userType.constants";
import { usertError } from "../user/user.errors";
import { checkCredentials } from "./auth.services";

const signup = async(req: Request, res: Response) => {
    const data = req.body as SignUpDTO;
    try {
        if (await getUserByEmail(data.email)) {
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
        } else {
            const user = await createUser({ ...data, userTypeId: UserTypes.client});
            res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
        }
    } catch (error) {
        usertError(res, error);
    }

};

const login = async(req: Request, res: Response) => {
    const data = req.body as LoginDTO;
    try {
        if (req.session.uid) {
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
        }else{
            const user = await checkCredentials(data);
            if (user) {
                req.session.uid = user.id;
                req.session.userTypeId = user.userTypeId;
                res.status(StatusCodes.OK).send(ReasonPhrases.OK);
            } else {
                res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
            }
        }
    } catch (error) {
        usertError(res, error);
    }
};

const logout = async(req: Request, res: Response) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
            } else {
                res.clearCookie("connect.sid");
                res.status(StatusCodes.OK).send(ReasonPhrases.OK);
            }
        });
    } catch (error) {
        usertError(res, error);
    }
};

export default {
    signup,
    login,
    logout
};
