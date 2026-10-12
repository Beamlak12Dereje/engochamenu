import { supabase } from '../lib/supabase';

export const getItems = async () => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('name');
  
  if (error) throw error;
  
  // Convert database fields to frontend format
  const convertedData = data.map(item => ({
    ...item,
    price_ethiopian: item.price_local,
    price_foreigner: item.price_foreign
  }));
  
  return { data: convertedData };
};

export const createItem = async (itemData) => {
  const { data, error } = await supabase
    .from('menu_items')
    .insert([{
      category_id: itemData.category_id,
      name: itemData.name,
      description: itemData.description || '',
      price_local: itemData.price_ethiopian,
      price_foreign: itemData.price_foreigner,
      image_url: itemData.image_url || null,
      is_popular: itemData.is_popular || false,
      is_spicy: itemData.is_spicy || false
    }])
    .select()
    .single();
  
  if (error) throw error;
  
  // Convert back to frontend format
  return { 
    data: {
      ...data,
      price_ethiopian: data.price_local,
      price_foreigner: data.price_foreign
    }
  };
};

export const updateItem = async (id, itemData) => {
  const updateData = {
    ...(itemData.category_id !== undefined && { category_id: itemData.category_id }),
    ...(itemData.name !== undefined && { name: itemData.name }),
    ...(itemData.description !== undefined && { description: itemData.description }),
    ...(itemData.price_ethiopian !== undefined && { price_local: itemData.price_ethiopian }),
    ...(itemData.price_foreigner !== undefined && { price_foreign: itemData.price_foreigner }),
    ...(itemData.image_url !== undefined && { image_url: itemData.image_url }),
    ...(itemData.is_popular !== undefined && { is_popular: itemData.is_popular }),
    ...(itemData.is_spicy !== undefined && { is_spicy: itemData.is_spicy })
  };

  const { data, error } = await supabase
    .from('menu_items')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  
  // Convert back to frontend format
  return { 
    data: {
      ...data,
      price_ethiopian: data.price_local,
      price_foreigner: data.price_foreign
    }
  };
};

export const deleteItem = async (id) => {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { data: { message: 'Item deleted' } };
};
