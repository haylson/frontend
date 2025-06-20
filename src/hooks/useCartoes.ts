import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listarCartoes,
  criarCartao,
  atualizarCartao,
  excluirCartao,
} from '../services/cartaoService';
import { type CartaoCreditoDTO } from '../dtos/CartaoCreditoDTO';

export function useCartoes() {
  const queryClient = useQueryClient();

  const {
    data: cartoes,
    isLoading,
    isError,
    error,
  } = useQuery<CartaoCreditoDTO[]>({
    queryKey: ['cartoes'],
    queryFn: listarCartoes,
  });

  const mutationCriar = useMutation({
    mutationFn: criarCartao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartoes'] });
    },
  });

  const mutationAtualizar = useMutation({
    mutationFn: atualizarCartao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartoes'] });
    },
  });

  const mutationExcluir = useMutation({
    mutationFn: excluirCartao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartoes'] });
    },
  });

  return {
    cartoes,
    isLoading,
    isError,
    error,
    criarCartao: mutationCriar.mutate,
    atualizarCartao: mutationAtualizar.mutate,
    excluirCartao: mutationExcluir.mutate,
  };
}