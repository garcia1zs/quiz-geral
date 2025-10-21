// ranking.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// 🔗 Conexão com o seu projeto Supabase
const supabaseUrl = "https://niimlkryykqsoizzgcff.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5paW1sa3J5eWtxc29penpnY2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDk3MjgsImV4cCI6MjA3NjI4NTcyOH0.dy3GbMGL9XA--7ovPwwJDqNgHUqCKLuA7T9APMcqs7g";
const supabase = createClient(supabaseUrl, supabaseKey);

async function carregarRanking() {
  const tabela = document.querySelector("#ranking tbody");
  tabela.innerHTML = "<tr><td colspan='5'>Carregando...</td></tr>";

  const { data: resultados, error } = await supabase
    .from("resultados")
    .select("*")
    .order("acertos", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Erro ao buscar resultados:", error);
    tabela.innerHTML = "<tr><td colspan='5'>Erro ao carregar ranking.</td></tr>";
    return;
  }

  tabela.innerHTML = "";

  for (let i = 0; i < resultados.length; i++) {
    const r = resultados[i];

    // Busca o título do quiz
    const { data: quiz } = await supabase
      .from("quizzes")
      .select("title")
      .eq("id", r.quiz_id)
      .single();

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${i + 1}º</td>
      <td>${r.usuario_id ? r.usuario_id.slice(0, 8) + "..." : "Anônimo"}</td>
      <td>${r.acertos}/${r.total_perguntas}</td>
      <td>${quiz?.title || "-"}</td>
      <td>${new Date(r.data_jogo).toLocaleDateString("pt-BR")}</td>
    `;

    tabela.appendChild(linha);
  }

  if (resultados.length === 0) {
    tabela.innerHTML = "<tr><td colspan='5'>Nenhum resultado encontrado.</td></tr>";
  }
}

// 🔥 Executa quando a página carregar
carregarRanking();
