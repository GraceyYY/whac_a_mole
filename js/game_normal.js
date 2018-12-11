window.onload = function() {
  const scoreBoard = document.getElementById('score');
  const startBtn = document.getElementById('start_btn');
  const game = document.getElementById('game');
  let titleH1 = document.getElementById('title');
  let lastHole, chosenHole, clearMole;
  let timeUp = false;
  let score = 0;
  let gameTime = 10000;
  startBtn.addEventListener('click', function() {
    showBtnAnimation();
    startGame();
  }, false);

  function showBtnAnimation() {
    event.preventDefault();
    startBtn.classList.add('animate');
    setTimeout(() => {
      startBtn.classList.remove('animate');
      startBtn.style.display = 'none';
    }, 700);
  }

  function startGame() {
    resetPageAndScore();
    genMoleRandomly(genRandomNum(1, 6), genRandomTime(500, 1200));
    setTimeout(() => {
      timeUp = true;
      endGamePage();
      stopShowingMole();
      return timeUp;
    }, gameTime);
  }

  function genRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function genRandomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function showMole(hole) {
    $(`.hole${hole}`).toggleClass('up', true);
    lastHole = hole;
  }

  function disappearMole() {
    $('.up').toggleClass('up', false);
  }

  function genMoleRandomly(hole, time) {
    if (!timeUp) {
      while (hole === lastHole){
        hole = genRandomNum(1,6);
      }
      showMole(hole);
      clearMole = setTimeout(() => {
        disappearMole();
        genMoleRandomly(genRandomNum(1, 6), genRandomTime(500, 1200));
      }, time);
    } else {
      return null;
    }
  }

  function addScores() {
    scoreBoard.innerText = parseInt(scoreBoard.innerText) + 1;
  }

  function hitMole() {
    if (chosenHole) {
      clearTimeout(clearMole);
      disappearMole();
      addScores();
      genMoleRandomly(genRandomNum(1, 6), genRandomTime(500, 1200));
    } else {
      return null;
    }
  }

  function endGamePage() {
    titleH1.innerText = 'TIME UP!';
    start_btn.innerText = 'Replay!';
    startBtn.style.display = 'inline-block';
  }

  function resetPageAndScore() {
    titleH1.innerText = 'WHACK-A-MOLE!';
    scoreBoard.innerText = '0';
    timeUp = false;
  }

  function stopShowingMole() {
    clearTimeout(clearMole);
    disappearMole();
  }
  game.addEventListener('click', (event) => {
    chosenHole = event.target.parentNode.getAttribute('class').split(' ')[2];
    hitMole();
  });
};