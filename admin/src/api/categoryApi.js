import { supabase } from '../lib/supabase';

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return { data };
};

export const createCategory = async (categoryData) => {
  const cleanName = categoryData.name.trim();

  // Check for duplicate category name (case-insensitive)
  const { data: existing, error: checkError } = await supabase
    .from('categories')
    .select('id')
    .ilike('name', cleanName)
    .limit(1);

  if (checkError) console.warn('Duplicate category check warning:', checkError);
  if (existing && existing.length > 0) {
    throw new Error('A category with this name already exists');
  }

  const { data, error } = await supabase
    .from('categories')
    .insert([{ name: cleanName }])
    .select()
    .single();
  
  if (error) throw error;
  return { data };
};

export const updateCategory = async (id, categoryData) => {
  const cleanName = categoryData.name.trim();

  // Check for duplicate category name excluding current
  const { data: existing, error: checkError } = await supabase
    .from('categories')
    .select('id')
    .ilike('name', cleanName)
    .neq('id', id)
    .limit(1);

  if (checkError) console.warn('Duplicate category check warning:', checkError);
  if (existing && existing.length > 0) {
    throw new Error('A category with this name already exists');
  }

  const { data, error } = await supabase
    .from('categories')
    .update({ name: cleanName })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return { data };
};

export const deleteCategory = async (id) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { data: { message: 'Category deleted successfully' } };
};
