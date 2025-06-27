let perguntaAtual = 0;
let perguntas = [
  {
    pergunta: "Qual a principal atividade no campo?",
    opcoes: ["Agricultura", "Tecnologia", "Turismo", "Educação"],
    respostaCorreta: 0
  },
  {
    pergunta: "Qual é o principal meio de transporte nas cidades grandes?",
    opcoes: ["Carro", "Cavalo", "Ônibus", "Avião"],
    respostaCorreta: 2
  },
  {
    pergunta: "O que conecta o campo e a cidade culturalmente?",
    opcoes: ["Culinária", "Arquitetura", "Tecnologia", "Esportes"],
    respostaCorreta: 0
  },
  {
    pergunta: "Qual o som típico do campo?",
    opcoes: ["Barulho de carros", "Cantoria de pássaros", "Trânsito", "Cachoeiras"],
    respostaCorreta: 1
  }
];

let pontuacao = 0;

function setup() {
  // Não será necessário o canvas do p5.js, já que estamos utilizando HTML para a estrutura
  noCanvas();

  // Atualiza as informações da pergunta inicial
  updateQuestion();
  
  // Adiciona os listeners aos botões de resposta
  let buttons = document.querySelectorAll('.option');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      let id = button.getAttribute('data-id');
      verificarResposta(id);
    });
  });
}

function updateQuestion() {
  // Atualiza a pergunta e opções na tela
  let pergunta = perguntas[perguntaAtual];
  document.getElementById('question').innerText = pergunta.pergunta;
  let options = document.querySelectorAll('.option');
  
  options.forEach((option, index) => {
    option.innerText = pergunta.opcoes[index];
    option.disabled = false;
    option.style.backgroundColor = '#4CAF50'; // Resetando a cor de fundo
  });
  
  // Esconde o feedback
  document.getElementById('feedback').style.display = 'none';
}

function verificarResposta(opcaoEscolhida) {
  let pergunta = perguntas[perguntaAtual];
  let buttons = document.querySelectorAll('.option');

  // Desabilita os botões após a resposta
  buttons.forEach(button => button.disabled = true);
  
  if (opcaoEscolhida == pergunta.respostaCorreta) {
    pontuacao++;
    document.getElementById('feedback').innerText = "Resposta correta!";
    document.getElementById('feedback').className = "feedback correct";
  } else {
    document.getElementById('feedback').innerText = "Resposta incorreta!";
    document.getElementById('feedback').className = "feedback incorrect";
  }
  
  document.getElementById('feedback').style.display = 'block';
  document.getElementById('score').innerText = "Pontuação: " + pontuacao;
  
  // Avança para a próxima pergunta
  perguntaAtual++;
  
  // Verifica se o quiz acabou
  if (perguntaAtual < perguntas.length) {
    setTimeout(updateQuestion, 1500); // Atualiza a pergunta após 1.5 segundos
  } else {
    setTimeout(mostrarResultado, 1500); // Mostra o resultado final após 1.5 segundos
  }
}

function mostrarResultado() {
  let feedback = "Quiz Finalizado! Sua pontuação é " + pontuacao + " de " + perguntas.length;
  document.getElementById('question').innerText = feedback;
  document.getElementById('feedback').style.display = 'none';
  document.getElementById('score').style.display = 'none';
  document.querySelectorAll('.option').forEach(option => option.style.display = 'none');
}