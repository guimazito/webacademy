"use client";

import { createContext, useContext, useState } from "react";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";

interface IFavoritos {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
};

export const FavoritosContext = createContext<IFavoritos>({
    favoritos: [] as Produto[],
    setFavoritos: () => {},
});

interface FavoritosProviderProps {
  children: React.ReactNode;
}

const FavoritosProvider = ({ children }: FavoritosProviderProps) => {
    const [favoritos, setFavoritos] = useState<Produto[]>([]);

    const values = {
        favoritos,
        setFavoritos,
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

export const useVerificaProdutoFavorito = (idProduto: string) => {
    const { favoritos } = useFavoritosContext();
    return favoritos.some((item) => item.id === idProduto);
};

export const useRemoveProdutoFavorito = (idProduto: string) => {
    const { setFavoritos } = useFavoritosContext();
    return () => {
        setFavoritos((favoritos) => favoritos.filter((item) => item.id !== idProduto));
    };
};

export const useAdicionaProdutoFavorito = (produto: Produto) => {
    const { setFavoritos } = useFavoritosContext();
    return () => {
        setFavoritos((favoritos) => [...favoritos, produto]);
    };
};

export const useCalculaValorTotalFavoritos = () => {
    const { favoritos } = useFavoritosContext();
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

export default FavoritosProvider;