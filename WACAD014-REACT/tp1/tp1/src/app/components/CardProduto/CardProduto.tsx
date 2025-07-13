"use client";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Produto } from "@/app/types/produto";
import { useAddFavorito } from "@/app/hooks/useAddFavorito";
import { useRemoveFavorito } from "@/app/hooks/useRemoveFavorito";
import { useListaFavoritos } from "@/app/hooks/useListaFavoritos";

interface CardProdutoProps {
    produto: Produto;
    adicionarAoCarrinho: (produto: Produto) => void;
}

export default function CardProduto({ produto, adicionarAoCarrinho }: CardProdutoProps) {
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { favoritos, isPending: isCheckFavoritoPending, isError: isCheckFavoritoError, refetchFavoritos } = useListaFavoritos();    
    
    const { isPending: isAddPending, addFavorito } = useAddFavorito(
        () => {
            toast.success("Produto adicionado aos favoritos!");
            refetchFavoritos();
        },
        () => toast.error("Erro ao adicionar produto aos favoritos!")
    );

    const { isPending: isRemovePending, removeFavorito } = useRemoveFavorito(
        () => {
            toast.success("Produto removido dos favoritos!");
            refetchFavoritos();
        },
        () => toast.error("Erro ao remover produto dos favoritos!")
    );  

    const estaFavoritado = (favoritos ?? []).some(fav => fav.id === produto.id);

    const handleFavorito = () => {
        if (estaFavoritado) {
            removeFavorito(produto);
        } else {
            addFavorito(produto);
        }
    }

    return (
    <div className="col">
        <div className="card shadow-sm h-100">
            <Image
                src={produto.fotos[0].src}
                className="card-img-top"
                alt={produto.fotos[0].titulo}
                width={300}
                height={320}
                onClick={() => router.push(`/produto/${produto.id}`)}
            />

            <div className="card-body bg-light">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text text-secondary">R$ {produto.preco}</p>
                <button 
                    className="btn btn-dark d-block w-100"
                    type="button"
                    onClick={() => adicionarAoCarrinho(produto)}
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