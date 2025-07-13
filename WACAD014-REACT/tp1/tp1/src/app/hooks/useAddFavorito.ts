import { Produto } from "../types/produto";
import { useMutation } from "@tanstack/react-query";
import { addProdutoFavorito } from "../services/produtos";

export function useAddFavorito(onSuccess: () => void, onError: () => void) {
    const { mutate, isPending } = useMutation({
        mutationFn: (produto: Produto) => addProdutoFavorito(produto),
        onSuccess,
        onError
    });

    return {
        addFavorito: mutate,
        isPending
    };
}