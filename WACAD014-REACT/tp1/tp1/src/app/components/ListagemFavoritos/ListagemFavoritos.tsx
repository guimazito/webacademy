"use client";
import React from "react";
import { Produto } from "@/app/types/produto";
import { useListaFavoritos } from "@/app/hooks/useListaFavoritos";
import CardProdutoFavorito from "../CardProdutoFavorito/CardProdutoFavorito";

export default function ListagemFavoritos() {
    const { favoritos, isPending, isError, refetchFavoritos } = useListaFavoritos();

    if (isPending) return <h5>Carregando...</h5>;
    if (isError) return <h5>Erro ao carregar produtos</h5>;

    return (
        <>
            <h5 className="mb-3">
                {
                    favoritos && favoritos.length > 0
                        ? "Produtos favoritos:"
                        : "Não há produtos favoritados!"
                }
            </h5>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                {favoritos && favoritos.map((produto: Produto) => (
                    <CardProdutoFavorito
                        key={produto.id}
                        produto={produto}
                        refetchFavoritos={refetchFavoritos}
                    />
                ))}
            </div>
        </>
    );
}