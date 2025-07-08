"use client";  // Fala pro Next.js que este componente deve ser renderizado no lado do cliente
import React from "react";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";

export default function Produtos() {
  return (
    <>
      {/* <> significa React.Fragment. Posso retonar múltiplos componentes. Ex: nav e main, abaixo  */}
      <main>
        <div className="container p-5">
          <ResumoCarrinho />
          <ListagemProdutos />
        </div>
      </main>
    </>
  );
}

/*
page.tsx é a nossa rota raiz, ou seja, a página inicial da aplicação.
Todas as outras pasta que tiverem um arquivo page.tsx dentro delas serão consideradas rotas filhas.
*/