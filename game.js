var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;
// var wrongSound = new Audio("sounds/wrong.mp3");
//
// function playSound(value) {
//   switch (value) {
//     case "blue":
//       var blueSound = new Audio("sounds/blue.mp3");
//       blueSound.play();
//       break;
//
//     case "green":
//       var greenSound = new Audio("sounds/green.mp3");
//       greenSound.play();
//       break;
//
//     case "yellow":
//       var yellowSound = new Audio("sounds/yellow.mp3");
//       yellowSound.play();
//       break;
//
//     case "red":
//       var redSound = new Audio("sounds/red.mp3")
//       redSound.play();
//       break;
//
//     default:
//       blueSound.play();
//   }
// }

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");

  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}

//start after one keypress
$(document).keypress( function () {
  if (!started) {
    play();
    started = true;
  }
});


//manually call nextSequent with spacebar
// $(document).keypress(event, function() {
//   if (event.key === " ") {
//     play();
//   }
// });

function nextLevel() {
  level++;
  $("#level-title").text("Level " + level);
}

function nextSequence() {
  //determine random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  //push color to array
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function play() {
  started = true;
  nextLevel();
  nextSequence();
}

$(".btn").click(function () {
  //only works if game started
  if (started === true) {
  //get id of button pressed
  var userChosenColour = $(this).attr("id");
  //play sound of color picked
  playSound(userChosenColour);
  //animate button clicked
  animatePress(userChosenColour);
  //add clicked color to array
  userClickedPattern.push(userChosenColour);
  //check answer
  checkAnswer(userClickedPattern.length - 1);

  }

});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout( function () {
        play()
      }, 1000);
      userClickedPattern = [];
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout( function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
