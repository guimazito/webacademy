"use client";

import { createContext, useState } from "react";

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

export default FavoritosProvider;
