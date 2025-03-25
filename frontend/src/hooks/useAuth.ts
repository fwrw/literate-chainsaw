import { useEffect, useState } from "react";

const useAuth = () => { 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [role, setRole] = useState<"user" | "admin" | null>(null);
    const [loading, setLoading] = useState(true); // Adiciona o estado de carregamento

    useEffect(() => {
        const userId = localStorage.getItem('userId'); 
        const userRole = localStorage.getItem('role');
        setIsAuthenticated(!!userId); 
        setUserId(userId);
        setRole(userRole as "user" | "admin" | null);
        setLoading(false); // Define como carregado após verificar o estado
    }, []);

    const logout = () => {
        localStorage.removeItem('userId'); 
        localStorage.removeItem('role');
        setIsAuthenticated(false); 
        setUserId(null);
        setRole(null);
    }
    
    return { isAuthenticated, userId, role, loading, logout };
}

export default useAuth;