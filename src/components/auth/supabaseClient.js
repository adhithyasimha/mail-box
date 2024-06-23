import { createClient } from '@supabase/supabase-js';

export function createSupabaseClient(supabaseUrl, supabaseKey) {
  return createClient(supabaseUrl, supabaseKey);
}