"use client";  // Fala pro Next.js que este componente deve ser renderizado no lado do cliente
import Image from "next/image";
import React from "react";

export default function Produtos() {
  return (
    <>
      {/* <> significa React.Fragment. Posso retonar múltiplos componentes. Ex: nav e main, abaixo  */}
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
              <p className="card-text fw-medium">Quantidade total: 10</p>
              <p className="card-text fw-medium">
                Valor total: R${(1500).toFixed(2)}
              </p>
            </div>
          </div>

          <h5 className="mb-3">Produtos disponíveis:</h5>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            <div className="col">
              <div className="card shadow-sm h-100">
                <Image
                  src="/placeholder.png"
                  className="card-img-top"
                  alt="imagem placeholder"
                  width={300}
                  height={320}
                />

                <div className="card-body bg-light">
                  <h5 className="card-title">Notebook 1</h5>
                  <p className="card-text text-secondary">R$ 1500</p>
                  <button className="btn btn-dark d-block w-100" type="button">
                    Adicionar no carrinho
                  </button>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card shadow-sm h-100">
                <Image
                  src="/placeholder.png"
                  className="card-img-top"
                  alt="imagem placeholder"
                  width={300}
                  height={320}
                />

                <div className="card-body bg-light">
                  <h5 className="card-title">Notebook 1</h5>
                  <p className="card-text text-secondary">R$ 1500</p>
                  <button className="btn btn-dark d-block w-100" type="button">
                    Adicionar no carrinho
                  </button>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card shadow-sm h-100">
                <Image
                  src="/placeholder.png"
                  className="card-img-top"
                  alt="imagem placeholder"
                  width={300}
                  height={320}
                />

                <div className="card-body bg-light">
                  <h5 className="card-title">Notebook 1</h5>
                  <p className="card-text text-secondary">R$ 1500</p>
                  <button className="btn btn-dark d-block w-100" type="button">
                    Adicionar no carrinho
                  </button>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card shadow-sm h-100">
                <Image
                  src="/placeholder.png"
                  className="card-img-top"
                  alt="imagem placeholder"
                  width={300}
                  height={320}
                />

                <div className="card-body bg-light">
                  <h5 className="card-title">Notebook 1</h5>
                  <p className="card-text text-secondary">R$ 1500</p>
                  <button className="btn btn-dark d-block w-100" type="button">
                    Adicionar no carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/*
page.tsx é a nossa rota raiz, ou seja, a página inicial da aplicação.
Todas as outras pasta que tiverem um arquivo page.tsx dentro delas serão consideradas rotas filhas.
*/