import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types/types';

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
