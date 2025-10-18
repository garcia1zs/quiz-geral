import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = "https://niimlkryykqsoizzgcff.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5paW1sa3J5eWtxc29penpnY2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDk3MjgsImV4cCI6MjA3NjI4NTcyOH0.dy3GbMGL9XA--7ovPwwJDqNgHUqCKLuA7T9APMcqs7g";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const title = document.getElementById("title");
const category = document.getElementById("category");
const questionsInput = document.getElementById("questions");
const status = document.getElementById("status");

document.getElementById("save").addEventListener("click", async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      status.textContent = "Você precisa estar logado para criar um quiz.";
      return;
    }

    const questions = JSON.parse(questionsInput.value);

    const { error } = await supabase
      .from("quizzes")
      .insert([{ 
        title: title.value, 
        category: category.value, 
        questions, 
        user_id: user.id 
      }]);

    if (error) throw error;

    status.textContent = "Quiz salvo com sucesso!";
    title.value = "";
    category.value = "";
    questionsInput.value = "";
  } catch (err) {
    console.error(err);
    status.textContent = "Erro ao salvar quiz.";
  }
});
