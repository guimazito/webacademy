import { toast } from "react-toastify";
import { Produto } from "../types/produto";
import { useMutation } from "@tanstack/react-query";
import { addProdutoFavorito } from "../services/produtos";

export function useAddFavorito(refetchFavoritos?: () => void) {
    const { mutate, isPending } = useMutation({
        mutationFn: (produto: Produto) => addProdutoFavorito(produto),
        onSuccess: () => {
            toast.success("Produto adicionado aos favoritos!");
            if (refetchFavoritos) refetchFavoritos();
        },
        onError: () => {
            toast.error("Erro ao adicionar produto aos favoritos!")
        }
    });

    return {
        adicionarAosFavoritos: mutate,
        isAddFavoritoPending: isPending
    };
}