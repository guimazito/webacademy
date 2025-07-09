export interface Produto {
  // adicionarAoCarrinho(props: Produto): void;
  id: string;
  fotos: { titulo: string; src: string }[];
  nome: string;
  preco: string;
  descricao: string;
  vendido: string;
  usuario_id: string;
}