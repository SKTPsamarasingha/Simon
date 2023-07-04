const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let clickedPattern = [];
let start = false;
let level = 0;

$(document).on('keydown', () => {
  if (!start) {
    $('#level-title').text('levels ' + level);
    nextSequence();
    start = true;
  }
});

$('.btn').on('click', (e) => {
  const userColor = e.currentTarget.id;
  clickedPattern.push(userColor);

  playSound(userColor);
  animatePress(userColor);
  checkAnswer(clickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === clickedPattern[currentLevel]) {
    if (gamePattern.length === clickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');

    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);

    $('#level-title').text('Game Over, Press Any Key to Restart');

    startOver();
  }
}

function nextSequence() {
  clickedPattern = [];
  level++;
  $('#level-title').text("level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  $('#' + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
}

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $('.btn').on('click', () => {
    $(`#${currentColor}`).addClass('pressed');

    setTimeout(() => {
      $(`#${currentColor}`).removeClass('pressed');
    });
  });
}

function startOver() {
 level = 0;
 gamePattern = []
 start  = false
}
