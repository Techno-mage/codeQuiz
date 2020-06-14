//to do list
//1. Create variables needed for the quiz
//2. Create initialize function
//3. create a list of questions
//4. create next question function
//5. create a answer function that determines if selected answer is correct or not.
//6. add a timer 

//VARIABLES
//DOM elements
var prompt = document.createElement("h1");
var answers = [];
for (var i = 0; i < 4; i++){
    answers[i] = document.createElement("div")
    answers[i].classList.add("button");
    
}
// Quiz questions
var questions = [
    {prompt:"what is 2+2?", ans:["3", "4", "5", "6"], correct:1},
    {prompt:"what is 4+2?", ans:["3", "4", "5", "6"], correct:3},
    {prompt:"what is 3*2?", ans:["3", "4", "5", "6"], correct:3},
    {prompt:"what is 8-4?", ans:["3", "4", "5", "6"], correct:1},
    {prompt:"what is 5*1?", ans:["3", "4", "5", "6"], correct:2}


];


var c = ""
function cAnswer(a){
    console.log(a + " " + c);
    if (a == c){
        alert("correct");
    } else {
        alert("wrong");
    }
    nextQuestion();

}

function nextQuestion(){
    console.log("nextQuestion called");




    if (questions.length == 0){
        alert("out of questions");
    } else{
        var q = questions.shift();
        prompt.textContent = q.prompt;
        c = q.correct;
        for(var i = 0; i < 4; i++){
            answers[i].textContent = q.ans[i];
            //answers.onClick = nextQuestion(i, q.correct);
            
            
            /*if (i == q.correct){
                answers[i].addEventListener("click",  Correct);
            } else {
                answers[i].addEventListener("click", Wrong);
            }*/


            
            console.log("After appending event listener");
        }

    }

}



function initialize(){
    var main = document.getElementById("main");
    main.style= "display: none;";
    var quiz = document.getElementById("quiz");
    quiz.appendChild(prompt);
    for (var i = 0; i < 4; i++){
        console.log(answers[i]);
        quiz.appendChild(answers[i]);
        //answers[i].addEventListener("click", function() {cAnswer(i)});
    }
    answers[0].addEventListener("click", function() {cAnswer(0)});
    answers[1].addEventListener("click", function() {cAnswer(1)});
    answers[2].addEventListener("click", function() {cAnswer(2)});
    answers[3].addEventListener("click", function() {cAnswer(3)});

    nextQuestion(" ");

}