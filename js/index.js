import { questions } from "./questions.js";

const $ = (id) => document.getElementById(id);

const $answers = $("answers");
const $question = $("question");
let selectedQuestion = questions[0];
$question.innerHTML = `<p>${selectedQuestion.question}</p>`;
let answersHtml = "";
let $options = $("options");
const clickHandler = (e) => {
  console.log("hola");
};

selectedQuestion.answers.map((answer, index) => {
  answersHtml += `<li id="options${
    index + 1
  }" class="options__item f-elements f-elements--center">
    <div class="options__indicator">${index + 1}</div>
    <p class="options__item-answer">${answer.option}</p>
  </li>`;
});
$answers.innerHTML = answersHtml;
$options = document
  .getElementById("answers")
  .getElementsByClassName("options__item");
console.log(options);
$options.map((option, index) => {
  console.log(index);
});
$options.addEventListener("click", (e) => clickHandler(e), false);
// $answers.outerwiHTML = `<ul class="options f-elements f-elements--gap-20" id="answers">
// ${answersHtml}</ul>`;
