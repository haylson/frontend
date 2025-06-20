import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cartaoSchema, type CartaoFormData } from "../validations/cartaoSchema";
import { type CartaoCreditoDTO } from "../dtos/CartaoCreditoDTO";
import { mapToDTO } from "../mappers/cartaoMapper";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  cartao?: CartaoCreditoDTO;
  onSubmit: (cartao: CartaoCreditoDTO) => void;
  onCancelar: () => void;
}

export function CartaoFormulario({ cartao, onSubmit, onCancelar }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CartaoFormData>({
    resolver: zodResolver(cartaoSchema),
    defaultValues: {
      descricao: cartao?.descricao ?? "",
      bandeira: cartao?.bandeira ?? "",
      ultimosQuatroDigitos: cartao?.ultimosQuatroDigitos ?? "",
      vencimento: cartao?.vencimento?.toString() ?? "",
      limiteTotal: cartao?.limiteTotal?.toString() ?? "",
      limiteLivre: cartao?.limiteLivre?.toString() ?? "",
    },
  });

  const [loading, setLoading] = useState(false);

  function submitHandler(data: CartaoFormData) {
    setLoading(true);
    setTimeout(() => {
      const dto = mapToDTO(data, cartao?.id);
      onSubmit(dto);
      setLoading(false);
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <input className="form-control" {...register("descricao")} />
        {errors.descricao && (
          <div className="text-danger">{errors.descricao.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Bandeira</label>
        <input className="form-control" {...register("bandeira")} />
        {errors.bandeira && (
          <div className="text-danger">{errors.bandeira.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Últimos 4 Dígitos</label>
        <input
          className="form-control"
          inputMode="numeric"
          maxLength={4}
          {...register("ultimosQuatroDigitos")}
          onKeyDown={(e) => {
            if (!/[\d]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
              e.preventDefault();
            }
          }}
        />
        {errors.ultimosQuatroDigitos && (
          <div className="text-danger">
            {errors.ultimosQuatroDigitos.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Vencimento (dia do mês)</label>
        <input
          className="form-control"
          inputMode="numeric"
          maxLength={2}
          {...register("vencimento")}
          onKeyDown={(e) => {
            if (!/[\d]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
              e.preventDefault();
            }
          }}
        />
        {errors.vencimento && (
          <div className="text-danger">{errors.vencimento.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Limite Total</label>
        <NumericFormat
          className="form-control"
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          allowNegative={false}
          prefix="R$ "
          value={watch("limiteTotal")}
          onValueChange={({ value }) => setValue("limiteTotal", value)}
        />
        {errors.limiteTotal && (
          <div className="text-danger">{errors.limiteTotal.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Limite Livre</label>
        <NumericFormat
          className="form-control"
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          allowNegative={false}
          prefix="R$ "
          value={watch("limiteLivre")}
          onValueChange={({ value }) => setValue("limiteLivre", value)}
        />
        {errors.limiteLivre && (
          <div className="text-danger">{errors.limiteLivre.message}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary me-2" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancelar} disabled={loading}>
        Cancelar
      </button>
    </form>
  );
}
