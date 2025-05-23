import { cleanEnv, port, str } from "envalid";

function validateEnv() {
    cleanEnv(process.env, {
        PORT: port(),
        NODE_ENV: str({
            choices: ["development", "production"]
        }),
        LOG_PATH: str(),
    })
}

export default validateEnv;