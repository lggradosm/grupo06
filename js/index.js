import { questions } from "./questions.js";

const $ = (id) => document.getElementById(id);

const $answers = $("answers");
const $question = $("question");
const $counter = $("counter");
const $result = $("result");
const rand = Math.floor(Math.random() * questions.length - 1) + 1;
const selectedQuestion = questions[rand];
const $options = document.querySelectorAll("#options");

let answersHtml = "";
let activeOptions = true;
let activeTimer = true;
let timerCounter = 15;

//ADD ANSWERS LIST TO HTML

selectedQuestion.answers.map((answer, index) => {
  answersHtml += `<li id="options" class="options__item f-elements f-elements--center">
    <div class="options__indicator">${index + 1}</div>
    <p class="options__item-answer">${answer.option}</p>
  </li>`;
});

// ADD HTML TO THE ELEMENTS

$answers.innerHTML = answersHtml;
$counter.innerHTML = `${timerCounter}`;
$question.innerHTML = `<p>${selectedQuestion.question}</p>`;

// TIMER

setInterval(() => {
  if (timerCounter > 0 && activeTimer) {
    timerCounter--;
    $counter.innerHTML = `${timerCounter}`;
  } else {
    disableButtons();
    showSuccessfullAnswer();
  }
}, 1000);

// ADD STYLES 

const addSuccessfullStyle = (index) => {
  $options[index].classList.add("options__item--selected");
  $options[index].classList.add("options__item--successfull");
};

const addWrongStyle = (index) => {
  $options[index].classList.add("options__item--selected");
  $options[index].classList.add("options__item--wrong");
};

// SHOW CORRECT RESPONSE WHEN IS WRONG OR TIMEOUT

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
  $result.classList.add("quiz__result--successfull");
};

const wrong = (index) => {
  showWrongAnswer(index);
  showResult("INCORRECTO");
  $result.classList.add("quiz__result--wrong");
};

const showResult = (text) => {
  $result.innerHTML = text;
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

// EVENT LISTENERS

document.addEventListener("keydown", (event) => keydownHandler(event.key));

$options.forEach(($option, index) =>
  $option.addEventListener("click", () => clickHandler(index))
);
