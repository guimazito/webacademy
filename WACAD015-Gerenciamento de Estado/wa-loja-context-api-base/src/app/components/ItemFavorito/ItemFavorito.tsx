import Image from "next/image";
import { Produto } from "@/app/types/produto";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import { useRemoveProdutoFavorito } from "../State/FavoritosProvider";

interface IItemFavoritoProps {
  itemFavorito: Produto;
}

export default function ItemFavorito({
  itemFavorito,
}: IItemFavoritoProps) {
  const removeFavorito = useRemoveProdutoFavorito(itemFavorito.id);

  return (
    <tr key={itemFavorito.id}>
      <td className="d-flex flex-row">
        <Image
          className="rounded"
          src={itemFavorito.fotos[0].src}
          alt={itemFavorito.fotos[0].titulo}
          width={50}
          height={50}
        />
        <div className="d-flex flex-column ms-2">
          <span className="">{itemFavorito.nome}</span>
          <small className="text-muted">{itemFavorito.descricao}</small>
        </div>
      </td>

      <td>
        R${" "}
        {calculaValorComPorcentagemDeDesconto(
          Number(itemFavorito.preco),
          itemFavorito.desconto
        ).toFixed(2)}
      </td>

      <td>{itemFavorito.desconto}%</td>

      <td>
        <button
          onClick={removeFavorito}
          className="btn btn-outline-danger btn-sm"
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
