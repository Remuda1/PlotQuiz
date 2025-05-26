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

const quizForm = document.getElementById('vertigo-quiz-form');
const finalMessage = document.querySelector('.final-message');

function renderQuiz() {
    quizData.forEach((q, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('question-block');
        questionBlock.setAttribute('data-question-index', index);

        const questionText = document.createElement('h2');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionBlock.appendChild(questionText);

        const optionsGroup = document.createElement('div');
        optionsGroup.classList.add('options-group');

        const optionLabels = {
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            e: 'E'
        };

        for (const key in q.options) {
            if (q.options.hasOwnProperty(key)) {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question-${index}`;
                input.value = key.toUpperCase();

                const span = document.createElement('span');
                span.textContent = `${optionLabels[key]}. ${q.options[key]}`;

                label.appendChild(input);
                label.appendChild(span);
                optionsGroup.appendChild(label);

                // Add event listener to reveal explanation on selection
                input.addEventListener('change', () => revealExplanation(index, input.value));
            }
        }
        questionBlock.appendChild(optionsGroup);

        const explanationDiv = document.createElement('div');
        explanationDiv.classList.add('explanation');
        explanationDiv.textContent = q.explanation;
        questionBlock.appendChild(explanationDiv);

        quizForm.appendChild(questionBlock);
    });
}

function revealExplanation(questionIndex, selectedOptionValue) {
    const questionBlock = document.querySelector(`.question-block[data-question-index="${questionIndex}"]`);
    const explanationDiv = questionBlock.querySelector('.explanation');
    const radioButtons = questionBlock.querySelectorAll('input[type="radio"]');

    // Show the explanation
    explanationDiv.style.display = 'block';

    // Disable all radio buttons for this question once an answer is selected
    radioButtons.forEach(radio => {
        radio.disabled = true;
        const parentLabel = radio.parentElement;

        // Apply correct/incorrect classes to the parent label
        if (radio.value === quizData[questionIndex].answer) {
            parentLabel.classList.add('correct');
        } else if (radio.value === selectedOptionValue) {
            parentLabel.classList.add('incorrect');
        }
    });

    // --- REMOVED AUTO-SCROLL LOGIC HERE ---
    // if (questionIndex < quizData.length - 1) {
    //     const nextQuestionBlock = document.querySelector(`.question-block[data-question-index="${questionIndex + 1}"]`);
    //     if (nextQuestionBlock) {
    //         nextQuestionBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //     }
    // } else {
    //     // If it's the last question, show the final message
    //     finalMessage.style.display = 'block';
    // }

    // Always show the final message if it's the last question, regardless of scroll
    if (questionIndex === quizData.length - 1) {
        finalMessage.style.display = 'block';
    }
}

// Render the quiz when the page loads
document.addEventListener('DOMContentLoaded', renderQuiz);
