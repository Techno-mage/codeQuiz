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
var isCorrect = document.createElement("h2");

// Quiz questions
var questions = [
    {question:"Which of these is not a semantic HTML element?", ans:["<section>", "<div>", "<header>", "<main>"], correct:1},
    {question:"Which of these can you refrence an element by in CSS?", ans:["tag name", "class", "id", "all of the above"], correct:3},
    {question:"What value will Math.floor(Math.random() * 10) return?", ans:["between 0 and 10", "between 0 and 9", "between 1 and 10", "between 1 and 9"], correct:1},
    {question:"how do you append a child element to a dom object in javascript?", ans:["el.addChild(newChild)", "el.newChild(newChild)", "el.appendChild(newChild)", "el.append(newChild)"], correct:2},
    {question:"How do you refrence an element with id='thisId' in CSS?", ans:["thisId {...}", "#thisId {...}", ".thisId{...}", "none of the above"], correct:1}


];

function finished (){
    
    score = score + Math.floor(time / 5);
    alert("final score: " + score);
    quiz.style.display= "none";
    
    do{
         var initial = prompt("enter your initials");
    }while (initial == "");
    newScore(initial, score);
    retriveScores();
    
    
}

//Quiz variables
var score = 0;
var time = 30;
var timeFlag = false;

//score list variabes
var scoreList = document.getElementById("sList");

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
        
        isCorrect.textContent= "correct";
        isCorrect.style.backgroundColor = "#ccffcc"; 
        score = score + 5;
    } else {
        
        isCorrect.textContent= "wrong";
        isCorrect.style.backgroundColor= "#ff6666"

        time = time - 2;
    }
    nextQuestion();

}

function nextQuestion(){
    console.log("nextQuestion called");
    if (questions.length == 0){
        
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
    quiz.style.display = "block";
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
    quiz.appendChild(isCorrect);

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
//testObjects();

function retriveScores(){
    
    document.getElementById("main").style.display = 'none';
    document.getElementById('scores').style.display = 'block';
    var s = JSON.parse(localStorage.getItem("scores"));

    scoreList.innerHTML = "";
    console.log ("clicked")
    if (s == null){
        return;
    }
    console.log("after if statement")
    
    

    for(item of s.scores){
        var el = document.createElement("li");
        el.textContent = (item.name + " " + item.score);
        scoreList.appendChild(el);

    }

}

function newScore(a, b){
    var s = JSON.parse(localStorage.getItem("scores"));

    var newEntry = {"name":a, "score": b};
    if (s == null){
        s = {"scores":[]};
    }
    s.scores.push(newEntry);
    s.scores.sort(function(a, b){return b.score - a.score});
    console.log(s);
    var n = {"scores": s.scores};
    localStorage.setItem("scores", JSON.stringify(n));
    

}

function clearScores(){
    localStorage.removeItem("scores");
    retriveScores();

}