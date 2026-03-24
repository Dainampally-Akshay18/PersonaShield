import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Store credentials in memory (lost on refresh) for security
const IN_MEMORY_CREDENTIALS = new Map();

function readUsersFromStorage() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem('personas');
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
    window.localStorage.setItem('personas', JSON.stringify(users));
  } catch {
    // ignore storage errors
  }
}

function generateSessionToken(username) {
  const timestamp = Date.now();
  const token = btoa(`${username}:${timestamp}`);
  return token;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const token = window.localStorage.getItem('sessionToken');
      const username = window.localStorage.getItem('sessionUser');
      
      if (token && username) {
        return { username };
      }
      return null;
    } catch {
      return null;
    }
  });

  function signup(username, password) {
    // Validate input
    if (!username || !password) {
      return { success: false, message: 'Username and password required' };
    }

    if (username.length < 3) {
      return { success: false, message: 'Username must be at least 3 characters' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    const users = readUsersFromStorage();
    const existing = users.find((u) => u.username === username);

    if (existing) {
      return { success: false, message: 'Username already exists' };
    }

    // Store credential in memory only (not localStorage)
    IN_MEMORY_CREDENTIALS.set(username, password);

    // Store username in personas list (no password)
    const newPersona = { username, created: new Date().toISOString() };
    const updatedUsers = [...users, newPersona];
    writeUsersToStorage(updatedUsers);

    // Create session token
    const token = generateSessionToken(username);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sessionToken', token);
      window.localStorage.setItem('sessionUser', username);
    }

    setUser({ username });
    return { success: true };
  }

  function login(username, password) {
    // Check memory first (for current session)
    let storedPassword = IN_MEMORY_CREDENTIALS.get(username);

    // If not in memory, check if user exists in personas
    if (!storedPassword) {
      const users = readUsersFromStorage();
      const userExists = users.find((u) => u.username === username);
      
      if (!userExists) {
        return { success: false, message: 'Invalid username or password' };
      }
      
      // User exists but we need password for this session
      // For demo purposes, we'll accept any password after first login
      IN_MEMORY_CREDENTIALS.set(username, password);
      storedPassword = password;
    }

    // Validate password
    if (storedPassword !== password) {
      return { success: false, message: 'Invalid username or password' };
    }

    // Create session token
    const token = generateSessionToken(username);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sessionToken', token);
      window.localStorage.setItem('sessionUser', username);
    }

    setUser({ username });
    return { success: true };
  }

  function logout() {
    const username = user?.username;
    if (username) {
      IN_MEMORY_CREDENTIALS.delete(username);
    }

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('sessionToken');
      window.localStorage.removeItem('sessionUser');
    }

    setUser(null);
  }

  function logout() {
    const username = user?.username;
    if (username) {
      IN_MEMORY_CREDENTIALS.delete(username);
    }

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('sessionToken');
      window.localStorage.removeItem('sessionUser');
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
