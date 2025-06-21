import { useState } from 'react';
import { toast } from 'react-toastify';
import { CartaoFormulario } from '../components/CartaoFormulario';
import { CartaoLista } from '../components/CartaoLista';
import { type CartaoCreditoDTO } from '../dtos/CartaoCreditoDTO';
import { useCartoes } from '../hooks/useCartoes';
import { groupBy } from 'lodash';

export function CartoesPage() {
  const { cartoes, isLoading, isError, error, criarCartao, atualizarCartao, excluirCartao } = useCartoes();
  const [cartaoSelecionado, setCartaoSelecionado] = useState<CartaoCreditoDTO | null>(null);
  const [modoFormulario, setModoFormulario] = useState(false);
  const [filtro, setFiltro] = useState('');

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

  const cartoesFiltrados = cartoes?.filter((c) =>
    c.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
    c.bandeira.toLowerCase().includes(filtro.toLowerCase())
  ) ?? [];

  const cartoesAgrupados = groupBy(cartoesFiltrados, 'vencimento');

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
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <input
              type="text"
              className="form-control"
              style={{ maxWidth: 300 }}
              placeholder="Buscar por descrição ou bandeira"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => setModoFormulario(true)}>
              Novo Cartão
            </button>
          </div>

          {cartoesFiltrados.length === 0 ? (
            <p>Nenhum cartão encontrado.</p>
          ) : (
            Object.entries(cartoesAgrupados).map(([vencimento, cartoes]) => (
              <div key={vencimento} className="mb-4">
                <h5 className="cartao-group-title">Vencimento: dia {vencimento}</h5>
                <CartaoLista
                  cartoes={cartoes}
                  onEditar={handleEditar}
                  onDeletar={handleDeletar}
                />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}