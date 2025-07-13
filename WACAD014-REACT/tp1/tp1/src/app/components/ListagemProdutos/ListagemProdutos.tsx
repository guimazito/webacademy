"use client";
import React from "react";
import CardProduto from "../CardProduto/CardProduto";
import { Produto } from "@/app/types/produto";
import { useListaProdutos } from "@/app/hooks/useListaProdutos";

interface ListagemProdutosProps {
    produtos: Produto[];
    adicionarAoCarrinho: (produto: Produto) => void;
}

export default function ListagemProdutos({ adicionarAoCarrinho }: ListagemProdutosProps) {

    const { produtos, isPending, isError } = useListaProdutos();

    if (isPending) return <h5>Carregando...</h5>;

    if (isError) return <h5>Erro ao carregar produtos</h5>;

    if (!produtos) return <h5>Não há produtos disponíveis no momento</h5>;

    // console.log(produtos);

    return (
        <>
            <h5 className="mb-3">Produtos disponíveis:</h5>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                {produtos.map((produto: Produto) => (
                    <CardProduto 
                        key={produto.id}
                        produto={produto}
                        adicionarAoCarrinho={adicionarAoCarrinho} refetchFavoritos={function (): void {
                            throw new Error("Function not implemented.");
                        } }                        // nome={produto.nome}
                        // preco={produto.preco}
                        // fotos={produto.fotos}
                        // id={produto.id}
                        // descricao={produto.descricao}
                        // vendido={produto.vendido}
                        // usuario_id={produto.usuario_id}
                    />
                ))}
            </div>
        </>
    );
}