import { toast } from "react-toastify";
import { Produto } from "../types/produto";
import { useMutation } from "@tanstack/react-query";
import { removeProdutoFavorito } from "../services/produtos";

export function useRemoveFavorito(refetchFavoritos?: () => void) {
    const { mutate, isPending } = useMutation({
        mutationFn: (produto: Produto) => removeProdutoFavorito(produto),
        onSuccess: () => {
            toast.success("Produto removido dos favoritos!");
            if (refetchFavoritos) refetchFavoritos();
        },
        onError: () => {
            toast.error("Erro ao remover produto dos favoritos!")
        }
    });

    return {
        removerFavorito: mutate,
        isRemoveFavoritoPending: isPending
    };
}