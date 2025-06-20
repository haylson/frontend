import { type CartaoFormData } from "../validations/cartaoSchema";
import { type CartaoCreditoDTO } from "../dtos/CartaoCreditoDTO";

export function mapToDTO(form: CartaoFormData, id?: number): CartaoCreditoDTO {
  return {
    id,
    descricao: form.descricao,
    bandeira: form.bandeira,
    ultimosQuatroDigitos: form.ultimosQuatroDigitos,
    vencimento: Number(form.vencimento),
    limiteTotal: Number(form.limiteTotal),
    limiteLivre: Number(form.limiteLivre),
  };
}