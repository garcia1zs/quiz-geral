import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = "https://niimlkryykqsoizzgcff.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5paW1sa3J5eWtxc29penpnY2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDk3MjgsImV4cCI6MjA3NjI4NTcyOH0.dy3GbMGL9XA--7ovPwwJDqNgHUqCKLuA7T9APMcqs7g";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const status = document.getElementById("status");
const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("signup").addEventListener("click", async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  });
  status.textContent = error ? "Erro ao cadastrar." : "Cadastro realizado! Verifique seu email.";
});

document.getElementById("login").addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });
  if (error) {
    status.textContent = "Login inválido.";
  } else {
    status.textContent = "Login realizado!";
    setTimeout(() => (window.location.href = "../tela principal/index.html"), 1000);
  }
});
