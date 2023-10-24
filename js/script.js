import quizData from "./questions.js";

const quiz = document.querySelector(".quiz-box");
const inpAnswers = document.querySelectorAll(".answer");
const question = document.querySelector(".question");
const result = document.getElementById("result");
const score = document.getElementById("score");

// Answers
const ans_1 = document.getElementById("ans_1");
const ans_2 = document.getElementById("ans_2");
const ans_3 = document.getElementById("ans_3");
const ans_4 = document.getElementById("ans_4");

// Buttons
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const subBtn = document.querySelector(".submit");
const reloadBtn = document.querySelector(".reload");

let answered = 0;
let clickBack = 0;
const randomQuiz = 100;
let answerSelected = {};
let ranNums = [];
let currentQuiz = 0;

//refresh
window.onbeforeunload = function (e) {
  localStorage.clear();
};

function loadQuiz() {
  if (clickBack == 0) {
    currentQuiz = Math.floor(Math.random() * quizData.length) + 1;
    let counter = 0;
    while (0 < ranNums.length < 10 && ranNums.includes(currentQuiz)) {
      counter++;
      currentQuiz = Math.floor(Math.random() * quizData.length) + 1;
      if (counter === 20) {
        break;
      }
    }
    ranNums.push(currentQuiz);
  } else {
    clickBack = 1;
    console.log(ranNums);
    currentQuiz = ranNums[ranNums.length - 1];
  }
  const currentQuizData = quizData[currentQuiz - 1];
  question.innerText = currentQuizData ? currentQuizData.question : "";

  if (currentQuizData) {
    ans_1.innerText = currentQuizData.answer_1;
    ans_2.innerText = currentQuizData.answer_2;
    ans_3.innerText = currentQuizData.answer_3;
    ans_4.innerText = currentQuizData.answer_4;
  }
  deSelectAnswer();

  // در ابتدا دکمه برگشت نشان داده نشود
  prevBtn.style.display = "none";

  // اگر سوالی برای نمایش وجود نداشته باشد دکمه تایید ظاهر شود
  let allQuestion = JSON.parse(localStorage.getItem("question"));
  let lastQuestion = 0;
  if (allQuestion && Array.isArray(allQuestion)) {
    lastQuestion = allQuestion.length;
  }
  if (lastQuestion == quizData.length - 1) {
    nextBtn.style.display = "none";
    subBtn.style.display = "block";
  }
}
loadQuiz();

// جواب از حالت انتخاب خارج شود

function deSelectAnswer() {
  inpAnswers.forEach((inpAnswer) => {
    inpAnswer.checked = false;
  });
}

//به سوال بعدی می رود

nextBtn.addEventListener("click", () => {
  if (quizData.length == 0) {
    reloadBtn.style.display = "block";
    localStorage.clear();
  }
  addToStorage(quizData[currentQuiz - 1] ? quizData[currentQuiz - 1].id : null);
  let answer = getSelected();
  if (answer) {
    if (
      answer ===
      (quizData[currentQuiz - 1] ? quizData[currentQuiz - 1].correct : null)
    ) {
      answered++;
    }
    if (currentQuiz <= quizData.length && getSelected()) {
      loadQuiz();
      // دکمه برگشت نمایش داده شود
      prevBtn.style.display = "block";
    }
  }
});

// به سوال قبلی می رود

prevBtn.addEventListener("click", () => {
  clickBack = 1;
  if (ranNums.length > 0) {
    //delete local storage
    let allQuestions = JSON.parse(localStorage.getItem("question"));
    allQuestions.splice(allQuestions.indexOf(currentQuiz), 1);
    localStorage.setItem("question", JSON.stringify(allQuestions));

    //delete ranNum
    const index = ranNums.indexOf(randomQuiz);
    const remove = ranNums.splice(index, 1);
    loadQuiz();
    console.log(`myArray values: ${ranNums}`);
    console.log("remove:", remove);

    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
    subBtn.style.display = "none";
  }
  if (ranNums.length == 1) {
    clickBack = 0;
    prevBtn.style.display = "none";
  }
});

// دکمه تایید (submit button)
subBtn.addEventListener("click", () => {
  addToStorage(quizData[currentQuiz - 1] ? quizData[currentQuiz - 1].id : null);
  if (getSelected) {
    quiz.style.display = "none";
    result.style.display = "block";
    reloadBtn.style.display = "block";
    let answer = getSelected();
    if (
      answer == quizData[currentQuiz - 1]
        ? quizData[currentQuiz - 1].correct
        : null
    ) {
      answered++;
    }
    score.innerText =
      answered + "/" + quizData.length + " " + "questions answer correctly";
  }
});

// بررسی می کندآیا یک چک باکس علامت زده شده است یا خیر
function getSelected() {
  let answer;
  inpAnswers.forEach((inpAnswer, index) => {
    if (inpAnswer.checked) {
      answer = inpAnswer.id;
      answerSelected[currentQuiz] = answer;
      answer = "answer_" + (index + 1);
    }
  });

  return answer;
}

let getOldQuestions = () => {
  let allQuestions = JSON.parse(localStorage.getItem("question"));
  if (allQuestions) {
    return allQuestions;
  }
  return [];
};

let addToStorage = (newQuestion) => {
  let oldQuestions = getOldQuestions();
  let allQuestions = JSON.parse(localStorage.getItem("question"));
  if (Array.isArray(allQuestions) && allQuestions.includes(newQuestion)) {
  } else {
    oldQuestions.push(newQuestion);
    localStorage.setItem("question", JSON.stringify(oldQuestions));
  }
};
