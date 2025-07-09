"use client";
import type { ItemCarrinho } from "@/app/types/carrinho";
import React from "react";

export default function ItemCarrinho(props: ItemCarrinho) {
    const valorTotalProduto = ( 
        precoUnitario: number,
        quantidade: number
    ): number => precoUnitario * quantidade;

    return (
        <>  
            <tr key={props.id}>
                <td>{props.nome}</td>
                <td>R$ {props.preco.toFixed(2)}</td>
                <td>{props.quantidade}</td>

                <td>R$ {valorTotalProduto(props.preco, props.quantidade).toFixed(2)}</td>
                <td>
                    <button className="btn btn-danger btn-sm">
                        Remover
                    </button>
                </td>
            </tr>                        
        </>
  );
}