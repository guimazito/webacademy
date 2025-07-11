import axios from "axios";

export const produtosApi = axios.create({
    baseURL: "https://ranekapi.origamid.dev/json/api",
});