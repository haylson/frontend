import { type CartaoCreditoDTO } from "../dtos/CartaoCreditoDTO";
import { formatarValor } from "../utils/utils";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Props {
  cartoes: CartaoCreditoDTO[];
  onEditar: (cartao: CartaoCreditoDTO) => void;
  onDeletar: (id: number) => void;
}

export function CartaoLista({ cartoes, onEditar, onDeletar }: Props) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Descrição</th>
            <th>Bandeira</th>
            <th className="text-center">Dígitos</th>
            <th className="text-center">Vencimento</th>
            <th className="text-end">Limite Total</th>
            <th className="text-end">Limite Livre</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cartoes.map((c) => (
            <tr key={c.id}>
              <td>{c.descricao}</td>
              <td>{c.bandeira}</td>
              <td className="text-center">{c.ultimosQuatroDigitos}</td>
              <td className="text-center">{c.vencimento}</td>
              <td className="text-end">{formatarValor(c.limiteTotal)}</td>
              <td className="text-end">{formatarValor(c.limiteLivre)}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => {
                    onEditar(c)
                  }}
                >
                  <FaEdit className="me-1" />
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    onDeletar(c.id!)
                  }}
                >
                  <FaTrash className="me-1" />
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}