"use client";
import React from "react";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";

export default function Carrinho() {
  return (
    <main>
      <div className="container p-5">
        <ListagemCarrinho itemCarrinho={mockItensCarrinho} />
        <ResumoCarrinho />
      </div>
    </main>
  );
}