import Joi from "joi"
import { Languages } from "./language.constants";

export const languageSchema = Joi.object().keys({
    lang: Joi.string().valid(...Object.values(Languages))
});