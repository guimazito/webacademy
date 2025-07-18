import { useQuery } from "@tanstack/react-query";
import { getListaFavoritos } from "../services/produtos";


export function useListaFavoritos() {
    const { data, isPending, isError, refetch }= useQuery({
        queryKey: ["favoritos"],
        queryFn: () => getListaFavoritos(),
    });

    return { favoritos: data, isPending, isError, refetchFavoritos: refetch };
}