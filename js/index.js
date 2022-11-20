import { questions } from "./questions.js";

const $ = (id) => document.getElementById(id);

const $answers = $("answers");
const $question = $("question");
const $counter = $("counter");
const $result = $("result");

let selectedQuestion = questions[0];
$question.innerHTML = `<p>${selectedQuestion.question}</p>`;
let answersHtml = "";

let activeOptions = true;
let activeTimer = true;

selectedQuestion.answers.map((answer, index) => {
  answersHtml += `<li id="options" class="options__item f-elements f-elements--center">
    <div class="options__indicator">${index + 1}</div>
    <p class="options__item-answer">${answer.option}</p>
  </li>`;
});

$answers.innerHTML = answersHtml;
const $options = document.querySelectorAll("#options");

let count = 10;

$counter.innerHTML = `${count}`;
setInterval(() => {
  if (count > 0 && activeTimer) {
    count--;
    $counter.innerHTML = `${count}`;
  } else {
    disableButtons();
    showSuccessfullAnswer();
  }
}, 1000);

const addSuccessfullStyle = (index) => {
  $options[index].classList.add("options__item--selected");
  $options[index].classList.add("options__item--successfull");
};
const addWrongStyle = (index) => {
  $options[index].classList.add("options__item--selected");
  $options[index].classList.add("options__item--wrong");
};

const showSuccessfullAnswer = () => {
  selectedQuestion.answers.map((answer, index) => {
    if (answer.isCorrect) addSuccessfullStyle(index);
  });
};

const showWrongAnswer = (index) => {
  addWrongStyle(index);
  showSuccessfullAnswer();
};

const disableButtons = () => (activeOptions = false);

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

// EVENTS

document.addEventListener("keydown", (event) => keydownHandler(event.key));

$options.forEach(($option, index) =>
  $option.addEventListener("click", () => clickHandler(index))
);
