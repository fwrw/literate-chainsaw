import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavButton from "../NavButton/NavButton";
import useAuth from "../../hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, role, logout, loading } = useAuth(); // Inclui o estado de carregamento

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    // Exibe um indicador de carregamento enquanto verifica a autenticação
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className="bg-gray-800 p-4 h-24 flex items-center justify-between">
        <ul className="flex space-x-4">
          <li>
            <NavButton active={location.pathname === "/"} to="/">
              Home
            </NavButton>
          </li>
        </ul>
        <ul className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <li>
                <NavButton active={location.pathname === "/tasks"} to="/tasks">
                  Tasks
                </NavButton>
              </li>

              {role === "admin" && (
                <>
                  <li>
                    <NavButton
                      active={location.pathname === "/admin/users"}
                      to="/admin/users"
                    >
                      Users
                    </NavButton>
                  </li>
                  <li>
                    <NavButton
                      active={location.pathname === "/admin/tasks"}
                      to="/admin/tasks"
                    >
                      All Tasks
                    </NavButton>
                  </li>
                  <li>
                    <NavButton
                      active={location.pathname === "/admin/tags"}
                      to="/admin/tags"
                    >
                      All Tags
                    </NavButton>
                  </li>
                </>
              )}

              <li>
                <NavButton onClick={handleLogout}>
                  <span className="text-red-800">Logout</span>
                </NavButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavButton active={location.pathname === "/login"} to="/login">
                  Login
                </NavButton>
              </li>
              <li>
                <NavButton
                  active={location.pathname === "/register"}
                  to="/register"
                >
                  Register
                </NavButton>
              </li>
              <li>
                <NavButton active={location.pathname === "/about"} to="/about">
                  About
                </NavButton>
              </li>
            </>
          )}
        </ul>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;