// Record Pattern

var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;

var buttonColors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "black", "white"];

// Create Sequence

// Detect Keypress to start game

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        started = true;
        nextSequence();
    }
});

function nextSequence() {

    userClickPattern = [];

    // increment level

    level++;
    $("#level-title").text("Level " + level);

    // Choose next tile

    var next = Math.floor(Math.random() * 9);

    var randomChosenColor = buttonColors[next];
    gamePattern.push(randomChosenColor);

    // Show Sequence to User with animations and sounds

    animatePress(randomChosenColor);
    playSound(randomChosenColor);


}

// Record User input and play noise

$(".btn").on("click", function () {
    var userChosenColor = this.id;
    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickPattern.length - 1);
});

// check answer sequence

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickPattern.length === gamePattern.length) {
            userClickPattern = [];
            setTimeout(nextSequence, 1000);
        }

    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// Animation

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// play Sound

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// function to start over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}