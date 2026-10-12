import { supabase } from '../lib/supabase';

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    throw { response: { data: { message: error.message } } };
  }
  
  return {
    data: {
      token: data.session.access_token,
      admin: { 
        name: data.user.email.split('@')[0], // Use email username as name
        email: data.user.email 
      }
    }
  };
};
