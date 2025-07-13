"use client";
import React, { useState } from "react";
import { mockItensCarrinho } from "../mocks/itensCarrinho";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";

export default function Carrinho() {
  const [itensCarrinho, setItemsCarrinho] = useState(mockItensCarrinho);
  const quantidadeTotal = itensCarrinho.reduce((acc, item) => acc + (item.quantidade || 0), 0);
  const valorTotal = itensCarrinho.reduce((acc, item) => acc + ((item.quantidade || 0) * (item.preco || 0)), 0);
  
  const removerItemDoCarrinho = (id: string) => {
    setItemsCarrinho(itensCarrinho.filter(item => item.id !== id));
  };

  return (
    <main>
      <div className="container p-5">
        <ListagemCarrinho
          itemCarrinho={itensCarrinho}
          removerItemDoCarrinho={removerItemDoCarrinho}
        />
        <ResumoCarrinho
          quantidadeTotal={quantidadeTotal}
          valorTotal={valorTotal}
        />
      </div>
    </main>
  );
}