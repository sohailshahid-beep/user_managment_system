import React, { createContext, useState, ReactNode, useContext } from 'react';

export type UserRole = 'Manager' | 'Sales Manager' | 'Admin';

export interface User {
  name: string;
  phoneNumber: string;
  role: UserRole;
  isPaidUser: boolean;
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUsers must be used within UserProvider');
  return context;
};
