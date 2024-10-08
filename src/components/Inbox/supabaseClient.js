// supabaseClient.js
import { GoTrueClient } from '@supabase/gotrue-js';

const supabaseUrl = 'supaurl';
const supabaseKey = 'your-supabase-key';
const supabase = new GoTrueClient({ url: supabaseUrl, headers: { apikey: supabaseKey } });

export default supabase;