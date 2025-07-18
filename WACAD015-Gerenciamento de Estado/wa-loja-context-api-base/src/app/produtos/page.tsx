"use client";

import { mockProdutos } from "../mocks/produtos";
import ListagemProdutos from "../components/ListagemProdutos/ListagemProdutos";

export default function Produtos() {
  const produtos = mockProdutos;

  return (
    <main>
      <div className="container p-5">
        <ListagemProdutos produtos={produtos} />
      </div>
    </main>
  );
}