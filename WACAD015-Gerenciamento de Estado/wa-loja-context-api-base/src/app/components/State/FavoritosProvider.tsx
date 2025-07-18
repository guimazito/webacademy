"use client";

import { Produto } from "@/app/types/produto";
import { createContext, useContext, useState } from "react";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import { useListaFavoritos } from "@/app/hooks/useListaFavoritos";
import { useMutation } from "@tanstack/react-query";
import { addProdutoFavorito } from "@/app/services/produtos";

interface IFavoritos {
  favoritos: Produto[];
  adicionarAosFavoritos: (produto: Produto) => void;
  isAddFavoritoPending?: boolean;
//   setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
};

export const FavoritosContext = createContext<IFavoritos>({
    favoritos: [] as Produto[],
    adicionarAosFavoritos: () => {},
    isAddFavoritoPending: false,
    // setFavoritos: () => {},
});

interface FavoritosProviderProps {
  children: React.ReactNode;
}

const FavoritosProvider = ({ children }: FavoritosProviderProps) => {
    // const [favoritos, setFavoritos] = useState<Produto[]>([]);
    const { favoritos = [], refetchFavoritos } = useListaFavoritos();
    console.log(favoritos);

    // Hook de mutação para adicionar favorito
    const { mutate: addFavorito, isPending } = useMutation({
        mutationFn: (produto: Produto) => addProdutoFavorito(produto),
        onSuccess: () => {
            refetchFavoritos(); // Atualiza a lista após adicionar
        }
    });

    // Função exposta no contexto
    const adicionarAosFavoritos = (produto: Produto) => {
        addFavorito(produto);
    };

    const values = {
        favoritos,
        adicionarAosFavoritos,
        isAddFavoritoPending: isPending,
        // setFavoritos,
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

// export const useRemoveProdutoFavorito = (idProduto: string) => {
//     const { setFavoritos } = useFavoritosContext();
//     return () => {
//         setFavoritos((favoritos) => favoritos.filter((item) => item.id !== idProduto));
//     };
// };

// export const useAdicionaProdutoFavorito = (produto: Produto) => {
//     const { setFavoritos } = useFavoritosContext();
//     return () => {
//         setFavoritos((favoritos) => [...favoritos, produto]);
//     };
// };

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