"use client";  // Fala pro Next.js que este componente deve ser renderizado no lado do cliente
import React, { useState } from "react";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import { mockProdutos } from "./mocks/produto";
import { Produto } from "./types/produto";

export default function Produtos() {
  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);
  const [valorTotal, setValorTotal] = useState<number>(0);
  
  const adicionarAoCarrinho = (produto: Produto) => {
    setQuantidadeTotal(quantidadeTotal + 1);
    setValorTotal(valorTotal + Number(produto.preco));
  };

  return (
    <>
      {/* <> significa React.Fragment. Posso retonar múltiplos componentes. Ex: nav e main, abaixo  */}
      <main>
        <div className="container p-5">
          <ResumoCarrinho />
          <ListagemProdutos 
            produtos={mockProdutos} 
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        </div>
      </main>
    </>
  );
}

/*
page.tsx é a nossa rota raiz, ou seja, a página inicial da aplicação.
Todas as outras pasta que tiverem um arquivo page.tsx dentro delas serão consideradas rotas filhas.
*/