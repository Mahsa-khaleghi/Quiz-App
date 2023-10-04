import quizData from "./questions.js";

const quiz = document.querySelector(".quiz-box");
const inpAnswers = document.querySelectorAll(".answer");
const lable = document.querySelectorAll(".ans-lable");
const question = document.querySelector(".question");
const result = document.getElementById("result");
const score = document.getElementById("score");

// Answers
// استفاده نشده
// const [ans_1,ans_2,ans_3,ans_4] = document.querySelectorAll("ans_1,ans_2,ans_3,ans_4");
const ans_1 = document.getElementById("ans_1");
const ans_2 = document.getElementById("ans_2");
const ans_3 = document.getElementById("ans_3");
const ans_4 = document.getElementById("ans_4");

// Buttons

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const subBtn = document.querySelector(".submit");

let currentQuiz = 0;
let answered = 0;
let answerSelected = {};

loadQuiz();
//متن سوال و جواب را می گیرد
function loadQuiz() {
  const currentQuizData = quizData[currentQuiz];
  question.innerText = currentQuizData.question;
  ans_1.innerText = currentQuizData.answer_1;
  ans_2.innerText = currentQuizData.answer_2;
  ans_3.innerText = currentQuizData.answer_3;
  ans_4.innerText = currentQuizData.answer_4;
  deSelectAnswer();

  // پاسخ کاربر نشان داده می شود

  if (answerSelected[currentQuiz]) {
    let selected = answerSelected[currentQuiz];
    document.getElementById(selected).checked = true;
  }
  // اگر سوالی برای نمایش وجود نداشته باشد دکمه تایید ظاهر شود
  if (currentQuiz == quizData.length - 1) {
    nextBtn.style.display = "none";
    subBtn.style.display = "block";
  }
}

// جواب از حالت انتخاب خارج شود

function deSelectAnswer() {
  inpAnswers.forEach((inpAnswer) => {
    inpAnswer.checked = false;
  });
}

//به سوال بعدی می رود

nextBtn.addEventListener("click", () => {
  let answer = getSelected();
  console.log(answer, quizData[currentQuiz].correct);
  if (answer) {
    if (answer == quizData[currentQuiz].correct) {
      answered++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    }
  }
});

// به سوال قبلی می رود

prevBtn.addEventListener("click", () => {
  if (currentQuiz > 0) {
    currentQuiz--;
    loadQuiz();
  }
});

// دکمه تایید (submit button)

subBtn.addEventListener("click", () => {
  if (getSelected()) {
    quiz.style.display = "none";
    result.style.display = "block";

    let answer = getSelected();
    if (answer == quizData[currentQuiz].correct) {
      answered++;
    }
    score.innerText = answered + "/" + quizData.length + " " + "questions answer correctly";
  }
});

// بررسی می کندآیا یک چک باکس علامت زده شده است یا خیر

function getSelected() {
  let answer;
  inpAnswers.forEach((inpAnswer, index) => {
    if (inpAnswer.checked) {
      answer = "answer_" + (index + 1);
      // answerSelected[currentQuiz] = answer;
    }
  });
  return answer;
}
