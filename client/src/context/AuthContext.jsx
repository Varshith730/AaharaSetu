import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      setUser(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const demoBypass = (role) => {
    // Fast mock login to bypass auth limits during pitch
    const demoProfiles = {
      restaurant: { id: 'demo-res', email: 'demo@restaurant.com', name: 'Spice Garden', role: 'restaurant' },
      ngo: { id: 'demo-ngo', email: 'demo@ngo.com', name: 'Feeding Hyderabad', role: 'ngo' },
      volunteer: { id: 'demo-vol', email: 'demo@volunteer.com', name: 'Arjun Kumar', role: 'volunteer', volunteer_type: 'independent', reward_points: 350, wallet_balance: 150 },
    };
    setUser(demoProfiles[role] || demoProfiles.restaurant);
    localStorage.setItem('aahar-demo-auth', role);
  };

  // Check custom local storage on load
  useEffect(() => {
    const saved = localStorage.getItem('aahar-demo-auth');
    if (saved && !user) demoBypass(saved);
  }, []);

  const logout = async () => {
    localStorage.removeItem('aahar-demo-auth');
    await supabase.auth.signOut();
    setUser(null);
  };

  const signUp = async (email, password, profileData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;

    if (data?.user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: data.user.id,
          email: email,
          name: profileData.name,
          role: profileData.role,
          volunteer_type: profileData.volunteer_type || null,
        }
      ]);
      if (profileError) throw profileError;
    }
    
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signUp, fetchProfile, demoBypass }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
