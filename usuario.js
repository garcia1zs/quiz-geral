import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = "https://niimlkryykqsoizzgcff.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5paW1sa3J5eWtxc29penpnY2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDk3MjgsImV4cCI6MjA3NjI4NTcyOH0.dy3GbMGL9XA--7ovPwwJDqNgHUqCKLuA7T9APMcqs7g";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function mostrarUsuario() {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const nome = user.user_metadata?.nome || "Usuário";
    document.getElementById("nomeUsuario").textContent = nome;
  } else {
    window.location.href = "cadastro.html"; // redireciona se não estiver logado
  }
}

mostrarUsuario();

// logout
document.getElementById("logout").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "cadastro.html";
});
