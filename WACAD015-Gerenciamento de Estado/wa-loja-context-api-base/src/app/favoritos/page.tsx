"use client";

import { useState } from "react";
import ListagemFavoritos from "../components/ListagemFavoritos/ListagemFavoritos";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<Produto[] | []>([]);

  return (
    <main>
      <div className="container p-5">
        <ListagemFavoritos
          produtosFavoritos={favoritos}
          setFavoritos={setFavoritos}
        />
      </div>
    </main>
  );
}