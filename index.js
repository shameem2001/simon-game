var gamePattern=[];
var userClickedPattern=[];
var randomNumber;
var level=0;
var started=false;
var buttonColours=["red","blue","green","yellow"];

  $(document).on("keypress",function(event){
      if(started!==true){
      startOver();
      started=true;
      nextSequence();
    }
  });




function nextSequence(){
  randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  audio.play();
  level++;
  $("#level-title").text("Level "+level);
}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);// or this.id;
  checkAnswer(userClickedPattern.length-1);
  playSound(userChosenColour);
});


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100)
}

function checkAnswer(currentLevel){
  console.log(gamePattern);
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){ nextSequence(); }, 1000);
        userClickedPattern=[];
      }
    }
    else{
      started=false;
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game over!! Press any key to restart...");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },1000);
    }
}

function startOver(){
  level=0,
  gamePattern=[];
  userClickedPattern=[];
  started=false;
  $("#level-title").text("Press A Key to Start");
}
