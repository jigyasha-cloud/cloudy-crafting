import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  authModalOpen: boolean;
  authMode: 'login' | 'signup' | 'forgot';
  myOrdersModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: 'login' | 'signup' | 'forgot') => void;
  setMyOrdersModalOpen: (open: boolean) => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, User> = {
  'neeta@cloud9celebrations.com': {
    id: 'u-101',
    name: 'Neeta Kungrani',
    email: 'neeta@cloud9celebrations.com',
    phone: '+91 9289280613',
    createdAt: '2025-01-15',
  },
  'demo@cloud9celebrations.com': {
    id: 'u-102',
    name: 'Art Lover Demo',
    email: 'demo@cloud9celebrations.com',
    phone: '+91 9876543210',
    createdAt: '2025-02-01',
  },
};

export const AuthProvider: React.FC<{ children: ReactNode; onToast?: (msg: string, type?: 'custom' | 'cart' | 'wishlist' | 'booking') => void }> = ({
  children,
  onToast,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('cloud9_auth_user') || localStorage.getItem('3cs_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [myOrdersModalOpen, setMyOrdersModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cloud9_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cloud9_auth_user');
      localStorage.removeItem('3cs_auth_user');
    }
  }, [user]);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate slight network delay
    await new Promise((r) => setTimeout(r, 600));

    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail) {
      return { success: false, error: 'Please enter your email address' };
    }

    if (password && password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long' };
    }

    // Match demo user or construct dynamic profile
    let loggedUser = DEMO_USERS[cleanEmail];
    if (!loggedUser) {
      const namePart = cleanEmail.split('@')[0];
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      loggedUser = {
        id: 'u-' + Math.floor(Math.random() * 900000 + 100000),
        name: formattedName + ' Cloud9 Member',
        email: cleanEmail,
        phone: '+91 9289280613',
        createdAt: new Date().toISOString().split('T')[0],
      };
    }

    setUser(loggedUser);
    setAuthModalOpen(false);
    if (onToast) onToast(`Welcome back, ${loggedUser.name}! ✨`, 'custom');
    return { success: true };
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 600));

    if (!name.trim()) {
      return { success: false, error: 'Please enter your full name' };
    }
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    if (password && password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const newUser: User = {
      id: 'u-' + Math.floor(Math.random() * 900000 + 100000),
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim() || '+91 9289280613',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUser(newUser);
    setAuthModalOpen(false);
    if (onToast) onToast(`Account created! Welcome to cloud9_celebrations, ${newUser.name} 🌸`, 'custom');
    return { success: true };
  };

  const logout = () => {
    const previousName = user?.name || 'Member';
    setUser(null);
    setMyOrdersModalOpen(false);
    if (onToast) onToast(`Signed out. See you soon, ${previousName}!`, 'custom');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authModalOpen,
        authMode,
        myOrdersModalOpen,
        openAuthModal,
        closeAuthModal,
        setAuthMode,
        setMyOrdersModalOpen,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
