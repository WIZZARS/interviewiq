import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  initialize: async () => {
    // Initial fetch
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user || null, isLoading: false });
    
    // Subscribe to changes (login/logout events)
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user || null });
    });
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  }
}));
