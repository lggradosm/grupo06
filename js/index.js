import { questions } from "./questions.js";

const $ = (id) => document.getElementById(id);

const $answers = $("answers");
const $question = $("question");
const $counter = $("counter");
const $result = $("result");
const $indicator = $("indicator");
const TIME_TIMER = 15;

const OUT_OF_TIME_RANGE = -1;

let questionsLenght = questions.length;
let rand = null;
let selectedQuestion = null;
let answersHtml = "";
let activeOptions = true;
let activeTimer = true;
let timerCounter = TIME_TIMER;
let $options = null;

//TIMER

setInterval(() => {
  timerCounter--;

  if (timerCounter >= 0 && activeTimer) {
    $counter.innerHTML = `${timerCounter}`;
  }
  if (timerCounter === OUT_OF_TIME_RANGE) {
    showSuccessfullAnswer();
    disableButtons();
    nextQuestion();
  }
}, 1000);

// EVENT LISTENERS

document.addEventListener("keydown", (event) => keydownHandler(event.key));

const createButtonsEvent = () => {
  $options = document.querySelectorAll("#options");
  $options.forEach(($option, index) =>
    $option.addEventListener("click", () => clickHandler(index))
  );
};

const resetResultStyles = () => {
  $result.classList.remove("quiz__result--successfull");
  $result.classList.remove("quiz__result--wrong");
};

//INIT QUIZ

const init = () => {
  activeTimer = true;
  activeOptions = true;
  timerCounter = TIME_TIMER;
  selectQuestion();
  renderQuiz();
  createButtonsEvent();
  resetResultStyles();
};

const selectQuestion = () => {
  rand = Math.floor(Math.random() * questionsLenght - 1) + 1;
  selectedQuestion = questions[rand];
  questions.splice(rand, 1);
  questionsLenght--;
};

const renderQuiz = () => {
  $counter.innerHTML = `${timerCounter}`;
  $result.innerHTML = "";
  renderQuestion();
  renderOptions();
};
//ADD ANSWERS LIST TO HTML

const renderOptions = () => {
  answersHtml = "";
  selectedQuestion.answers.map((answer, index) => {
    answersHtml += `<li id="options" class="options__item f-elements f-elements--center">
      <div class="options__indicator">${index + 1}</div>
      <p class="options__item-answer">${answer.option}</p>
    </li>`;
  });
  $answers.innerHTML = answersHtml;
};

const renderQuestion = () => {
  $question.innerHTML = `<p>${selectedQuestion.question}</p>`;
};

// ADD STYLES

const addSuccessfullStyle = (index) => {
  $options[index].classList.add("options__item--selected");
  $options[index].classList.add("options__item--successfull");
};

const addWrongStyle = (index) => {
  $options[index].classList.add("options__item--selected");
  $options[index].classList.add("options__item--wrong");
};

// SHOW SUCCESSFULL ANSWER WHEN TIMEOUT OR WRONG RESPONSE

const showSuccessfullAnswer = () => {
  selectedQuestion.answers.map((answer, index) => {
    if (answer.isCorrect) addSuccessfullStyle(index);
  });
};

const showWrongAnswer = (index) => {
  addWrongStyle(index);
  showSuccessfullAnswer();
};

// DISABLE BUTTONS
const disableButtons = () => (activeOptions = false);

// SUCCESSFULL OR WRONG RESULT

const successfull = (index) => {
  addSuccessfullStyle(index);
  showResult("CORRECTO");
  nextQuestion();
  $result.classList.add("quiz__result--successfull");
};

const wrong = (index) => {
  showWrongAnswer(index);
  showResult("INCORRECTO");
  nextQuestion();
  $result.classList.add("quiz__result--wrong");
};

const showResult = (text) => {
  $result.innerHTML = text;
};

//NEXT QUESTION

const nextQuestion = () => {
  $indicator.classList.add("quiz__indicator");
  setTimeout(() => {
    $indicator.classList.remove("quiz__indicator");
    init();
  }, 5000);
};

// HANDLER FUNCTIONS
const clickHandler = (index) => {
  if (activeOptions) {
    activeTimer = false;
    selectedQuestion.answers[index].isCorrect
      ? successfull(index)
      : wrong(index);
    disableButtons();
  }
};

const keydownHandler = (value) => {
  if (value == 1 || value == 2 || value == 3 || value == 4)
    clickHandler(value - 1);
};

init();
