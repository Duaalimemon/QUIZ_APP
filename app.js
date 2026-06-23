const setupScreen = document.getElementById('setup-screen');
const loadingScreen = document.getElementById('loading-screen');
const questionScreen = document.getElementById('question-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress-text');
const scoreTracker = document.getElementById('score-tracker');
const progressBarFill = document.getElementById('progress-bar-fill');
const finalScoreDisplay = document.getElementById('final-score');
const performanceFeedback = document.getElementById('performance-feedback');

let questionsList = [];
let currentQuestionIdx = 0;
let userScore = 0;

function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

function showScreen(screenToShow) {
    [setupScreen, loadingScreen, questionScreen, resultsScreen].forEach(s => s.classList.remove('active'));
    screenToShow.classList.add('active');
}

async function fetchQuizQuestions() {
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    
    const apiEndpoint = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    
    showScreen(loadingScreen);

    try {
        const response = await fetch(apiEndpoint);
        if(!response.ok) throw new Error("Network latency mismatch");
        
        const data = await response.json();
        
        if(data.results && data.results.length > 0) {
            questionsList = data.results;
            currentQuestionIdx = 0;
            userScore = 0;
            scoreTracker.innerText = `Score: 0`;
            showScreen(questionScreen);
            renderCurrentQuestion();
        } else {
            alert("Insufficient remote records. Tweak preferences.");
            showScreen(setupScreen);
        }
    } catch (error) {
        console.error("API Error: ", error);
        alert("Failed fetching configuration nodes.");
        showScreen(setupScreen);
    }
}

function renderCurrentQuestion() {
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';

    const activeQuestionObj = questionsList[currentQuestionIdx];
    questionText.innerText = decodeHTMLEntities(activeQuestionObj.question);

    const rawOptions = [...activeQuestionObj.incorrect_answers, activeQuestionObj.correct_answer];
    const shuffledOptions = rawOptions.sort(() => Math.random() - 0.5);

    const currentNum = currentQuestionIdx + 1;
    progressText.innerText = `Question ${currentNum} of ${questionsList.length}`;
    progressBarFill.style.width = `${(currentNum / questionsList.length) * 100}%`;

    shuffledOptions.forEach(optionText => {
        const decodedText = decodeHTMLEntities(optionText);
        const button = document.createElement('button');
        button.classList.add('option-node');
        button.innerText = decodedText;
        
        // Target selection logic wrapper hook
        button.addEventListener('click', () => evaluationChoiceTrigger(button, decodedText, activeQuestionObj.correct_answer));
        optionsContainer.appendChild(button);
    });
}

function evaluationChoiceTrigger(selectedBtn, selectedText, correctString) {
    const decodedCorrectAnswer = decodeHTMLEntities(correctString);
    const allOptionNodes = document.querySelectorAll('.option-node');

    allOptionNodes.forEach(btn => btn.classList.add('disabled'));

    if (selectedText === decodedCorrectAnswer) {
        selectedBtn.classList.add('correct');
        userScore++;
        scoreTracker.innerText = `Score: ${userScore}`;
    } else {
        selectedBtn.classList.add('wrong');
        allOptionNodes.forEach(btn => {
            if (btn.innerText === decodedCorrectAnswer) btn.classList.add('correct');
        });
    }

    nextBtn.classList.remove('hidden');
}

function stepToNextQuestion() {
    currentQuestionIdx++;
    if (currentQuestionIdx < questionsList.length) {
        renderCurrentQuestion();
    } else {
        renderFinalSummary();
    }
}

function renderFinalSummary() {
    showScreen(resultsScreen);
    finalScoreDisplay.innerText = userScore;
    
    if (userScore >= 8) {
        performanceFeedback.innerText = "Exceptional performance! Strategic command validated.";
    } else if (userScore >= 5) {
        performanceFeedback.innerText = "Steady foundations. Minor edge optimization suggested.";
    } else {
        performanceFeedback.innerText = "Sub-nominal results. Review material core nodes.";
    }
}

startBtn.addEventListener('click', fetchQuizQuestions);
nextBtn.addEventListener('click', stepToNextQuestion);
restartBtn.addEventListener('click', () => showScreen(setupScreen));s
