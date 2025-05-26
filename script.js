const quizData = [
    {
        movie: "Vertigo",
        question: "Why does John 'Scottie' Ferguson retire from detective work?",
        options: {
            a: "He was injured in a car accident.",
            b: "He developed acrophobia and vertigo after a rooftop chase.",
            c: "He was fired for misconduct.",
            d: "He decided to pursue a different career.",
            e: "He wanted to travel the world."
        },
        answer: "B",
        explanation: "Scottie retired because he developed acrophobia and vertigo following a traumatic rooftop chase."
    },
    {
        movie: "Vertigo",
        question: "Who hires Scottie to follow Madeleine?",
        options: {
            a: "His ex-fiancée, Midge.",
            b: "A mysterious stranger.",
            c: "His old college acquaintance, Gavin Elster.",
            d: "Madeleine herself.",
            e: "The local police department."
        },
        answer: "C",
        explanation: "Gavin Elster, an old college acquaintance, hires Scottie to follow his wife, Madeleine."
    },
    {
        movie: "Vertigo",
        question: "What is the supposed reason for Madeleine's strange behavior?",
        options: {
            a: "She has a mental illness.",
            b: "She is possessed by the spirit of her great-grandmother, Carlotta Valdes.",
            c: "She is having an affair.",
            d: "She is planning a surprise for Gavin.",
            e: "She is suffering from amnesia."
        },
        answer: "B",
        explanation: "Gavin believes Madeleine is possessed by the spirit of her great-grandmother, Carlotta Valdes."
    },
    {
        movie: "Vertigo",
        question: "What significant event occurs at the San Francisco Bay?",
        options: {
            a: "Scottie proposes to Madeleine.",
            b: "Madeleine jumps into the bay and Scottie saves her.",
            c: "A boat accident endangers both Scottie and Madeleine.",
            d: "Scottie confesses his love to Madeleine.",
            e: "Gavin reveals his true intentions to Scottie."
        },
        answer: "B",
        explanation: "Madeleine jumps into the San Francisco Bay, and Scottie saves her, marking a pivotal moment in their relationship."
    },
    {
        movie: "Vertigo",
        question: "What prevents Scottie from saving Madeleine at the bell tower?",
        options: {
            a: "He is physically restrained.",
            b: "His acrophobia prevents him from reaching her.",
            c: "He arrives too late.",
            d: "Madeleine refuses his help.",
            e: "He is distracted by a phone call."
        },
        answer: "B",
        explanation: "Scottie's acrophobia prevents him from reaching Madeleine in time to save her."
    },
    {
        movie: "Vertigo",
        question: "What happens to Scottie after Madeleine's death?",
        options: {
            a: "He moves to another city.",
            b: "He continues his detective work.",
            c: "He suffers a mental breakdown and is institutionalized.",
            d: "He starts a new relationship immediately.",
            e: "He leaves San Francisco for a brief vacation."
        },
        answer: "C",
        explanation: "Scottie suffers a mental breakdown and is institutionalized after Madeleine's death."
    },
    {
        movie: "Vertigo",
        question: "Who does Scottie encounter after his release from the sanatorium?",
        options: {
            a: "A detective investigating Madeleine's death.",
            b: "His ex-fiancée, Midge.",
            c: "Judy Barton, a woman resembling Madeleine.",
            d: "Gavin Elster, who explains everything.",
            e: "A journalist writing about the case."
        },
        answer: "C",
        explanation: "Scottie encounters Judy Barton, who bears a strong resemblance to Madeleine."
    },
    {
        movie: "Vertigo",
        question: "What is Judy's involvement in Gavin's plan?",
        options: {
            a: "She is unaware of any plan.",
            b: "She is Gavin's secret accomplice in the murder.",
            c: "She is being blackmailed by Gavin.",
            d: "She is an innocent bystander.",
            e: "She is trying to protect Scottie."
        },
        answer: "B",
        explanation: "Judy was complicit in Gavin's plan to murder his wife and frame Scottie."
    },
    {
        movie: "Vertigo",
        question: "How does Scottie discover Judy's involvement?",
        options: {
            a: "Judy confesses to him directly.",
            b: "He finds a letter written by Judy confessing her involvement.",
            c: "Gavin tells him the truth.",
            d: "Midge uncovers the truth and informs him.",
            e: "He overhears a conversation between Judy and Gavin."
        },
        answer: "B",
        explanation: "Scottie discovers Judy's involvement through a letter she wrote confessing her role."
    },
    {
        movie: "Vertigo",
        question: "What event ultimately cures Scottie of his acrophobia?",
        options: {
            a: "A second rooftop chase.",
            b: "The death of Judy at the bell tower.",
            c: "Therapy sessions with Midge.",
            d: "A confrontation with Gavin.",
            e: "A near-death experience in a car accident."
        },
        answer: "B",
        explanation: "Scottie is cured of his acrophobia after Judy falls to her death from the bell tower."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const questionContainer = document.getElementById('question-container');
const resultsContainer = document.getElementById('results-container');
const scoreSpan = document.getElementById('score');
const totalQuestionsSpan = document.getElementById('total-questions');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
    selectedOption = null;
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback'; // Reset classes

    const currentQuiz = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuiz.question;
    optionsContainer.innerHTML = ''; // Clear previous options

    // Map option keys to display letters
    const optionLabels = {
        a: 'A',
        b: 'B',
        c: 'C',
        d: 'D',
        e: 'E'
    };

    for (const key in currentQuiz.options) {
        if (currentQuiz.options.hasOwnProperty(key)) {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.dataset.option = key.toUpperCase(); // Store A, B, C etc.
            optionDiv.textContent = `${optionLabels[key]}. ${currentQuiz.options[key]}`;
            optionDiv.addEventListener('click', () => selectOption(optionDiv));
            optionsContainer.appendChild(optionDiv);
        }
    }
    submitBtn.textContent = 'Submit Answer';
    submitBtn.disabled = false;
}

function selectOption(optionDiv) {
    // Remove 'selected' class from previously selected option
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }
    selectedOption = optionDiv;
    selectedOption.classList.add('selected');
}

function checkAnswer() {
    if (!selectedOption) {
        feedbackEl.textContent = 'Please select an answer!';
        feedbackEl.classList.add('incorrect-text'); // Use a generic warning color
        return;
    }

    submitBtn.disabled = true; // Prevent multiple submissions for the same question

    const userAnswer = selectedOption.dataset.option;
    const correctAnswer = quizData[currentQuestionIndex].answer;
    const explanation = quizData[currentQuestionIndex].explanation;

    // Apply styling based on correctness
    const allOptions = optionsContainer.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.removeEventListener('click', () => selectOption(option)); // Disable clicking after submission
        if (option.dataset.option === correctAnswer) {
            option.classList.add('correct');
        } else if (option.dataset.option === userAnswer) {
            option.classList.add('incorrect');
        }
    });

    if (userAnswer === correctAnswer) {
        score++;
        feedbackEl.textContent = `Correct! ${explanation}`;
        feedbackEl.classList.add('correct-text');
    } else {
        feedbackEl.textContent = `Incorrect. The correct answer was ${correctAnswer}. ${explanation}`;
        feedbackEl.classList.add('incorrect-text');
    }

    // Change button text to "Next Question" or "View Results"
    if (currentQuestionIndex < quizData.length - 1) {
        submitBtn.textContent = 'Next Question';
        submitBtn.onclick = nextQuestion;
    } else {
        submitBtn.textContent = 'View Results';
        submitBtn.onclick = showResults;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        submitBtn.onclick = checkAnswer; // Revert button click to checkAnswer
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    scoreSpan.textContent = score;
    totalQuestionsSpan.textContent = quizData.length;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    resultsContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    loadQuestion();
    submitBtn.onclick = checkAnswer;
}

// Initial load
loadQuestion();
submitBtn.addEventListener('click', checkAnswer);
restartBtn.addEventListener('click', restartQuiz);
