"use client";
import React from "react";
import { ItemCarrinho as ItemCarrinhoType } from "@/app/types/carrinho";
import ItemCarrinho from "../ItemCarrinho/ItemCarrinho";

interface ListagemCarrinhoProps {
    itemCarrinho: ItemCarrinhoType[];
}

export default function ListagemCarrinho({ itemCarrinho }: ListagemCarrinhoProps) {
    return (
        <>
            <div className="card mb-4">
                <div className="row card-body">
                    <h5 className="card-title mb-4 fw-light">
                    Produtos selecionados
                    </h5>
                    <div className="table-responsive">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Valor Unitário</th>
                                    <th>Quantidade</th>
                                    <th>Valor Total</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemCarrinho.map(item => (
                                    <ItemCarrinho 
                                        key={item.id}
                                        nome={item.nome}
                                        preco={item.preco}
                                        quantidade={item.quantidade}
                                        id={item.id}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
  );
}