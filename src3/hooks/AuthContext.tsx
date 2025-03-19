import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ILoginUser } from '../Services/interfaces/User/IUser';

interface AuthContextType {
  loginUser: ILoginUser | null;
  setLoginUserInformation: (loginUser: ILoginUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<ILoginUser | null>(() => {
    const savedUser = localStorage.getItem('loginUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {

    if (loginUser) {
      localStorage.setItem('loginUser', JSON.stringify(loginUser));
    } else {
      localStorage.removeItem('loginUser');
    }
  }, [loginUser]);

  const setLoginUserInformation = (loginUserinfo: ILoginUser | null) => {
    setLoginUser(loginUserinfo);
  };

  return (
    <AuthContext.Provider value={{ loginUser, setLoginUserInformation }}>
      {children}
    </AuthContext.Provider>
  );
};
