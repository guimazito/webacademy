import React from "react";
import userEvent from "@testing-library/user-event";
import { mockProdutos } from "@/app/mocks/produtos";
import ListagemFavoritos from "../ListagemFavoritos";
import { render, screen } from "@testing-library/react";
import { FavoritosProvider, useProdutosFavoritos } from "@/app/State/FavoritosProvider";

jest.mock("../../../State/FavoritosProvider", () => ({
  ...jest.requireActual("../../../State/FavoritosProvider"),
  useProdutosFavoritos: jest.fn(),
}));

describe("ListagemFavoritos", () => {
  it("deve verificar se existe um item na lista de favoritos", () => {
    const produtoMockado = mockProdutos[0];
    const useProdutoFavoritoMock = useProdutosFavoritos as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue([produtoMockado]);

    render(
      <FavoritosProvider>
        <ListagemFavoritos />
      </FavoritosProvider>
    );

    expect(screen.getByText(produtoMockado.nome)).toBeInTheDocument();
    expect(screen.getByText(/Quantidade de produtos: 1/i)).toBeInTheDocument();
  });

  it("deve verificar se não existe nenhum item na lista de favoritos", () => {
    const produtoMockado = mockProdutos[0];
    const useProdutoFavoritoMock = useProdutosFavoritos as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue(false);

    render(
      <FavoritosProvider>
        <ListagemFavoritos />
      </FavoritosProvider>
    );

    expect(screen.getByText("Sua lista de favoritos está vazia.")).toBeInTheDocument();
    expect(screen.queryByText(produtoMockado.nome)).not.toBeInTheDocument();
  });

  it("deve ser possível clicar no botão Remover", async () => {
    const produtoMockado = mockProdutos[0];
    const useProdutoFavoritoMock = useProdutosFavoritos as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue([produtoMockado]);

    render(
      <FavoritosProvider>
        <ListagemFavoritos />
      </FavoritosProvider>
    );

    const botao = screen.getByRole("button", {
      name: /Remover/i,
    });

    await userEvent.click(botao);

    expect(screen.getByText("Sua lista de favoritos está vazia.")).toBeInTheDocument();
    expect(screen.queryByText(produtoMockado.nome)).not.toBeInTheDocument();
  });
});