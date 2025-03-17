import { Link } from "react-router-dom";

interface NavButtonProps {
  to: string;
  children: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, children }) => {
  return (
    <Link to={to} className="relative group inline-block px-6 py-2">
      <span className="absolute inset-0 rounded-lg bg-gray-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
      <span className="relative text-white group-hover:text-gray-400">
        {children}
      </span>
    </Link>
  );
};

export default NavButton;