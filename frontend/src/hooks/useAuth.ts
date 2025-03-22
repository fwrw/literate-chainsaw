import { useEffect, useState } from "react";

const useAuth = () => { 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [role, setRole] = useState<"user" | "admin" | null>(null); // Adiciona o estado da role

    useEffect(() => {
        const userId = localStorage.getItem('userId'); 
        const userRole = localStorage.getItem('role'); // Obtém a role do localStorage
        setIsAuthenticated(!!userId); 
        setUserId(userId);
        setRole(userRole as "user" | "admin" | null); // Define a role
    }, []);

    const logout = () => {
        localStorage.removeItem('userId'); 
        localStorage.removeItem('role'); // Remove a role do localStorage
        setIsAuthenticated(false); 
        setUserId(null);
        setRole(null); // Reseta a role
    }
    
    return { isAuthenticated, userId, role, logout }; // Retorna a role

}

export default useAuth;