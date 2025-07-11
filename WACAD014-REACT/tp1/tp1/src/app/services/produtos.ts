import { produtosApi } from "./api";
import { Produto } from "../types/produto";

export async function getListaProduto(): Promise<Produto[]> {
    return produtosApi.get("/produto").then((response) =>  response.data);
};