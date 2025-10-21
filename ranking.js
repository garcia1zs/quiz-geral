import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const supabase = createClient("https://niimlkryykqsoizzgcff.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5paW1sa3J5eWtxc29penpnY2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDk3MjgsImV4cCI6MjA3NjI4NTcyOH0.dy3GbMGL9XA--7ovPwwJDqNgHUqCKLuA7T9APMcqs7g");

async function carregarRanking() {
  const tabela = document.querySelector("#ranking tbody");

  const { data, error } = await supabase
    .from("resultados")
    .select(`
      acertos,
      total_perguntas,
      data_jogo,
      usuario_id,
      quizzes (titulo)
    `)
    .order("acertos", { ascending: false })
    .limit(10);

  if (error) {
    console.error(error);
    tabela.innerHTML = "<tr><td colspan='5'>Erro ao carregar ranking.</td></tr>";
    return;
  }

  for (let i = 0; i < data.length; i++) {
    const r = data[i];
    const posicao = i + 1;

    // Busca o e-mail ou nome do jogador
    const jogador = userData?.user?.email || "Usuário";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${posicao}</td>
      <td>${jogador}</td>
      <td>${r.acertos}/${r.total_perguntas}</td>
      <td>${r.quizzes?.titulo || "-"}</td>
      <td>${new Date(r.data_jogo).toLocaleDateString()}</td>
    `;
    tabela.appendChild(row);
  }
}

carregarRanking();
