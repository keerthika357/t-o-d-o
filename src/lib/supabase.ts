
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wmifbdhtjqkwgukxikhu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtaWZiZGh0anFrd2d1a3hpa2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MTQ5MTYsImV4cCI6MjA2Njk5MDkxNn0.8FvOsxOfr5TyYGvHE0pJxF0iVFGTKpWfcyDHjMHW9uw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
