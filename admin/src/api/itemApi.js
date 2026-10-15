import { supabase } from '../lib/supabase';
import { STORAGE_BUCKET } from '../constants';

/**
 * Upload an image file to Supabase Storage bucket
 * @param {File} file - File from input[type=file]
 * @returns {Promise<string>} Public URL of the uploaded image
 */
export const uploadItemImage = async (file) => {
  if (!file) throw new Error('No file provided');

  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .substring(0, 20);
  const fileName = `${Date.now()}_${cleanName}.${fileExt}`;
  const filePath = `items/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type || 'image/jpeg'
    });

  if (uploadError) {
    console.error('Supabase storage upload error:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

/**
 * Delete an image from Supabase Storage by its public URL
 * @param {string} imageUrl
 */
export const deleteItemImage = async (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== 'string') return;
  const bucketMarker = `/${STORAGE_BUCKET}/`;
  if (!imageUrl.includes(bucketMarker)) return;

  try {
    const filePath = imageUrl.split(bucketMarker)[1];
    if (filePath) {
      await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);
    }
  } catch (err) {
    console.warn('Could not remove old image from storage:', err);
  }
};

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
  const cleanName = itemData.name.trim();

  // Check for duplicate item name (case-insensitive)
  const { data: existing, error: checkError } = await supabase
    .from('menu_items')
    .select('id')
    .ilike('name', cleanName)
    .limit(1);

  if (checkError) console.warn('Duplicate check warning:', checkError);
  if (existing && existing.length > 0) {
    throw new Error('An item with this name already exists');
  }

  const { data, error } = await supabase
    .from('menu_items')
    .insert([{
      category_id: itemData.category_id,
      name: cleanName,
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
  if (itemData.name) {
    const cleanName = itemData.name.trim();
    // Check for duplicate item name excluding current item
    const { data: existing, error: checkError } = await supabase
      .from('menu_items')
      .select('id')
      .ilike('name', cleanName)
      .neq('id', id)
      .limit(1);

    if (checkError) console.warn('Duplicate check warning:', checkError);
    if (existing && existing.length > 0) {
      throw new Error('An item with this name already exists');
    }
  }

  const updateData = {
    ...(itemData.category_id !== undefined && { category_id: itemData.category_id }),
    ...(itemData.name !== undefined && { name: itemData.name.trim() }),
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

export const deleteItem = async (id, imageUrl = null) => {
  if (imageUrl) {
    await deleteItemImage(imageUrl);
  }

  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { data: { message: 'Item deleted' } };
};
