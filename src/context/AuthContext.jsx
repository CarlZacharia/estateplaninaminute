import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          setClient(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Fetch client profile when user changes
  useEffect(() => {
    if (user) {
      fetchClientProfile(user.id);
    }
  }, [user]);

  const fetchClientProfile = async (userId) => {
    try {
      const { data } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data) {
        setClient(data);
      }
    } catch (err) {
      console.error('Failed to fetch client profile:', err.message);
    }
  };

  const signUp = async (email, password, clientData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: clientData,
      },
    });

    if (error) throw error;
    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    client,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};