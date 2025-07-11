import { Produto } from "../types/produto";
import { apiProdutos, apiFavoritos } from "./api";

export async function getListaProduto(): Promise<Produto[]> {
    return apiProdutos.get("/produto").then((response) =>  response.data);
};

export async function getListaFavoritos(): Promise<Produto[]> {
    return apiFavoritos.get("/favoritos").then((response) => response.data);
};

export async function addProdutoFavorito(produto: Produto) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return apiFavoritos.post("/favoritos", produto).then((response) => response.data)
};

export async function removeProdutoFavorito(produto: Produto) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return apiFavoritos.delete(`/favoritos/${produto.id}`).then((response) => response.data)
}