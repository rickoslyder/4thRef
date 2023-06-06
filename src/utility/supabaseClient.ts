import { createClient } from "@refinedev/supabase";

// const SUPABASE_URL = "https://iwdfzvfqbtokqetmbmbp.supabase.co";
const SUPABASE_URL = "https://khuewemvnkthcrczense.supabase.co";
const SUPABASE_KEY =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDU2NzAxMCwiZXhwIjoxOTQ2MTQzMDEwfQ._gr6kXGkQBi9BM9dx5vKaNKYj_DJN1xlkarprGpM_fU";
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtodWV3ZW12bmt0aGNyY3plbnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NzEwODAsImV4cCI6MjAwMDQ0NzA4MH0.Ywv5OyN9v6VJeW5d9ZVfsO8giVGox3K0GJ1Joi_CslY";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
