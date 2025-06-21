import { useEffect, useState } from 'react';
import { FaBars, FaSun, FaMoon } from 'react-icons/fa';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid">
        <button
          className="btn btn-outline-secondary me-3"
          onClick={onToggleSidebar}
          aria-label="Abrir menu"
        >
          <FaBars />
        </button>
        <span className="navbar-brand mb-0 h1">Meu Controle Financeiro</span>
        <div className="ms-auto d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            title="Alternar tema"
            onClick={toggleTheme}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <span className="me-2">Olá, Usuário</span>
          <button className="btn btn-outline-danger btn-sm">Logout</button>
        </div>
      </div>
    </header>
  );
}