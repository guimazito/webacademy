"use client";

import { mockProdutos } from "./mocks/produtos";
import { useState, createContext } from "react";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";

interface IFavoritos {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
};

export const FavoritosContext = createContext<IFavoritos>({
  favoritos: [] as Produto[],
  setFavoritos: () => {},
});

export default function App() {
  const produtos = mockProdutos;
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  return (
    <main>
      <div className="container p-5">
        <FavoritosContext.Provider
          value={{
            favoritos,
            setFavoritos
          }}
        >
          <ListagemProdutos
            produtos={produtos}
          />
        </FavoritosContext.Provider>
      </div>
    </main>
  );
}
