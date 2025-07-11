import { useQuery } from "@tanstack/react-query";
import { getListaProduto } from "../services/produtos";


export function useListaProdutos() {
    const { data, isPending, isError }= useQuery({
        queryKey: ["produtos"],
        queryFn: () => getListaProduto(),
    });

    return { produtos: data, isPending, isError };
}