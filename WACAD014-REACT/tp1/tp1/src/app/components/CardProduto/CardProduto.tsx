"use client";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { Produto } from "@/app/types/produto";
import { useAddFavorito } from "@/app/hooks/useAddFavorito";

interface CardProdutoProps {
    produto: Produto;
    adicionarAoCarrinho: (produto: Produto) => void;
}

export default function CardProduto(props: CardProdutoProps & Produto) {

    const { isPending, addFavorito } = useAddFavorito(
        () => toast.success("Produto adicionado aos favoritos!"),
        () => toast.error("Erro ao adicionar produto aos favoritos!")
    );

    return (
    <div className="col">
        <div className="card shadow-sm h-100">
            <Image
                src={props.fotos[0].src}
                className="card-img-top"
                alt={props.fotos[0].titulo}
                width={300}
                height={320}
            />

            <div className="card-body bg-light">
                <h5 className="card-title">{props.nome}</h5>
                <p className="card-text text-secondary">R$ {props.preco}</p>
                <button 
                    className="btn btn-dark d-block w-100"
                    type="button"
                    onClick={() => props.adicionarAoCarrinho(props)}
                >
                    Adicionar no carrinho
                </button>
                <button 
                    className="btn btn-warning d-block w-100 mt-2"
                    type="button"
                    onClick={() => addFavorito(props)}
                >
                    {isPending ? "Favoritando..." : "Favoritar"}
                </button>
            </div>
        </div>
    </div>
  );
}