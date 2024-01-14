var questions = [];

fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
  })
  .catch((error) => {
    console.log("Error loading questions :", error);
  });

// get refrence for html elements
const timerDisplay = document.getElementById("timer");
const quizeContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const startButton = document.getElementById("startBtn");
const progressBar = document.getElementById("progress");
const lastResult = document.getElementById("lastResult");
const addQuestion = document.getElementById("addQuestion");
const settingBtn = document.getElementById("settingBtn");

// the varuble for our app rules
let questionIndex = 0;
let timer;
let questionDuration = 100;
let toalCorrectAnswer = 0;
let resultArr = [];
//////////   add some value
let currentPercent = 0;

const interval = 12; // Interval in milliseconds

function startQuiz() {
  shuffleQuestions();
  startTimer();
  startButton.style.display = "none";
  quizeContainer.style.display = "block";
  quiz();
}
startButton.addEventListener("click", startQuiz);
//settingBtn.addEventListener("click", setting);

function startTimer() {
  timeRemaining = questionDuration;

  progressUpdate(timeRemaining);
  timer = setInterval(function () {
    timeRemaining--;

    progressUpdate(timeRemaining);
    if (timeRemaining <= 0) {
      clearTimeout(timer);
      endTime();
    }
  }, 600);
}
function progressUpdate(timeRemaining) {
  progressBar.innerHTML = `<div class="progress" role="progressbar" aria-label="Basic example"
     aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">

    <div class="progress-bar w-100" id ="progresss"> ${timeRemaining}%  </div>
    </div> `;
  document.getElementById("progresss").style.maxWidth = `${timeRemaining}%`;
}

function updateTimerDisplay(timeRemaining) {
  timerDisplay.innerHTML = `<h3> Time Remaining : 🕥 <b> ${timeRemaining} seconds 🕥</h3>`;
}
const quiz = () => {
  quizeContainer.innerHTML = `<div class= "my-2 p-3 card-footer shadow f-size">
     <h3> ${questions[questionIndex].questionText}</h3>
       ${questions[questionIndex].options
         .map(
           (question) =>
             `<input type="radio" value='${question}' id='${question}' class="form-check-input my-2 ms-2 " name="qu" >
         <label class="form-check-label my-2" for='${question}'> ${question}</label>`
         )
         .join("</br>")} 
         <br> <br>
         <button class="btn btn-primary" id="next" onclick = ${"testcheck()"} > Next </button> </div> 
         </div>
         <div class="d-flex justify-content-center">
          `;
  const nextBtn = document.getElementById("next");

  if (questionIndex == questions.length - 1) {
    nextBtn.innerText = "submit";
  }
};

function setting() {
  addQuestion.innerHTML = `<label id="question" class=" my-1" > question text here </label>
    <input type="text"   id="question"   class="w-100 my-2">
    <input type="radio"   id="option1" name="options"  class="w-auto my-2">
    <label id="option1" class="my-2" for="option1"> option1 </label>
    <input type="text"   id="option1"   class="w-50 my-2"> </br>
    <input type="radio"   id="option2" name="options"  class="w-auto my-2">
    <label id="option2" class="my-2" for="option2"> option2 </label>
    <input type="text"   id="option2"   class="w-50 my-2"></br>
    <input type="radio"   id="option3" name="options"  class="w-auto my-2">
    <label id="option3" class="my-2" for="option3"> option3</label>
    <input type="text"   id="option3"   class="w-50 my-2" >  
    <button id="Add" class="btn btn-primary my-2 mx-5" disabled >Add</button>`;
}

const testcheck = () => {
  //var form = document.getElementsByName("qu");
  const form = document.querySelector("input[name='qu']:checked");
  var selectedValue = "";
  /*for (var i = 0; i < questions[i].options.length; i++) {
    if (form[i].checked) {
      
      break;
    }
  }*/

  if (!form) {
    //  false/ ! / undefined / null / void
    // alert("Please select an answer");  // a validation to see if user checked the answe
    alertify.alert("Select an Answer", "Please select an answer!", function () {
      alertify.success("Ok");
    });
    return false;
  }
  selectedValue = form.value;
  const resultAn = selectedValue == questions[questionIndex].correctAnswer;
  if (resultAn) {
    // resultContainer.innerHTML += `<div class="oneResult " id="oneResult${questionIndex}">
    //👍</div>`;
    //document.getElementById(`oneResult${questionIndex}`).style.backgroundColor =
    //"green";
    addresult("green", "👍");
    toalCorrectAnswer++;
    resultArr.push({
      givenQuestion: questions[questionIndex].questionText,
      yourAnswer: selectedValue,
      status: "correct",
    });
  } else {
    // resultContainer.innerHTML += `<div class="oneResult zoom-in-out-box" id="oneResult${questionIndex}">👎</div>`;
    // document.getElementById(`oneResult${questionIndex}`).style.backgroundColor =
    //  "red";
    //document.getElementById(`oneResult${questionIndex}`).style.animation= "zoom-in-zoom-out 1s ease";
    addresult("red", "👎");
    resultArr.push({
      givenQuestion: questions[questionIndex].questionText,
      yourAnswer: selectedValue,
      status: "incorrect",
    });
  }
  questionIndex++;
  endQuiz();
  quiz();
};

function endQuiz() {
  if (questionIndex == questions.length) {
    displayResult();
    progressBar.style.display = "none";
    quizeContainer.style.display = "none";
    clearTimeout(timer);
  }
}
function endTime() {
  displayResultTimeEnd();
  progressBar.style.display = "none";
  quizeContainer.style.display = "none";
}

function displayResult() {
  resultContainer.innerHTML = `<div class=" f-bolder d-flex align-content-center p-2 justify-content-between">
  <h2 class="fw-bold m-4 text-primary f-text p-3"><br> Your Result </h2>
  <canvas id="donationRing" width="200" height="200"></canvas>
  
  </div> 
  <div class="d-flex flex-column"> 
  <h3 class="d-flex m-3 f-text justify-content-center fw-bold"> Thank You 🙂  </h3>
  <button id="reloadBtn" class="btn btn-primary mb-2 flex-fill" onclick="location.reload();">Try Again</button>
  </div> 
  `;

  /*<div class="card border border-success border-5 rounded-3 p-2 my-3 shadow">
      <h2 class="d-flex justify-content-center"> Your Score  </h2>
      <div class="bg-warning p-2 my-2 border border-2 rounded border-dark">
          <p class="fw-bold">Your Score: ${toalCorrectAnswer} out of ${questions.length} </p>  
          <p class="fw-bold">Percentage: ${percentage}% </p> 
      </div>
      <button id="reloadBtn" class="btn btn-primary" onclick="location.reload();">Try Again</button>
  </div>
  `;*/

  /// Let's print the review of the result here
  let resultReviewHtml = resultArr.map(resultReview).join("");
  // We use map function to process resultArr in combination with resultReview() function
  resultContainer.innerHTML += `<h2 class="d-flex justify-content-center"> Review your answers </h2>
                                ${resultReviewHtml}`;
}
function displayResultTimeEnd() {
  const percentage = ((toalCorrectAnswer / questions.length) * 100).toFixed(2);
  resultContainer.innerHTML = `<h2 class="d-flex justify-content-center text-danger fw-bold"> Time Up !</h2>
  <div class=" f-bolder d-flex align-content-center p-2 justify-content-center">
  <h2 class="fw-bold m-4 text-primary f-text p-3"><br> Your Result </h2>
  <canvas id="donationRing" width="200" height="200"></canvas>
  
  </div> 
  <div class="d-flex flex-column"> 
  <h3 class="d-flex m-3 f-text justify-content-center fw-bold"> You have to be faster 🙁 </h3>
  <button id="reloadBtn" class="btn btn-primary mb-2 flex-fill" onclick="location.reload();">Try Again</button>
  </div> 
  `;

  /* `<div class="card border border-success border-5 rounded-3 p-2 my-3 shadow">
      <h2 class="d-flex justify-content-center text-danger fw-bold"> Time Up !</h2>
      <div class="bg-warning p-2 my-2 border border-2 rounded border-dark">
          <p class="fw-bold">Your Score: ${toalCorrectAnswer} out of ${questions.length} </p>  
          <p class="fw-bold">Percentage: ${percentage}% </p> 
          
      </div>
      <h2 class="d-flex justify-content-center text-danger fw-bold"> You have to be faster </h2>
      <button id="reloadBtn" class="btn btn-primary" onclick="location.reload();">Try Again</button>
  </div>
  `;*/

  /// Let's print the review of the result here
  let resultReviewHtml = resultArr.map(resultReview).join("");
  console.log(resultArr);
  // We use map function to process resultArr in combination with resultReview() function
  if (resultArr.length !== 0) {
    resultContainer.innerHTML += `<h2 class="d-flex justify-content-center"> Review your answers </h2>
                                  ${resultReviewHtml}`;
  }
}
function resultReview(item) {
  let text = `<div class="bg-info border border-2 rounded border-dark shadow p-2 my-2">`;
  text += `<p class="fw-bold">Question : ${item.givenQuestion}</p>`;
  if (item.status == "correct") {
    text += `<p>Your Answer : <span class="text-success fw-bold">${item.yourAnswer} (Correct!)</span></p>`;
  } else if (item.status == "incorrect") {
    text += `<p>Your Answer : <span class="text-danger fw-bold">${item.yourAnswer} (Incorrect!)</span></p>`;
  }
  text += `</div>`;
  return text;
}
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // ES6 Destructing assignment
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  console.log(questions);
}
function drawDonationRing(percent, color) {
  const canvas = document.getElementById("donationRing");
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80;
  const startAngle = -Math.PI / 2; // Start from the top
  const endAngle = startAngle + 2 * Math.PI * percent;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#eee";
  ctx.fill();

  // Draw progress ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.lineWidth = 16; // Adjust ring thickness
  ctx.strokeStyle = color;
  ctx.stroke();

  // Display percentage inside the ring
  const text = Math.round(percent * 100) + "%";
  ctx.font = "25px Arial";
  ctx.fillStyle = color;
  ctx.fillText(text, centerX - 25, centerY + 8);
}
const updateRing = () => {
  const percentage = (toalCorrectAnswer / questions.length).toFixed(1);

  drawDonationRing(currentPercent, "blue");

  currentPercent += 0.005; // Adjust step size

  if (currentPercent > percentage) {
    clearInterval(progressInterval);
  }
};
const progressInterval = setInterval(updateRing, interval);

const divresult = document.getElementById("result");
function addresult(color, finger) {
  var iDiv2 = document.createElement("div");
  iDiv2.className = "oneResult";
  iDiv2.innerText = finger;
  iDiv2.style.backgroundColor = color;
  divresult.appendChild(iDiv2);
}
