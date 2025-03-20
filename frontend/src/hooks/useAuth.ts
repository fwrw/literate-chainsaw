import { useEffect, useState } from "react";

const useAuth = () => { 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId'); 
        setIsAuthenticated(!!userId); 
        setUserId(userId);
    }, []);

    const logout = () => {
        localStorage.removeItem('userId'); 
        setIsAuthenticated(false); 
        setUserId(null);

    }
    
    return { isAuthenticated, userId, logout };

}

export default useAuth;