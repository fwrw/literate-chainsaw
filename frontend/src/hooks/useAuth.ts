import { useState, useEffect } from "react";
import api from "../services/api";

interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
  loading: boolean;
}

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    loading: true,
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.get("/session");
        setAuthState({
          isAuthenticated: true,
          role: response.data.role, // Supondo que o backend retorne a role do usuário
          loading: false,
        });
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          role: null,
          loading: false,
        });
      }
    };

    checkSession();
  }, []);

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      role: null,
      loading: false,
    });
    // Opcional: Faça uma requisição para o backend para encerrar a sessão
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    role: authState.role,
    loading: authState.loading,
    logout,
  };
};

export default useAuth;