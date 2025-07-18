"use client";

import { Produto } from "@/app/types/produto";
import { createContext, useContext } from "react";
import { useAddFavorito } from "@/app/hooks/useAddFavorito";
import { useListaFavoritos } from "@/app/hooks/useListaFavoritos";
import { useRemoveFavorito } from "@/app/hooks/useRemoveFavorito";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";

interface IFavoritos {
    favoritos: Produto[];
    valorTotalFavoritos: () => number;
    isAddFavoritoPending?: boolean;
    isRemoveFavoritoPending?: boolean;
    adicionarAosFavoritos: (produto: Produto) => void;
    removerFavorito: (produto: Produto) => void;
    verificaSeFavorito?: (idProduto: string) => boolean;
};

export const FavoritosContext = createContext<IFavoritos>({
    favoritos: [] as Produto[],
    valorTotalFavoritos: () => 0,
    isAddFavoritoPending: false,
    isRemoveFavoritoPending: false,
    adicionarAosFavoritos: () => {},
    removerFavorito: () => {},    
    verificaSeFavorito: () => false,
});

interface FavoritosProviderProps {
  children: React.ReactNode;
}

const FavoritosProvider = ({ children }: FavoritosProviderProps) => {
    const { favoritos = [], refetchFavoritos } = useListaFavoritos();
    const { adicionarAosFavoritos, isAddFavoritoPending } = useAddFavorito(refetchFavoritos);
    const { removerFavorito, isRemoveFavoritoPending } = useRemoveFavorito(refetchFavoritos);

    const valorTotalFavoritos = () => {
        return favoritos.reduce((acc, produto) => {
            return (
                acc +
                calculaValorComPorcentagemDeDesconto(
                    Number(produto.preco),
                    produto.desconto
                )
            );
        }, 0);
    };    

    const verificaSeFavorito = (idProduto: string): boolean => {
        return (favoritos ?? []).some(fav => fav.id === idProduto)        
    };

    const values = {
        favoritos,
        valorTotalFavoritos,
        isAddFavoritoPending,
        isRemoveFavoritoPending,        
        adicionarAosFavoritos,
        removerFavorito,
        verificaSeFavorito,
    };

    return (
        <FavoritosContext.Provider value={values}>
            {children}
        </FavoritosContext.Provider>
    );
};

export const useFavoritosContext = () => {
    const favoritosContext = useContext(FavoritosContext);
    return favoritosContext;
};

export default FavoritosProvider;