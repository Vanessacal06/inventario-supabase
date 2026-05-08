// URL DEL PROYECTO
const SUPABASE_URL = "https://qskxdqjvmgcvfhcewhgg.supabase.co";

// API KEY PUBLICA
const SUPABASE_ANON_KEY = "sb_publishable_2Ff80zbf61TsweEfIjPVug_cAPsK9R5";

// CONEXION
const clienteSupabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// GLOBAL
window.clienteSupabase = clienteSupabase;