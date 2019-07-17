var correct = 0;
var wrong = 0;
var unanswered = 0;
var counter = 30;
var currentQuestion = 0;
var timer;

var quiz = [
    {
        question: "What was the first movie Pixar ever released?",
        choices: ["Finding Nemo", "Monsters, Inc.", "Toy Story", "A Bug's Life"],
        answer: "Toy Story"
    },

    {
        question: "What year did The Matrix come out?",
        choices: ["1997", "1999", "2000", "2001"],
        answer: "1999"
    },

    {
        question: "Who directed Blade Runner, Gladiator, and Black Hawk Down?",
        choices: ["Christpher Nolan", "James Cameron", "Stephen Spielberg", "Ridley Scott"],
        answer: "Ridley Scott"
    },

    {
        question: "What was the first movie Disney ever released?",
        choices: ["Pinnochio", "Snow White and the Seven Dwarfs", "Dumbo", "Bambi"],
        answer: "Snow White and the Seven Dwarfs"
    },

    {
        question: "Which of these Quentin Tarantino movies was nominated for an Oscar but didn't actually win?",
        choices: ["Inglourious Basterds", "Pulp Fiction", "Django Unchained", "Kill Bill"],
        answer: "Inglourious Basterds"
    },

    {
        question: "What was the first Pixar movie to receive a PG rating in America?",
        choices: ["Inside Out", "Brave", "The Incredibles", "Up"],
        answer: "The Incredibles"
    },

    {
        question: "Which character in Monty Python and the Holy Grail insists that 'It's just a flesh wound'?",
        choices: ["Sir Lancelot", "Roger the Shrubber", "Tim the Enchanter", "Black Knight"],
        answer: "Black Knight"
    },

    {
        question: "Who was the first Disney princess with a tatoo?",
        choices: ["Pocahontas", "Mulan", "Belle", "Cinderella"],
        answer: "Pocahontas"
    },
];

var images = [
    "./assets/images/toyStory.gif",
    "./assets/images/theMatrix.gif",
    "./assets/images/gladiator.gif",
    "./assets/images/snowWhite.gif",
    "./assets/images/ingloriousBasterds.gif",
    "./assets/images/incredibles.gif",
    "./assets/images/montyPython.gif",
    "./assets/images/pocahontas.gif",
];

function nextQuestion() {
    var noMoreQuestions = (quiz.length - 1) === currentQuestion;
    if(noMoreQuestions) {
        results();
    } else {
    currentQuestion++;
    startGame();
    }
}

function timeOut() {
    clearInterval(timer);
    unanswered++;
    winLoss("wrong");
    setTimeout(nextQuestion, 3 * 1000);
}

function count() {
    counter--;
    $("#time").html("Timer: " + counter);
    if (counter === 0){
        timeOut();
    }
}

function startGame() {
    counter = 30;
    timer = setInterval(count, 1000);
    var question = quiz[currentQuestion].question;
    var choices = quiz[currentQuestion].choices;
    $("#time").html("Timer: " + counter);
    $("#quiz").html("<h4>" + question + "</h4>" + loadAnswers(choices));
}

function loadAnswers(choices) {
    let result = "";
    for (let i = 0; i< choices.length; i++) {
        result += "<p class='choice'>" + choices[i] + "</p>";
    }
    return result;
} 

$(document).on("click", ".choice", function(){
    clearInterval(timer);
    var userChoice = $(this).text();
    var correctAnswer = quiz[currentQuestion].answer;
    if (correctAnswer === userChoice){
        correct++;
        winLoss("correct");
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        wrong++;
        winLoss("wrong");
        setTimeout(nextQuestion, 3 * 1000);
    }
});

function results() {
    $("#quiz").html("<h3>" + "Correct answers: " + correct + "</h3>" + "<h3>" + "Wrong answers: " + wrong + "</h3>" + "<h3>" + "Unanswered: " + unanswered + "</h3>" + "<button class='btn btn-danger' id='reset'>" + "Start Over" + "</button>");
}

$(document).on("click", "#reset", function(){
    correct = 0;
    wrong = 0;
    unanswered = 0;
    counter = 30;
    currentQuestion = 0;
    timer = null;
    startGame();
});

function winLoss(status){
    var correctAnswer = quiz[currentQuestion].answer;
    if (status === "correct"){
        $("#quiz").html("<h3 class='image'>" + "Correct!" + "</h3>" + "<img src='"+ images[currentQuestion]+ "'>");
    } else if(counter === 0){
        $("#quiz").html("<h3 class='image'>" + "Out of time!" + "</h3>" + "<h4>" + "The correct answer was: " + correctAnswer + "</h4>" + "<img src='"+ images[currentQuestion]+ "'>");
    } else {
        $("#quiz").html("<h3 class='image'>" + "Wrong!" + "</h3>" + "<h4>" + "The correct answer was: " + correctAnswer + "</h4>" + "<img src='"+ images[currentQuestion]+ "'>");
    }
}

$("#start").click(function(){
    $("#start").remove();
    $("#time").html(counter);
    startGame();
});