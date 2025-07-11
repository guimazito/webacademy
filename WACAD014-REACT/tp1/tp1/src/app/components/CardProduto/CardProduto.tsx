"use client";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { Produto } from "@/app/types/produto";
import { useAddFavorito } from "@/app/hooks/useAddFavorito";
import { useRemoveFavorito } from "@/app/hooks/useRemoveFavorito";
import { useListaFavoritos } from "@/app/hooks/useListaFavoritos";

interface CardProdutoProps {
    produto: Produto;
    adicionarAoCarrinho: (produto: Produto) => void;
}

export default function CardProduto(props: CardProdutoProps & Produto) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { favoritos, isPending: isCheckFavoritoPending, isError: isCheckFavoritoError, refetch } = useListaFavoritos();    
    
    const { isPending: isAddPending, addFavorito } = useAddFavorito(
        () => {
            toast.success("Produto adicionado aos favoritos!");
            refetch();
        },
        () => toast.error("Erro ao adicionar produto aos favoritos!")
    );

    const { isPending: isRemovePending, removeFavorito } = useRemoveFavorito(
        () => {
            toast.success("Produto removido dos favoritos!");
            refetch();
        },
        () => toast.error("Erro ao remover produto dos favoritos!")
    );  
    
    // console.log(favoritos);

    const estaFavoritado = (favoritos ?? []).some(fav => fav.id === props.id);

    const handleFavorito = () => {
        if (estaFavoritado) {
            removeFavorito(props);
        } else {
            addFavorito(props);
        }
    }

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
                    className={`btn d-block w-100 mt-2 ${estaFavoritado ? "btn-success" : "btn-warning"}`}
                    type="button"
                    onClick={handleFavorito}
                    disabled={isAddPending || isRemovePending}
                >
                    {
                        estaFavoritado
                        ? "Desfavoritar"
                        : "Favoritar"
                    }
                </button>
            </div>
        </div>
    </div>
  );
}