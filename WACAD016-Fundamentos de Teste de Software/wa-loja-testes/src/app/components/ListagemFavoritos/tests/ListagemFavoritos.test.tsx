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

  it("deve ser possível clicar no botão Remover havendo um item na lista de favoritos", async () => {    
    const produtoMockado = mockProdutos[0];
    let favoritos = [produtoMockado];
    const useProdutoFavoritoMock = useProdutosFavoritos as jest.Mock;
    useProdutoFavoritoMock.mockImplementation(() => favoritos);

    render(
      <FavoritosProvider>
        <ListagemFavoritos />
      </FavoritosProvider>
    );

    const botao = screen.getByRole("button", {
      name: /Remover/i
    });

    useProdutoFavoritoMock.mockImplementation(() => []);
    await userEvent.click(botao);

    expect(await screen.findByText("Sua lista de favoritos está vazia.")).toBeInTheDocument();
  });

  it("deve exibir na lista de favoritos todos os produtos", () => {
    const useProdutoFavoritoMock = useProdutosFavoritos as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue([
      mockProdutos[0],
      mockProdutos[1],
      mockProdutos[2],
      mockProdutos[3],
      mockProdutos[4]
    ]);

    render(
      <FavoritosProvider>
        <ListagemFavoritos />
      </FavoritosProvider>
    );

    expect(screen.getByText(mockProdutos[0].nome)).toBeInTheDocument();
    expect(screen.getByText(mockProdutos[1].nome)).toBeInTheDocument();
    expect(screen.getByText(mockProdutos[2].nome)).toBeInTheDocument();
    expect(screen.getByText(mockProdutos[3].nome)).toBeInTheDocument();
    expect(screen.getByText(mockProdutos[4].nome)).toBeInTheDocument();
  });

  it("deve remover da lista de favoritos apenas o produto clicado", async () => {
    const useProdutoFavoritoMock = useProdutosFavoritos as jest.Mock;
    let favoritos = [mockProdutos[0], mockProdutos[1]];
    useProdutoFavoritoMock.mockImplementation(() => favoritos);

    render(
      <FavoritosProvider>
        <ListagemFavoritos />
      </FavoritosProvider>
    );

    const botoes = screen.getAllByRole("button", {
      name: /Remover/i
    });

    favoritos = [mockProdutos[1]];
    useProdutoFavoritoMock.mockImplementation(() => favoritos);
    await userEvent.click(botoes[0]);

    expect(screen.queryByText(mockProdutos[0].nome)).not.toBeInTheDocument();
    expect(screen.getByText(mockProdutos[1].nome)).toBeInTheDocument();
  });

  it("deve exibir mensagem de lista vazia se favoritos for undefined", () => {
    const useProdutoFavoritoMock = useProdutosFavoritos as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue(undefined);

    render(
      <FavoritosProvider>
        <ListagemFavoritos />
      </FavoritosProvider>
    );

    expect(screen.getByText("Sua lista de favoritos está vazia.")).toBeInTheDocument();
  });1

  it("deve exibir mensagem de lista vazia se favoritos for null", () => {
    const useProdutoFavoritoMock = useProdutosFavoritos as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue(null);

    render(
      <FavoritosProvider>
        <ListagemFavoritos />
      </FavoritosProvider>
    );

    expect(screen.getByText("Sua lista de favoritos está vazia.")).toBeInTheDocument();
  });

  it("deve exibir a quantidade correta de produtos na lista de favoritos", () => {
    const useProdutoFavoritoMock = useProdutosFavoritos as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue([mockProdutos[0], mockProdutos[1], mockProdutos[2]]);

    render(
      <FavoritosProvider>
        <ListagemFavoritos />
      </FavoritosProvider>
    );

    expect(screen.getByText(/Quantidade de produtos: 3/i)).toBeInTheDocument();
  });
});