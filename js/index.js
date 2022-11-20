import { questions } from "./questions.js";

console.log(questions);
const $ = (id) => document.getElementById(id);

const $answers = $("answers");
const $question = $("question");
let selectedQuestion = questions[0];
$question.innerHTML = `<p>${selectedQuestion.question}</p>`;
let answersHtml = "";

const clickHandler = () => {
  console.log("hola");
};
let $option = $("option");

selectedQuestion.answers.map((answer, index) => {
  answersHtml += `<li id="option" class="options__item f-elements f-elements--center">
    <div class="options__indicator">${index + 1}</div>
    <p class="options__item-answer">${answer.option}</p>
  </li>`;
  $option = $("option");
});
$answers.innerHTML = answersHtml;
$option.addEventListener("click", () => console.log("hola"));
