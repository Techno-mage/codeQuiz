//to do list
//1. Create variables needed for the quiz
//2. Create initialize function
//3. create a list of questions
//4. create next question function
//5. create a answer function that determines if selected answer is correct or not.
//6. add a timer 

//VARIABLES
//DOM elements
var question = document.createElement("h1");
var answers = [];
for (var i = 0; i < 4; i++){
    answers[i] = document.createElement("div")
    answers[i].classList.add("button");
    
}
var timeRemaining = document.createElement("div");
var quiz = document.getElementById("quiz");


// Quiz questions
var questions = [
    {question:"what is 2+2?", ans:["3", "4", "5", "6"], correct:1},
    {question:"what is 4+2?", ans:["3", "4", "5", "6"], correct:3},
    {question:"what is 3*2?", ans:["3", "4", "5", "6"], correct:3},
    {question:"what is 8-4?", ans:["3", "4", "5", "6"], correct:1},
    {question:"what is 5*1?", ans:["3", "4", "5", "6"], correct:2}


];

function finished (){
    quiz.style = "display: none;"
    alert("final score: " + score);
    
    do{
         var initial = prompt("enter your initials");
    }while (initial == "");
    newScore(initial, score);
    retriveScores();
    document.getElementById('scores').style.display = 'block';
    
}

//Quiz variables
var score = 0;
var time = 20;
var timeFlag = false;

//score list variabes
var scoreList = document.getElementById("scores");

function timer(){
    var timerInterval = setInterval( function(){
        time--;
        timeRemaining.textContent= ("Seconds Left: " + time);
        

        if(time <= 0){
            alert("times up.");
            finished();
            clearInterval(timerInterval);
        }
        if (timeFlag){
            clearInterval(timerInterval);
        }

    }, 1000)

}


var c = ""; //stores the current correct answer
function cAnswer(a){
    console.log(a + " " + c);
    if (a == c){
        alert("correct");
        score ++;
    } else {
        alert("wrong");
        time = time - 2;
    }
    nextQuestion();

}

function nextQuestion(){
    console.log("nextQuestion called");
    if (questions.length == 0){
        alert("out of questions");
        timeFlag = true;    // stops the clock
        finished();
    } else{
        var q = questions.shift();
        question.textContent = q.question;
        c = q.correct;
        for(var i = 0; i < 4; i++){
            answers[i].textContent = q.ans[i];
            console.log("After appending event listener");
        }

    }

}



function initialize(){
    var main = document.getElementById("main");
    main.style= "display: none;";
    
    quiz.appendChild(question);
    for (var i = 0; i < 4; i++){
        console.log(answers[i]);
        quiz.appendChild(answers[i]);
    }
    answers[0].addEventListener("click", function() {cAnswer(0)});
    answers[1].addEventListener("click", function() {cAnswer(1)});
    answers[2].addEventListener("click", function() {cAnswer(2)});
    answers[3].addEventListener("click", function() {cAnswer(3)});
    quiz.appendChild(timeRemaining);
    timeRemaining.textContent= ("Seconds Left: " + time);

    nextQuestion();
    timer();

}


//score elements

function testObjects(){
    var obj = {
        "scores": [{"name":"bob", "score":5},{"name":"cop", "score":4,},{"name":"ack", "score":3}]


    }

    localStorage.setItem("scores", JSON.stringify(obj));

}
testObjects();

function retriveScores(){
    var s = JSON.parse(localStorage.getItem("scores"));
    
    scoreList.innerHTML = "";

    for(item of s.scores){
        var el = document.createElement("div");
        el.textContent = (item.name + " " + item.score);
        scoreList.appendChild(el);

    }

}

function newScore(a, b){
    var s = JSON.parse(localStorage.getItem("scores"));

    var newEntry = {"name":a, "score": b};
    s.scores.push(newEntry);
    console.log(s);
    var n = {"scores": s.scores};
    localStorage.setItem("scores", JSON.stringify(n));
    

}