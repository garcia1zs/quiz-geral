import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = "https://niimlkryykqsoizzgcff.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5paW1sa3J5eWtxc29penpnY2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDk3MjgsImV4cCI6MjA3NjI4NTcyOH0.dy3GbMGL9XA--7ovPwwJDqNgHUqCKLuA7T9APMcqs7g";

const db = createClient(SUPABASE_URL, SUPABASE_KEY);

const container = document.getElementById("quizzes-usuarios");

async function carregarQuizzes() {
    const { data, error } = await db.from("quizzes").select("*").order("id", { ascending: false });
    if (error) {
        console.error(error);
        container.innerHTML = "<p>Erro ao carregar quizzes.</p>";
        return;
    }

    data.forEach(quiz => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h2>${quiz.title}</h2>
            <p>Categoria: ${quiz.category}</p>
            <button onclick="abrirQuiz(${quiz.id})">Iniciar</button>
        `;
        container.appendChild(card);
    });
}

window.abrirQuiz = (id) => {
    window.location.href = `quiz.html?id=${id}`;
}

carregarQuizzes();

