import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define context structure
interface AuthContextType {
  isAuthenticated: boolean | null;
  userRole: string | null;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/status", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          setIsAuthenticated(false);
          setUserRole(null);
          return;
        }

        const data = await response.json();
        setIsAuthenticated(true);
        setUserRole(data.role);
      } catch (error) {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsAuthenticated(false);
      setUserRole(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, logout }}>
      {isAuthenticated === null ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
