// Global variables
let allQuizData = []; // Stores all quiz questions after parsing
let allPlotData = []; // Stores all movie plots after parsing
let availableMovies = []; // Unique movie titles
let currentQuizData = []; // Questions for the currently selected movie

// DOM elements
const movieListComponent = document.getElementById('movie-list');
const movieSelectionContainer = document.querySelector('.movie-list-container');
const quizContainer = document.querySelector('.quiz-container');
const quizForm = document.getElementById('movie-quiz-form');
const quizTitleElement = document.getElementById('quiz-title');
const moviePlotElement = document.getElementById('movie-plot'); // New plot element
const finalMessage = document.querySelector('.final-message');
const backToListBtn = document.getElementById('back-to-list-btn');

// --- CSV Loading and Parsing ---
async function loadQuizzesAndPlots() {
    try {
        // Load quizzes.csv
        await new Promise((resolve, reject) => {
            Papa.parse('quizzes.csv', {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    allQuizData = results.data;
                    resolve();
                },
                error: function(err, file) {
                    console.error("Error parsing quizzes.csv:", err, file);
                    reject("Failed to load quiz data.");
                }
            });
        });

        // Load plots.csv
        await new Promise((resolve, reject) => {
            Papa.parse('plots.csv', {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    allPlotData = results.data;
                    resolve();
                },
                error: function(err, file) {
                    console.error("Error parsing plots.csv:", err, file);
                    reject("Failed to load plot data.");
                }
            });
        });

        // After both are loaded, populate the movie list
        populateMovieList();

    } catch (error) {
        alert(error);
    }
}

// --- Movie List Population ---
function populateMovieList() {
    // Extract unique movie titles from quiz data
    availableMovies = [...new Set(allQuizData.map(q => q.movie))];

    movieListComponent.innerHTML = ''; // Clear previous list
    availableMovies.forEach(movieTitle => {
        const listItem = document.createElement('li');
        listItem.textContent = movieTitle;
        listItem.setAttribute('data-movie-title', movieTitle);
        listItem.addEventListener('click', () => selectMovie(movieTitle, listItem));
        movieListComponent.appendChild(listItem);
    });
}

// --- Movie Selection Handler ---
function selectMovie(movieTitle, selectedListItem) {
    // Remove 'selected' class from any previously selected movie
    const previouslySelected = document.querySelector('#movie-list li.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
    // Add 'selected' class to the clicked movie
    selectedListItem.classList.add('selected');

    // Filter questions for the selected movie
    currentQuizData = allQuizData.filter(q => q.movie === movieTitle);
    quizTitleElement.textContent = `${movieTitle} Quiz`;

    // Find and display the movie plot
    const moviePlot = allPlotData.find(p => p.title === movieTitle);
    if (moviePlot && moviePlot.plot) {
        moviePlotElement.textContent = moviePlot.plot;
        moviePlotElement.style.display = 'block'; // Ensure plot is visible
    } else {
        moviePlotElement.textContent = 'Plot not available.';
        moviePlotElement.style.display = 'block';
    }


    // Render the quiz questions
    renderQuiz();

    // Show the quiz, hide the movie list
    movieSelectionContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    finalMessage.style.display = 'none'; // Hide final message when starting a new quiz
    backToListBtn.style.display = 'block'; // Show back button
}

// --- Quiz Rendering ---
function renderQuiz() {
    quizForm.innerHTML = ''; // Clear previous questions
    finalMessage.style.display = 'none'; // Ensure final message is hidden

    currentQuizData.forEach((q, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('question-block');
        questionBlock.setAttribute('data-question-index', index);

        const questionText = document.createElement('h2');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionBlock.appendChild(questionText);

        const optionsGroup = document.createElement('div');
        optionsGroup.classList.add('options-group');

        const optionLabels = { // Map keys to display letters
            'option a': 'A',
            'option b': 'B',
            'option c': 'C',
            'option d': 'D',
            'option e': 'E'
        };

        // Dynamically get options for the current question
        const optionsKeys = ['option a', 'option b', 'option c', 'option d', 'option e'];
        optionsKeys.forEach(key => {
            // Only add option if its value exists and is not empty
            if (q[key] !== undefined && q[key] !== null && q[key].trim() !== '') {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question-${index}`; // Unique name for each question's radio group
                input.value = optionLabels[key]; // Store A, B, C, D, E

                const span = document.createElement('span');
                span.textContent = `${optionLabels[key]}. ${q[key]}`; // Use q[key] for the actual option text

                label.appendChild(input);
                label.appendChild(span);
                optionsGroup.appendChild(label);

                // Add event listener to reveal explanation on selection
                input.addEventListener('change', () => revealExplanation(index, input.value));
            }
        });
        questionBlock.appendChild(optionsGroup);

        const explanationDiv = document.createElement('div');
        explanationDiv.classList.add('explanation');
        explanationDiv.textContent = q.explanation;
        questionBlock.appendChild(explanationDiv);

        quizForm.appendChild(questionBlock);
    });

    // If there are no questions for a movie (e.g., empty filter result)
    if (currentQuizData.length === 0) {
        quizForm.innerHTML = '<p>No questions available for this movie.</p>';
    }
}


// --- Reveal Explanation Logic ---
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

        // Compare selected value with the correct answer from currentQuizData
        if (radio.value === currentQuizData[questionIndex].answer) {
            parentLabel.classList.add('correct');
        } else if (radio.value === selectedOptionValue) {
            parentLabel.classList.add('incorrect');
        }
    });

    // Always show the final message if it's the last question
    if (questionIndex === currentQuizData.length - 1) {
        finalMessage.style.display = 'block';
    }
}

// --- Back to List Button ---
backToListBtn.addEventListener('click', () => {
    quizContainer.style.display = 'none';
    movieSelectionContainer.style.display = 'block';
    finalMessage.style.display = 'none';
    backToListBtn.style.display = 'none';
    moviePlotElement.style.display = 'none'; // Hide plot when going back to list

    // Clear any selected movie in the list
    const previouslySelected = document.querySelector('#movie-list li.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
});


// --- Initial Load ---
document.addEventListener('DOMContentLoaded', loadQuizzesAndPlots);
