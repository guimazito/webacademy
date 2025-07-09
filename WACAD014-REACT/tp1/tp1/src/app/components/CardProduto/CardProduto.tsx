"use client";
import React from "react";
import Image from "next/image";
import { Produto } from "@/app/types/produto";

interface CardProdutoProps {
    produto: Produto;
    adicionarAoCarrinho: (produto: Produto) => void;
}

export default function CardProduto(props: CardProdutoProps & Produto) {
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
            </div>
        </div>
    </div>
  );
}