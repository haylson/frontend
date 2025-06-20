import { useState } from 'react';
import { toast } from 'react-toastify';
import { CartaoFormulario } from '../components/CartaoFormulario';
import { CartaoLista } from '../components/CartaoLista';
import { type CartaoCreditoDTO } from '../dtos/CartaoCreditoDTO';
import { useCartoes } from '../hooks/useCartoes';

export function CartoesPage() {
  const { cartoes, isLoading, isError, error, criarCartao, atualizarCartao, excluirCartao } = useCartoes();
  const [cartaoSelecionado, setCartaoSelecionado] = useState<CartaoCreditoDTO | null>(null);
  const [modoFormulario, setModoFormulario] = useState(false);

  const handleSalvar = (cartao: CartaoCreditoDTO) => {
    if (cartao.id) {
      atualizarCartao(cartao);
      toast.success('Cartão atualizado com sucesso!');
    } else {
      criarCartao(cartao);
      toast.success('Cartão criado com sucesso!');
    }
    setModoFormulario(false);
  };

  const handleEditar = (cartao: CartaoCreditoDTO) => {
    setCartaoSelecionado(cartao);
    setModoFormulario(true);
  };

  const handleCancelar = () => {
    setCartaoSelecionado(null);
    setModoFormulario(false);
  };

  const handleDeletar = (id: number) => {
    excluirCartao(id);
    toast.success('Cartão excluído com sucesso!');
  };

  if (isLoading) return <p>Carregando cartões...</p>;
  if (isError) return <p>Erro ao carregar cartões: {(error as Error).message}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cartões de Crédito</h2>

      {modoFormulario ? (
        <CartaoFormulario
          cartao={cartaoSelecionado ?? undefined}
          onSubmit={handleSalvar}
          onCancelar={handleCancelar}
        />
      ) : (
        <>
          <button className="btn btn-primary mb-3" onClick={() => setModoFormulario(true)}>
            Novo Cartão
          </button>

          {cartoes && cartoes.length > 0 ? (
            <CartaoLista cartoes={cartoes} onEditar={handleEditar} onDeletar={handleDeletar} />
          ) : (
            <p>Nenhum cartão cadastrado.</p>
          )}
        </>
      )}
    </div>
  );
}