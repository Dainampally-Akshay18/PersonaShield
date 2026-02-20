import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

function readUsersFromStorage() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem('users');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsersToStorage(users) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem('users', JSON.stringify(users));
  } catch {
    // ignore storage errors
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const stored = window.localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  function signup(username, password) {
    const users = readUsersFromStorage();
    const existing = users.find((u) => u.username === username);

    if (existing) {
      return { success: false, message: 'Username already exists' };
    }

    const newUser = { username, password };
    const updatedUsers = [...users, newUser];

    writeUsersToStorage(updatedUsers);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('currentUser', JSON.stringify(newUser));
    }

    setUser(newUser);
    return { success: true };
  }

  function login(username, password) {
    const users = readUsersFromStorage();
    const existing = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (!existing) {
      return { success: false, message: 'Invalid username or password' };
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('currentUser', JSON.stringify(existing));
    }

    setUser(existing);
    return { success: true };
  }

  function logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('currentUser');
    }

    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
