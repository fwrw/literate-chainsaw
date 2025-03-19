import { Link } from "react-router-dom";

interface NavButtonProps {
  active: boolean;
  to: string;
  children: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, to, children }) => {
  return (
    <Link to={to} className="relative group inline-block px-6 py-2">
      <span
        className={`absolute inset-0 rounded-lg ${
          active ? "bg-gray-700" : "bg-gray-600"
        } transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      ></span>
      <span
        className={`relative ${
          active ? "text-gray-300" : "text-white"
        } group-hover:text-gray-400`}
      >
        {children}
      </span>
    </Link>
  );
};

export default NavButton;