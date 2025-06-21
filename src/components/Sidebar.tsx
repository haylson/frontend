import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <div className={`sidebar bg-light border-end ${isOpen ? 'open' : ''}`}>
      <nav className="nav flex-column p-3">
        <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          Dashboard
        </Link>
        <Link to="/cartoes" className={`nav-link ${pathname === '/cartoes' ? 'active' : ''}`}>
          Cartões
        </Link>
        {/* Outros links aqui */}
      </nav>
    </div>
  );
}