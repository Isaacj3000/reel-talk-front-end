import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        const validateToken = async () => {
            try {
                const userData = await userService.validateToken(token);
                setUser(userData);
            } catch (error) {
                console.error('Token validation failed:', error);
                // Clear invalid token
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, []);

    const signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <UserContext.Provider value={{ user, setUser, signOut, loading }}>
            {children}
        </UserContext.Provider>
    );
};
