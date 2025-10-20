import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = "https://niimlkryykqsoizzgcff.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5paW1sa3J5eWtxc29penpnY2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDk3MjgsImV4cCI6MjA3NjI4NTcyOH0.dy3GbMGL9XA--7ovPwwJDqNgHUqCKLuA7T9APMcqs7g";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function verificarUsuario() {
  const { data: { user } } = await supabase.auth.getUser();
  const authArea = document.getElementById("authArea");

  if (user) {
    const nome = user.user_metadata?.nome || user.email;
    authArea.innerHTML = `
      <p>Bem-vindo, <strong>${nome}</strong>!</p>
      <button id="logout">Sair</button>
    `;
    document.getElementById("logout").addEventListener("click", async () => {
      await supabase.auth.signOut();
      location.reload();
    });
  } else {
    authArea.innerHTML = `
      <button onclick="window.location.href='cadastro.html'">Login</button>
      <button onclick="window.location.href='cadastro.html'">Cadastrar</button>
    `;
  }
}

verificarUsuario();
