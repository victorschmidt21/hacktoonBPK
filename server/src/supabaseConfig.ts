import { createClient } from '@supabase/supabase-js';
import {SUPABASEURL, SUPABASEKEY,} from './config'

const supabaseUrl = SUPABASEURL!;
const supabaseKey = SUPABASEKEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};