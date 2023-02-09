
let gamePattern = [];
let userClickedPattern = [];
let buttonColours=['red', 'blue', 'green', 'yellow'];

let gameStat =false;

let level = 0;

function nextSequence() {
    userClickedPattern = [];
    $('h1').text('Level ' + level);
    level++;
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  
  console.log(gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//   $('#' + randomChosenColour).animate({opacity: '0.5'}, 'fast');
  
    playSound (randomChosenColour);
}
$('.btn').click(function(event){
    userChosenColour = event.delegateTarget.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern[userClickedPattern.length - 1]);

    playSound (userChosenColour);
    animatePress (userChosenColour);
    checkAnswer();
    // userChosenColour = 
    
});

function playSound(name) {
    var audio = new Audio('sounds/'+ name + '.mp3');
      audio.play();
};

function animatePress(currentColour) {
    $('.' + currentColour).addClass('pressed');

    setTimeout( function(){
        $('.' + currentColour).removeClass('pressed')}, 100);
};


$(document).keypress(function(){
    if(!gameStat){
        nextSequence();
        
    }
    
    gameStat = true;
});


function checkAnswer(currentLevel) {
    if(gamePattern[gamePattern.length - 1]== userClickedPattern[userClickedPattern.length - 1]){
        let currentSequence = userClickedPattern.length;
        if(currentSequence ){
            setTimeout(function(){
                if (currentSequence == userClickedPattern.length) {
                    nextSequence();
                }else{
                    checkAnswer();
                }                ;

            }, 1000);

        };
    } else {
        wrong();
        startOver();
        console.log('wrong');
    }
}


function wrong(){
    playSound('wrong');
    $('body').addClass('game-over');

    setTimeout( function(){
        $('body').removeClass('game-over')}, 200);

        $('h1').text('Game Over, Press Any Key to Restart');
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStat = false;
}


// nextSequence();
// $('#' + randomChosenColour).click(() => {
//     console.log('clicked' + randomChosenColour);
//     $('#' + randomChosenColour).addClass('pressed');
//     // setTimeout($('#' + randomChosenColour).removeClass('pressed'), 10000);
// });