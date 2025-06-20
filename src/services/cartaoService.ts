import { api } from './api';
import { type CartaoCreditoDTO } from '../dtos/CartaoCreditoDTO';

export async function listarCartoes(): Promise<CartaoCreditoDTO[]> {
  const response = await api.get('/cartoes');
  return response.data;
}

export async function criarCartao(cartao: CartaoCreditoDTO): Promise<void> {
  await api.post('/cartoes', cartao);
}

export async function atualizarCartao(cartao: CartaoCreditoDTO): Promise<void> {
  await api.put(`/cartoes/${cartao.id}`, cartao);
}

export async function excluirCartao(id: number): Promise<void> {
  await api.delete(`/cartoes/${id}`);
}