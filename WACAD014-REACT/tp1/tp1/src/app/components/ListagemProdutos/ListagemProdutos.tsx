"use client";
import React from "react";
import CardProduto from "../CardProduto/CardProduto";
import { Produto } from "@/app/types/produto";

interface ListagemProdutosProps {
    produtos: Produto[];
    adicionarAoCarrinho: (produto: Produto) => void;
}

export default function ListagemProdutos({ produtos, adicionarAoCarrinho }: ListagemProdutosProps) {
    return (
        <>
            <h5 className="mb-3">Produtos disponíveis:</h5>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                {produtos.map((produto) => (
                    <CardProduto 
                        key={produto.id}
                        nome={produto.nome}
                        preco={produto.preco}
                        fotos={produto.fotos}
                        id={produto.id}
                        descricao={produto.descricao}
                        vendido={produto.vendido}
                        usuario_id={produto.usuario_id}
                        adicionarAoCarrinho={adicionarAoCarrinho}
                        produto={produto}                    />
                ))}
            </div>
        </>
    );
}