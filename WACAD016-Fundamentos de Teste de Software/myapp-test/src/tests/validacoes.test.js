const {
    primeiroNome,
    verificarDisponibilidadeEstoque,
    calcularPrecoTotal,
} = require('../utils/validacoes');

describe("primeiroNome(nomeCompleto)", () => {
  it("deve retornar o nome completo se não houver espaço", () => {
    expect(primeiroNome("Cláudio")).toBe("Cláudio");
  });

  it("deve retornar o primeiro nome quando houver espaço entre os nomes", () => {
    expect(primeiroNome("Cláudio Albano")).toBe("Cláudio");
    expect(primeiroNome("Cláudio Albano Guimarães")).toBe("Cláudio");
  });

  it("deve retornar o primeiro nome quando houver espaço no início", () => {
    expect(primeiroNome(" Cláudio")).toBe("Cláudio");
  });

  it("deve retornar o primeiro nome quando houver espaço no final", () => {
    expect(primeiroNome("Cláudio ")).toBe("Cláudio");
  });

  it("deve retornar o primeiro nome quando houver múltiplos espaços", () => {
    expect(primeiroNome("Cláudio     Albano")).toBe("Cláudio");
  });

  it("deve retornar o primeiro nome quando houver espaços mistos", () => {
    expect(primeiroNome("   Cláudio Albano   ")).toBe("Cláudio");
  });

  it("deve retornar string vazia se o nome for vazio", () => {
    expect(primeiroNome("")).toBe("");
  });
});

describe("verificarDisponibilidadeEstoque(tipoProduto, quantidade)", () => {
  it("deve retornar true se a quantidade for menor que o estoque", () => {
    expect(verificarDisponibilidadeEstoque("laptop", 1)).toBe(true);
  });

  it("deve retornar true se a quantidade for igual ao estoque", () => {
    expect(verificarDisponibilidadeEstoque("tablet", 15)).toBe(true);
  });

  it("deve retornar false se a quantidade for maior que o estoque", () => {
    expect(verificarDisponibilidadeEstoque("livro", 1)).toBe(false);
  });

  it("deve retornar false se quantidade for igual a zero", () => {
    expect(verificarDisponibilidadeEstoque("headphone", 0)).toBe(false);
  });

  it("deve retornar false se quantidade for menor que zero", () => {
    expect(verificarDisponibilidadeEstoque("headphone", -2)).toBe(false);
  });

  it("deve retornar undefined se quantidade for não numérica", () => {
    expect(verificarDisponibilidadeEstoque("headphone", "dois")).toBe(undefined);
  });

  it("deve retornar undefined se o produto não existir no estoque", () => {
    expect(verificarDisponibilidadeEstoque("caneta", 4)).toBe(undefined);
  });

  it("deve retornar undefined se o produto for vazio", () => {
    expect(verificarDisponibilidadeEstoque("", 4)).toBe(undefined);
  });

  it("deve retornar undefined se o tipo de produto for null", () => {
    expect(verificarDisponibilidadeEstoque(null, 4)).toBe(undefined);
  });

  it("deve retornar undefined se o tipo de produto for undefined", () => {
    expect(verificarDisponibilidadeEstoque(undefined, 4)).toBe(undefined);
  });

  it("deve retornar undefined se a quantidade for null", () => {
    expect(verificarDisponibilidadeEstoque("smartphone", null)).toBe(undefined);
  });

  it("deve retornar undefined se a quantidade for undefined", () => {
    expect(verificarDisponibilidadeEstoque("smartphone", undefined)).toBe(undefined);
  });
});

describe("calcularPrecoTotal(produtos)", () => {
  it("deve retornar 0 para array de produtos vazio", () => {
    expect(calcularPrecoTotal([])).toBe(0);
  });

  it("deve retornar 0 para array de produtos null", () => {
    expect(calcularPrecoTotal(null)).toBe(0);
  });

  it("deve retornar 0 para array de produtos undefined", () => {
    expect(calcularPrecoTotal(undefined)).toBe(0);
  });

  it("deve retornar 0 para produto com quantidade zero", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 0 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(0);
  });

  it("deve retornar 0 para produto com preco zero", () => {
    const produtos = [
      { nome: "Produto 1", preco: 0, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(0);
  });

  it("deve retornar NaN para produto com quantidade negativa", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: -2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(NaN);
  });

  it("deve retornar NaN para produto com preco negativo", () => {
    const produtos = [
      { nome: "Produto 1", preco: -10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(NaN);
  });

  it("deve retornar NaN para produto faltando campo quantidade", () => {
    const produtos = [
      { nome: "Produto 1", preco: -10 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(NaN);
  });

  it("deve retornar NaN para produto faltando campo preco", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 2 },
      { nome: "Produto 2", quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(NaN);
  });

  it("deve retornar NaN para produto com quantidade não numérica", () => {
    const produtos = [
      { nome: "Produto 1", preco: -10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: "dois" },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(NaN);
  });

  it("deve retornar NaN para produto com preco não numérico", () => {
    const produtos = [
      { nome: "Produto 1", preco: -10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: "vinte", quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(NaN);
  });

  it("deve retornar NaN para produto com quantidade null", () => {
    const produtos = [
      { nome: "Produto 1", preco: -10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: null },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(NaN);
  });

  it("deve retornar NaN para produto com preco null", () => {
    const produtos = [
      { nome: "Produto 1", preco: -10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: null, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(NaN);
  });

  it("deve retornar NaN para produto com quantidade undefined", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: undefined },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(NaN);
  });

  it("deve retornar NaN para produto com preco undefined", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: undefined, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(NaN);
  });

  it("deve calcular corretamente o preço total de array com apenas um produto", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 2 },
    ];
    const totalEsperado = 10 * 2;
    expect(calcularPrecoTotal(produtos)).toBe(totalEsperado);
  });

  it("deve calcular corretamente o preço total dos produtos", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    const totalEsperado = 10 * 2 + 15 * 2 + 20 * 1;
    expect(calcularPrecoTotal(produtos)).toBe(totalEsperado);
  });
});