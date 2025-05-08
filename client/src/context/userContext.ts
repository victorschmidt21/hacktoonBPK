import { create } from 'zustand';
import type { UserAttributes } from '../api/routes/user/user';

interface UserState {
  user: UserAttributes | null;
  setUser: (user: UserAttributes) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));