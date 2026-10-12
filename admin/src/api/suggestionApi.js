import { supabase } from '../lib/supabase';

export const getSuggestions = async () => {
  const { data, error } = await supabase
    .from('suggestions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Convert to frontend format
  return {
    data: data.map(s => ({
      ...s,
      date: s.created_at
    }))
  };
};

export const updateSuggestionStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('suggestions')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  
  return { 
    data: {
      ...data,
      date: data.created_at
    }
  };
};

export const deleteSuggestion = async (id) => {
  const { error } = await supabase
    .from('suggestions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { data: { message: 'Suggestion deleted successfully' } };
};
