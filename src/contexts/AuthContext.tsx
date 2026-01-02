import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import ognaClient from "@/lib/ogna";

interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  aud?: string;
  role?: string;
}

interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  auth: typeof ognaClient.auth;
  client: typeof ognaClient;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const currentSession = ognaClient.auth.session;
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Update user when auth state changes
  useEffect(() => {
    const currentUser = ognaClient.auth.getUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, [session]);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: ognaClient.auth.isLoggedIn(),
    auth: ognaClient.auth,
    client: ognaClient,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
