"use client";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { Produto } from "@/app/types/produto";
import { useRemoveFavorito } from "@/app/hooks/useRemoveFavorito";

interface CardProdutoFavoritoProps {
    produto: Produto;
    refetchFavoritos: () => void;
}

export default function CardProdutoFavorito({ produto, refetchFavoritos }: CardProdutoFavoritoProps) {

    const { isPending, removeFavorito } = useRemoveFavorito(
        () => {
            toast.success("Produto removido dos favoritos!");
            refetchFavoritos();
        },
        () => toast.error("Erro ao remover produto dos favoritos!")
    );  
    
    return (
    <div className="col">
        <div className="card shadow-sm h-100">
            <Image
                src={produto.fotos[0].src}
                className="card-img-top"
                alt={produto.fotos[0].titulo}
                width={300}
                height={320}
            />

            <div className="card-body bg-light">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text text-secondary">R$ {produto.preco}</p>
                <button 
                    className="btn btn-danger d-block w-100"
                    type="button"
                    onClick={() => removeFavorito(produto)}
                    disabled={isPending}
                >
                    Remover
                </button>
            </div>
        </div>
    </div>
  );
}