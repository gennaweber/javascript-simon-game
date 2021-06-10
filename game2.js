var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

function playSound(value) {
  switch (value) {
  case "blue":
    var blueSound = new Audio("sounds/blue.mp3");
    blueSound.play();
    break;

  case "green":
    var greenSound = new Audio("sounds/green.mp3");
    greenSound.play();
    break;

  case "yellow":
    var yellowSound = new Audio("sounds/yellow.mp3");
    yellowSound.play();
    break;

  case "red":
    var redSound = new Audio("sounds/red.mp3")
    redSound.play();
    break;

  default:
    blueSound.play();
  }
}

function animatePress(currentColour) {
  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");

  setTimeout(function () {
  activeButton.removeClass("pressed");
  }, 100);
}

//start after one keypress
$(document).one("keypress", nextSequence);

//manually call nextSequent with spacebar
$(document).keypress(event, function (){
  if (event.key === " ") {
    nextSequence();
  }
});


function nextSequence() {
level++;
$("#level-title").text("Level " + level);

//determine random color
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];



  //push random color into sequence
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);


  gamePattern.forEach(flashColor);

//play sound for color in sequence
  gamePattern.forEach(playSound);

// return level;
};

function flashColor (value){

    //flash chosen flashColor
    $("#" + value).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

};


$(".btn").click(function trackClick() {

  console.log("click");
  //only works if game started
  if (level >= 1) {

  //get id of button pressed
  var userChosenColour = $(this).attr("id");

  //play sound of color picked
  playSound(userChosenColour);

  //animate button clicked
  animatePress(userChosenColour);

  //add clicked color to array
  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);
  checkAnswer();

  }

});

// function checkAnswer() {
//
//   for (i = 0; i < gamePattern.length; i++) {
//     console.log(i);
//     console.log(userClickedPattern.length);
//     console.log(gamePattern.length);
//     console.log(userClickedPattern[i]);
//     console.log(gamePattern[i]);
//     }
//   }
