import { useQuery } from "@tanstack/react-query";
import { getProduto } from "../services/produtos";


export function useDetalhesProduto(nomeProduto: string) {
    const { data, isPending, isError }= useQuery({
        queryKey: ["detalhesProduto", nomeProduto],
        queryFn: () => getProduto(nomeProduto),
    });

    return { detalhesProduto: data, isPending, isError };
}