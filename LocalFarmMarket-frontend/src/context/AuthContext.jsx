import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null); // Add token state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token'); // Get token from storage
    if (user && storedToken) {
      setCurrentUser(JSON.parse(user));
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = (userData, authToken) => { // Accept token parameter
    setCurrentUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken); // Store token
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove token
  };

  const isSeller = () => {
    return currentUser && (currentUser.role === 'seller' || currentUser.role === 'admin');
  };

  const isBuyer = () => {
    return currentUser && currentUser.role === 'buyer';
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      token, // Provide token to consumers
      isAuthenticated: !!currentUser,
      login, 
      logout,
      isLoading,
      isSeller,
      isBuyer
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};