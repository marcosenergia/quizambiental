// ======================================
// DADOS DO QUIZ - PERGUNTAS E RESPOSTAS (TEMA AMBIENTAL - RH)
// ======================================

const quizData = [
    {
        question: "O que é o SGA (Sistema de Gestão Ambiental) baseado na norma ISO 14001 que seguimos na empresa?",
        options: [
            "É o nosso compromisso formal de melhorar continuamente o desempenho ambiental e prevenir a poluição nas nossas atividades.",
            "É uma regra rigorosa que proíbe o uso de qualquer tipo de papel na empresa sob pena de advertência.",
            "É um grupo secreto de abraçadores de árvores que se reúne na sala do RH toda sexta-feira."
        ],
        correctAnswer: 0,
        feedback: {
            correct: "Exatamente! O SGA visa a melhoria contínua e a prevenção. É sobre integrar a consciência ambiental na nossa rotina real.",
            incorrect: "Ops! Não é bem isso. O foco da ISO 14001 não é proibir tudo de forma extrema, mas sim buscar a melhoria contínua e prevenir impactos."
        }
    },
    {
        question: "Pensando nas boas práticas no nosso setor administrativo, qual a atitude correta sobre o consumo de energia?",
        options: [
            "Deixar o computador suspenso, mas manter o ar-condicionado ligado na hora do almoço para a sala não ficar abafada.",
            "Usar telepatia para apagar as luzes quando o expediente acabar.",
            "Desligar os monitores ao sair da mesa e, se for o último a sair do setor, apagar luzes e desligar o ar-condicionado."
        ],
        correctAnswer: 2,
        feedback: {
            correct: "Perfeito! Cada um fazendo a sua parte, reduzimos significativamente nosso consumo de energia e batemos as metas do SGA.",
            incorrect: "Cuidado com o desperdício! Equipamentos ligados sem necessidade impactam muito nosso consumo. O correto é sempre desligar tudo ao ser o último a sair."
        }
    },
    {
        question: "Você está com uma embalagem plástica de um lanche na mão. Onde e como devemos descartar corretamente?",
        options: [
            "Na lixeira vermelha (Plástico), garantindo que a embalagem esteja sem excesso de restos de comida.",
            "Na lixeira cinza/preta (Não Reciclável/Orgânico), já que a embalagem teve contato com comida e não serve mais.",
            "Esconder na gaveta do colega ao lado quando ele for buscar um café."
        ],
        correctAnswer: 0,
        feedback: {
            correct: "Boa! Plástico é na lixeira vermelha. Tirar o excesso de alimento ajuda a não contaminar o material, facilitando a reciclagem.",
            incorrect: "Atenção às cores! Plástico sempre vai na vermelha. Jogar no orgânico/não reciclável prejudica a separação dos resíduos."
        }
    },
    {
        question: "Precisamos emitir um contrato ou documento longo para o setor. Qual a prática que mais ajuda o meio ambiente?",
        options: [
            "Imprimir apenas a frente, para deixar o verso em branco e podermos cortar para usar como papel de rascunho no futuro.",
            "Priorizar a assinatura digital; mas se a impressão for obrigatória, imprimir sempre em frente e verso.",
            "Imprimir 5 cópias por garantia e fazer alguns origamis para decoração com as folhas que sobrarem."
        ],
        correctAnswer: 1,
        feedback: {
            correct: "Muito bem! Reduzir na fonte (usando meios digitais) é o melhor caminho. Se precisar mesmo imprimir, otimize usando os dois lados da folha.",
            incorrect: "Reveja essa ideia! Deixar o verso em branco para rascunho gera um consumo imediato dobrado de folhas, e imprimir cópias extras gera muito desperdício."
        }
    },
    {
        question: "Durante a auditoria, o auditor para na sua mesa e pede para você falar sobre a nossa Política Ambiental. O que você faz?",
        options: [
            "Tenta recitar a Política decorada, palavra por palavra, porque o auditor exige memorização exata do texto.",
            "Finge um desmaio estratégico ou tenta se esconder debaixo da mesa.",
            "Mantém a calma, explica com suas próprias palavras como você cuida do meio ambiente no seu dia a dia e mostra onde a Política está disponível para consulta."
        ],
        correctAnswer: 2,
        feedback: {
            correct: "Isso aí! O auditor não quer ver ninguém recitando texto decorado. Ele quer ver se a política é vivida de verdade por nós e se sabemos onde acessá-la.",
            incorrect: "Calma! Não precisa decorar nada nem se esconder. O importante é entender o conceito, aplicar na sua rotina e saber onde o documento se encontra."
        }
    }
];

// ======================================
// VARIÁVEIS GLOBAIS
// ======================================

let currentQuestionIndex = 0;
let score = 0;
let userName = '';
let selectedAnswer = null;

// ======================================
// ELEMENTOS DO DOM
// ======================================

const welcomeScreen = document.getElementById('welcomeScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');

const userNameInput = document.getElementById('userName');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const themeToggle = document.getElementById('themeToggle');

const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const questionTitle = document.getElementById('questionTitle');
const optionsContainer = document.getElementById('optionsContainer');
const feedback = document.getElementById('feedback');
const feedbackIcon = document.getElementById('feedbackIcon');
const feedbackText = document.getElementById('feedbackText');

const finalUserName = document.getElementById('finalUserName');
const finalScore = document.getElementById('finalScore');
const correctCount = document.getElementById('correctCount');
const incorrectCount = document.getElementById('incorrectCount');
const percentageScore = document.getElementById('percentageScore');
const performanceMessage = document.getElementById('performanceMessage');

// ======================================
// FUNÇÕES DE NAVEGAÇÃO
// ======================================

function showScreen(screen) {
    welcomeScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    
    screen.classList.remove('hidden');
}

function startQuiz() {
    userName = userNameInput.value.trim();
    
    if (!userName) {
        alert('Por favor, digite seu nome para começar! 😊');
        userNameInput.focus();
        return;
    }
    
    // Resetar variáveis
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    
    // Mostrar tela do quiz
    showScreen(quizScreen);
    loadQuestion();
}

function loadQuestion() {
    // Resetar estado
    selectedAnswer = null;
    feedback.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    // Atualizar barra de progresso
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = progress + '%';
    progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    
    // Carregar pergunta atual
    const currentQuestion = quizData[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    
    // Renderizar opções
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `<span>${option}</span>`;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(answerIndex) {
    // Prevenir múltiplas seleções
    if (selectedAnswer !== null) return;
    
    selectedAnswer = answerIndex;
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    // Atualizar pontuação
    if (isCorrect) {
        score++;
    }
    
    // Destacar respostas
    const optionButtons = optionsContainer.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.classList.add('disabled');
        
        if (index === currentQuestion.correctAnswer) {
            btn.classList.add('correct');
        } else if (index === answerIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Mostrar feedback
    showFeedback(isCorrect, currentQuestion.feedback);
    
    // Mostrar botão de próxima
    nextBtn.classList.remove('hidden');
}

function showFeedback(isCorrect, feedbackMessages) {
    feedback.classList.remove('hidden', 'correct', 'incorrect');
    
    if (isCorrect) {
        feedback.classList.add('correct');
        feedbackIcon.textContent = '✅';
        feedbackText.textContent = feedbackMessages.correct;
    } else {
        feedback.classList.add('incorrect');
        feedbackIcon.textContent = '❌';
        feedbackText.textContent = feedbackMessages.incorrect;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showScreen(resultsScreen);
    
    // Preencher dados
    finalUserName.textContent = userName;
    finalScore.textContent = score;
    correctCount.textContent = score;
    incorrectCount.textContent = quizData.length - score;
    
    const percentage = Math.round((score / quizData.length) * 100);
    percentageScore.textContent = percentage + '%';
    
    // Mensagem de desempenho
    let message = '';
    
    if (percentage >= 80) {
        message = `
            <h3>🌟 Especialista em Meio Ambiente!</h3>
            <p>Seu conhecimento sobre o SGA e nossas práticas sustentáveis está excelente! Você está preparadíssimo para a auditoria e para dar o exemplo no RH.</p>
        `;
    } else if (percentage >= 60) {
        message = `
            <h3>👍 Bom trabalho!</h3>
            <p>Você tem uma boa base ambiental. Revise alguns conceitos simples do nosso dia a dia e nossa pegada ecológica ficará ainda melhor!</p>
        `;
    } else {
        message = `
            <h3>📚 Ainda dá tempo!</h3>
            <p>Aproveite este quiz para aprender as boas práticas. Dê uma lida rápida nas pílulas de conhecimento do SGA antes da auditoria e você tirará de letra!</p>
        `;
    }
    
    performanceMessage.innerHTML = message;
}

function restartQuiz() {
    userNameInput.value = '';
    showScreen(welcomeScreen);
    userNameInput.focus();
}

// ======================================
// TEMA CLARO/ESCURO
// ======================================

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }
}

// ======================================
// EVENT LISTENERS
// ======================================

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
themeToggle.addEventListener('click', toggleTheme);

// Permitir Enter no campo de nome
userNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startQuiz();
    }
});

// ======================================
// INICIALIZAÇÃO
// ======================================

window.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    userNameInput.focus();
});

// ======================================
// COMPATIBILIDADE COM TEAMS/SHAREPOINT
// ======================================

// Detectar se está rodando no Teams
if (window.parent !== window) {
    // Aplicação está em iframe (Teams)
    console.log('Aplicação rodando no Microsoft Teams');
}

// Prevenir zoom indesejado no iOS
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });