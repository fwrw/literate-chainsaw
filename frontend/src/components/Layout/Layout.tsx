import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import NavButton from '../NavButton/NavButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      <nav className="bg-gray-800 p-4 h-24 flex items-center justify-between">
        <ul className="flex space-x-4">
          <li>
            <NavButton active={location.pathname === '/'} to="/">
              Home
            </NavButton>
          </li>
        </ul>
        <ul className="flex space-x-4">
          <li>
            <NavButton active={location.pathname === '/login'} to="/login">
              Login
            </NavButton>
          </li>
          <li>
            <NavButton active={location.pathname === '/register'} to="/register">
              Register
            </NavButton>
          </li>
          <li>
            <NavButton active={location.pathname === '/about'} to="/about">
              About
            </NavButton>
          </li>
        </ul>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;