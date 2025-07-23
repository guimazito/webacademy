import React from "react";
import ListagemFavoritos from "../ListagemFavoritos";
import { render, screen } from "@testing-library/react";
import { FavoritosContext } from "@/app/State/FavoritosProvider";

const mockFavoritos = [
  {
    id: "notebook-3",
    fotos: [
      {
        titulo: "notebook-4",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/notebook-2.jpg",
      },
      {
        titulo: "smartwatch-3",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/smartwatch-2.jpg",
      },
    ],
    nome: "Notebook",
    preco: "2300",
    desconto: 15,
    descricao: "descrição legal",
    vendido: "false",
    usuario_id: "lobo@origamid.com",
  },
];

const mockContext = {
  favoritos: mockFavoritos,
  valorTotalFavoritos: () => 0,
  isAddFavoritoPending: false,
  isRemoveFavoritoPending: false,
  // adicionarAosFavoritos: jest.fn(),
  removerFavorito: jest.fn(),
  verificaSeFavorito: jest.fn(),
  setFavoritos: jest.fn(),
};

describe("ListagemFavoritos", () => {
  it("deve renderizar um item na lista de favoritos", () => {
    render(
      <FavoritosContext.Provider value={mockContext as any}>
        <ListagemFavoritos />
      </FavoritosContext.Provider>
    );

    expect(screen.getByText("Notebook")).toBeInTheDocument();
    expect(screen.getByText(/Quantidade de produtos: 1/i)).toBeInTheDocument();
  });
});

  const mockFavoritos2 = [];

  const mockContext2 = {
    favoritos: mockFavoritos2,
    valorTotalFavoritos: () => 0,
    isAddFavoritoPending: false,
    isRemoveFavoritoPending: false,
    adicionarAosFavoritos: jest.fn(),
    removerFavorito: jest.fn(),
    verificaSeFavorito: jest.fn(),
    setFavoritos: jest.fn(),
  };

  it("deve verificar se não existe nenhum item na lista de favoritos", () => {
    render(
      <FavoritosContext.Provider value={mockContext2 as any}>
        <ListagemFavoritos />
      </FavoritosContext.Provider>
    );

    expect(screen.getByText("Sua lista de favoritos está vazia.")).toBeInTheDocument();
    expect(screen.queryByText("Notebook")).not.toBeInTheDocument();
  });
