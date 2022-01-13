import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";
import { auth } from "../index";

interface AuthTypes {
  currentUser: firebase.User | null | undefined;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => void;
}

const AuthContext = React.createContext<AuthTypes | undefined>(undefined);

interface AuthProps {
  children: React.ReactNode;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProps) {
  const [currentUser, setCurrentUser] = useState<
    firebase.User | null | undefined
  >();
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
