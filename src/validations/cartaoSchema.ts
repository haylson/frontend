import { z } from "zod";

export const cartaoSchema = z
  .object({
    descricao: z.string().min(1, "Descrição é obrigatória"),
    bandeira: z.string().min(1, "Bandeira é obrigatória"),
    ultimosQuatroDigitos: z
      .string()
      .length(4, "Deve conter exatamente 4 dígitos")
      .regex(/^\d+$/, "Somente números são permitidos"),
    vencimento: z
      .string()
      .refine((val) => {
        const num = Number(val);
        return num >= 1 && num <= 31;
      }, "Vencimento deve ser de 1 a 31"),
    limiteTotal: z
      .string()
      .refine((val) => Number(val) > 0, "Limite total deve ser maior que 0"),
    limiteLivre: z
      .string()
      .refine((val) => Number(val) >= 0, "Limite livre deve ser zero ou maior"),
  })
  .refine(
    (data) => Number(data.limiteLivre) <= Number(data.limiteTotal),
    {
      message: "Limite livre não pode ser maior que o limite total",
      path: ["limiteLivre"], // destaca o campo limiteLivre
    }
  );

export type CartaoFormData = z.infer<typeof cartaoSchema>;