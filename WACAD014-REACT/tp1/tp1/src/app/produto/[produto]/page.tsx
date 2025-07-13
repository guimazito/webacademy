"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useDetalhesProduto } from "@/app/hooks/useDetalhesProduto";

export default function Produto() {
    const params = useParams();
    const produto = String(params.produto);
    
    const { detalhesProduto, isPending } = useDetalhesProduto(produto);
    
    if (isPending) return <h5 className="card-title mb-4 fw-bold">Carregando...</h5>;
    if (!detalhesProduto) return <h5>Produto não encontrado</h5>;
    
    return (
        <main>
            <div className="container p-5">
                <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

                    <h5 className="card-title mb-4 fw-bold">{detalhesProduto.nome}</h5>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                    <Image
                        key={detalhesProduto.id}
                        src={detalhesProduto.fotos[0].src}
                        alt={detalhesProduto.nome}
                        width={300}
                        height={320}
                    />
                    </div>

                    <p className="card-text fw-medium">
                    Valor: R${Number(2000).toFixed(2)}
                    </p>
                    <p className="card-text fw-medium">
                        Descrição: {detalhesProduto.descricao}
                    </p>
                    <p className="card-text fw-medium">
                        Anunciado por: {detalhesProduto.usuario_id}
                    </p>
                </div>
                </div>
            </div>
        </main>
    );
}