import { useEffect, useState } from "react";
import { type CartaoCreditoDTO } from "../dtos/CartaoCreditoDTO";
import { CartaoFormulario } from "../components/CartaoFormulario";
import { CartaoLista } from "../components/CartaoLista";
import { toast } from "react-toastify";

export default function CartoesPage() {
  const [cartoes, setCartoes] = useState<CartaoCreditoDTO[]>([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState<CartaoCreditoDTO | null>(null);
  const [exibirFormulario, setExibirFormulario] = useState(false);

  // Mock inicial
  useEffect(() => {
    setCartoes([
      {
        id: 1,
        descricao: "Nubank",
        bandeira: "Mastercard",
        ultimosQuatroDigitos: "1234",
        vencimento: 10,
        limiteTotal: 5000,
        limiteLivre: 1500,
      },
    ]);
  }, []);

  function salvar(cartao: CartaoCreditoDTO) {
    if (!cartao.id) {
      const novo = {
        ...cartao,
        id: Math.max(...cartoes.map(c => c.id ?? 0), 0) + 1,
      };
      setCartoes([...cartoes, novo]);
      toast.success("Cartão adicionado!");
    } else {
      const atualizados = cartoes.map(c => (c.id === cartao.id ? cartao : c));
      setCartoes(atualizados);
      toast.success("Cartão atualizado com sucesso!");
    }

    cancelar();
  }

  function editar(cartao: CartaoCreditoDTO) {
    setCartaoSelecionado(cartao);
    setExibirFormulario(true);
  }

  function deletar(id: number) {
    if (confirm("Confirmar exclusão?")) {
      setCartoes(cartoes.filter(c => c.id !== id));
      toast.success("Cartão excluído com sucesso!");
    }
  }

  function cancelar() {
    setCartaoSelecionado(null);
    setExibirFormulario(false);
  }

  return (
    <div className="container mt-4">
      <h2>Cartões de Crédito</h2>

      {exibirFormulario ? (
        <CartaoFormulario
          cartao={cartaoSelecionado ?? undefined}
          onSubmit={salvar}
          onCancelar={cancelar}
        />
      ) : (
        <>
          <button className="btn btn-success mb-3" onClick={() => setExibirFormulario(true)}>
            + Novo Cartão
          </button>
          <CartaoLista
            cartoes={cartoes}
            onEditar={editar}
            onDeletar={deletar}
          />
        </>
      )}
    </div>
  );
}