const quizData = [
  {
    question:'Which of the following best explain the term internet?',
    option:['The process of connecting two or more computers',
    'The global network of interconnected devices',
    'A collection of web pages',
    'An online tool or services that allow users to search information'],
    answer: 'The global network of interconnected devices',
  },
  {
    question:'The first network that planted the seed of the internet was',
    option:['Vnet',
    'FTP',
    'ARPANET',
    'Voiltex'],
    answer:'ARPANET',
    
  },
  {
    question:'What is the acronym for the first network that planted the seed of the internet is?',
    option:['Vitalnetwork',
    'File Transfer Protocol',
    'Advance Research Project Agency Network',
    'Voiltex'],
    answer:'Advance Research Project Agency Network',
    
  },
  {
    question:'In which year was the first message sent between two computers connected to the first network that planted the seed of the internet',
    option:['1970s',
    '1989',
    '1969',
    '1993'],
    answer:'1969',
    
  },
  {
    question:'In which era was the Transmission Control Protocol/Internet Protocol (TCP/IP) developed?',
    option:['1970s',
    '1989',
    '1969',
    '1993'],
    answer:'1970s',
    
  },
  {
    question:'Which of the following people developed the TCP/IP?',
    option:['Vinton Cerf and Sir Tim Berners Lee',
    'Vinton Cerf and Robert Khan',
    'Robert Khan and Mosaic',
    'Robert Khan and Sir Tim Berners Lee'],
    answer:'Vinton Cerf and Robert Khan',
    
  },
  {
    question:'The World Wide Web (W.W.W) was invented by _________ in the year ______',
    option:['Sir Tim Berners Lee 1989',
    'Robert Khan 1980',
    'Vinton Cerf 1991',
    'Mosaic 1992'],
    answer:'Sir Tim Berners Lee 1989',
    
  },
  {
    question:'Which web browser popularized the W.W.W and made it more user friendly and in which year was it developed?',
    option:['Khan 1994',
    'Mosaic 1993',
    'IE 1995',
    'Phoniex 1957'],
    answer:'Mosaic 1993',
    
  },
  {
    question:'Facebook is a social networking site created by an American entrepreneur called Mark Zuckerberg in the year _______',
    option:['1960',
    '2000',
    '2004',
    '2016'],
    answer:'2004',
    
  },
  {
    question:'Facebook was first known as ________?',
    option:['facebook',
    'Thefacebook',
    'My facebook',
    'Bookface'],
    answer:'Thefacebook',
    
  },
  ];

let questionDisplay = document.querySelector('.quiz_question');

let questionNo = document.querySelector('.question_box');

let timerBox = document.querySelector('.quiz_question');

let scoreDisplay = document.querySelector('.score_box');

let quizOption = document.querySelector('.quiz_option');
let time = document.querySelector('.timer_box');
let nextBtn = document.querySelector('#next');

let previousBtn = document.querySelector('#previous');

let progressBar = document.querySelector('.progress-bar')

 
 let quizResults;
let currentIndex = 0;
let score = 0;
let timeLeft = 10;
let timer = 0;
let shuffledQuestion = [];

function displayQuestion() {
 let question = quizData[currentIndex].question;
 questionDisplay.innerHTML = question;
 quizOption.innerHTML = '';
 
 quizData[currentIndex].option.forEach((option,index) => {
  const div = document.createElement('div');
  div.innerHTML = `<input type='radio' id='option${index}' name='option' value='${option}'>
  <label for='option${index}'>${option}</label>
  `;
  quizOption.appendChild(div);
 });
}
displayQuestion();
startTimer();


function startTimer() {
 timer = setInterval(()=> {
  timeLeft--
  time.innerHTML = timeLeft;
  let progress = ((currentIndex + 1)/ quizData.length) * 100;
  progressBar.style.width = `${progress}%`
  if (timeLeft === 0) {
    clearInterval(timer);
    timeLeft = 10;
    Toastify({
   text: "No answer selected let move on",
   duration: 2000,
   gravity: "toastify-center",
   position: "center",
   backgroundColor: "linear-gradient(to right, #00b09b,#96c93d )",
   debug: true,
  }).showToast();
  setTimeout(() => {
       next();
    qLength();
  },2000)
 }
 }, 1000);
}
function checkAnswer() {
   const userAnswer = document.querySelector('input[name="option"]:checked').value; 
  
  
   if (userAnswer === quizData[currentIndex].answer) {
  Toastify({
   text: "Correct",
   duration: 1000,
   gravity: "toastify-center",
   position: "center",
   backgroundColor: "linear-gradient(to right, #00b09b,#96c93d )",
   debug: true,
  }).showToast();
  score++;
 }else{
  Toastify({
   text: "Incorrect",
   duration: 1000,
   gravity: "toastify-center",
   position: "center",
   backgroundColor: "linear-gradient(to right, #00b09b,#96c93d )",
   debug: true,
  }).showToast();
 }
  }


function next() {
 if (currentIndex < quizData.length - 1) {
  clearInterval(timer);
  timeLeft = 10;
  currentIndex++;
  displayQuestion();
  qLength();
  startTimer();
 } else {
  clearInterval(timer);
  setTimeout(() =>{
   time.innerHTML = 'Time:';
   nextBtn.disabled = true;
   previousBtn.disabled = true;
   scoreDisplay.innerHTML = 'Score:';
   questionNo.innerHTML = 'Question:';
   progressBar.style.width = "0%";
   quizOption.innerHTML = '';
 if (score >= 5) { 
  quizResults = `Out of ${quizData.length} your score is ${score}.\nCongratulations!`
 } else {
  time.innerHTML = 'Time:';
  nextBtn.disabled = true;
   previousBtn.disabled = true;
   scoreDisplay.innerHTML = 'Score:';
   progressBar.style.width = '0%';
   questionNo.innerHTML = 'Question:';
   quizOption.innerHTML = '';
  quizResults = `Out of ${quizData.length} your score is ${score}.\nNot bad more room for improvement!`
 };
 questionDisplay.style.color = 'royalBlue';
 questionDisplay.style.fontFamily = 'custom';
 questionDisplay.innerHTML = quizResults;
 restartQuizBtn();
 text();
},2050)
 }
}

nextBtn.addEventListener('click',function () {
 if (!document.querySelector('input[name="option"]:checked')) {
  Toastify({
   text: "Select an answer",
   duration: 3000,
   gravity: "toastify-center",
   position: "center",
   backgroundColor: "linear-gradient(to right, #00b09b,#96c93d )",
   debug: true,
  }).showToast();
  return;
 } else {
  checkAnswer();
  next();
 scoreDisplay.innerHTML = `Score: ${score}`;
 }
});


function previous() {
 if (currentIndex > 0) {
  clearInterval(timer);
  timeLeft = 10;
  currentIndex--;
  if (score) {
     --score;
  }
  scoreDisplay.innerHTML = `Score: ${score}`;
  displayQuestion();
  qLength();
  startTimer();
 }else{
  Toastify({
   text: "No previous question",
   duration: 1000,
   gravity: "toastify-center",
   position: "center",
   backgroundColor: "linear-gradient(to right, #00b09b,#96c93d )",
   debug: true,
  }).showToast();
  console.log('No previous questions');
 }
}


previousBtn.addEventListener('click', previous);

function qLength() {
 questionNo.innerHTML = `Question: ${currentIndex + 1} / ${quizData.length}`;
}
qLength();


function learn() {
  window.location.href ="pro.html";
}

function about() {
  window.location.href = "pro.html";
}

//create restart quiz button
let restartQuizBtn = () => {
  const button = document.createElement('button');
  button.setAttribute('class','restartBtn');
  button.setAttribute('value','Restart Quiz');
  button.innerHTML = 'Restart Quiz';
  quizOption.appendChild(button);
  button.addEventListener('dblclick', () => {
   function displayQuestion() {
   score = 0;
   timeLeft = 10;
   currentIndex = 0;
   let question = quizData[currentIndex].question;
 questionDisplay.innerHTML = question;
 quizOption.innerHTML = '';
 
 quizData[currentIndex].option.forEach((option,index) => {
  const div = document.createElement('div');
  div.innerHTML = `<input type='radio' id='option${index}' name='option' value='${option}'>
  <label for='option${index}>${option}</label>
  `;
  quizOption.appendChild(div);
 });
 nextBtn.disabled = false;
 previousBtn.disabled = false;
 questionDisplay.style.color = 'black';
 questionDisplay.style.fontFamily = 'arial';
   }
   displayQuestion();
   startTimer();
   next();
   previous();
  });
}

function text() {
 let paragraph = document.createElement('p');
 paragraph.setAttribute('class','txt');
 paragraph.textContent = 'Double click the button above to start quiz again';
 quizOption.appendChild(paragraph);
}
/*
function shuffle(array) {    
 for (let i = array.length - 1; i > 0; i--) {        
 const j = Math.floor(Math.random() * (i + 1));        [array[i], array[j]] = [array[j], array[i]];    
}
}
*/