// src/supabase.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Remplacez par vos propres informations Supabase
const SUPABASE_URL = 'https://zqvjcabvsloxptfzhxgz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxdmpjYWJ2c2xveHB0ZnpoeGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NTU4OTYsImV4cCI6MjA1MzAzMTg5Nn0.fwfJLSBfuKX4A4g5Kh_7btMjHQpYEq6Q-6FwSjqrrV8';

// Créer une instance Supabase avec TypeScript
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
