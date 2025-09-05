import { create } from 'zustand';

export type UserRole = 'Manager' | 'Sales Manager' | 'Admin';

export interface User {
  id: number; 
  name: string;
  phoneNumber: string;
  role: UserRole;
  isPaidUser: boolean;
}

interface UserContextType {
  user: User[]; 
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
  updateUser: (user: User) => void; 
}

export const useUserStore = create<UserContextType>((set) => ({
  user: [],
  addUser: (user: User) =>
    set((state) => ({ user: [...state.user, user] })),
  removeUser: (id: number) =>
    set((state) => ({ user: state.user.filter((u) => u.id !== id) })),
  updateUser: (updatedUser: User) =>
    set((state) => ({
      user: state.user.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      ),
    })), 
}));
