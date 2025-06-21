import { type CartaoCreditoDTO } from '../dtos/CartaoCreditoDTO';
import { formatarValor } from '../utils/utils';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface Props {
  cartoes: CartaoCreditoDTO[];
  onEditar: (cartao: CartaoCreditoDTO) => void;
  onDeletar: (id: number) => void;
}

export function CartaoLista({ cartoes, onEditar, onDeletar }: Props) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Descrição</th>
            <th>Bandeira</th>
            <th>Vencimento</th>
            <th>Limite Total</th>
            <th>Limite Livre</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cartoes.map((c) => (
            <tr key={c.id}>
              <td data-label="Descrição">{c.descricao}</td>
              <td data-label="Bandeira">{c.bandeira}</td>
              <td data-label="Vencimento">{c.vencimento}</td>
              <td data-label="Limite Total">{formatarValor(c.limiteTotal.toFixed(2))}</td>
              <td data-label="Limite Livre">{formatarValor(c.limiteLivre.toFixed(2))}</td>
              <td data-label="Ações" className="text-center">
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  title="Editar"
                  onClick={() => onEditar(c)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  title="Excluir"
                  onClick={() => onDeletar(c.id!)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}