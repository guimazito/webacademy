import { cleanEnv, port, str } from "envalid"
import { Languages } from "../resources/language/language.constants"

export function validateEnv() {
    cleanEnv(process.env, {
        PORT: port(),
        DEFAULT_LANGUAGE: str({ choices: Object.values(Languages) }),
        NODE_ENV: str({ choices: ["development", "production"] }),
        DATABASE_URL: str(),
        SECRET_KEY: str(),
    });
}