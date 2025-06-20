export type CartaoCreditoDTO = {
  id?: number;
  descricao: string;
  bandeira: string;
  ultimosQuatroDigitos: string;
  vencimento: number;
  limiteTotal: number;
  limiteLivre: number;
};