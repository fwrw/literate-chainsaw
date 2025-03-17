import { ReactNode } from 'react';
import NavButton from '../NavButton/NavButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <nav className="bg-gray-800 p-4 h-24 flex items-center justify-between">
      <ul className="flex space-x-4">
          <li>
            <NavButton to="/">Home</NavButton>
          </li>
        </ul>
        <ul className="flex space-x-4">
          <li>
            <NavButton to="/login">Login</NavButton>
          </li>
          <li>
            <NavButton to="/register">Register</NavButton>
          </li>
          <li>
            <NavButton to="/about">About</NavButton>
          </li>
        </ul>
      </nav>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;