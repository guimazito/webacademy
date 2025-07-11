import { useMutation } from "@tanstack/react-query";
import { removeProdutoFavorito } from "../services/produtos";
import { Produto } from "../types/produto";


export function useRemoveFavorito(onSuccess: () => void, onError: () => void) {
    const { mutate, isPending } = useMutation({
        mutationFn: (produto: Produto) => removeProdutoFavorito(produto),
        onSuccess,
        onError
    });

    return {
        removeFavorito: mutate,
        isPending
    };
}