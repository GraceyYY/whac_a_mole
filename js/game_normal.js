window.onload = function() {
  const moles = document.querySelectorAll('.mole');
  const scoreBoard = document.getElementById('score');
  const startBtn = document.getElementById('start_btn');
  const game = document.getElementById('game');
  let titleH1 = document.getElementById('title');
  let lastHole, currentMole, chosenHole, clearMole;
  let timeUp = false;
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
    genMoleRandomly(genRandomNum(1, 6), genRandomNum(500, 1200));
    setTimeout(() => {
      timeUp = true;
      endGamePage();
      stopShowingMole();
    }, gameTime);
  }

  function showMole(hole) {
    $(`.hole${hole}`).toggleClass('up', true);
    lastHole = hole;
    currentMole = document.querySelector(`.hole${hole}`).childNodes[1];
  }

  function disappearMole() {
    $('.up').toggleClass('up', false);
  }

  function genMoleRandomly(hole, time) {
    if (!timeUp) {
      while (hole === lastHole) {
        hole = genRandomNum(1, 6);
      }
      showMole(hole);
      clearMole = setTimeout(() => {
        disappearMole();
        genMoleRandomly(genRandomNum(1, 6), genRandomNum(500, 1200));
      }, time);
    }
  }

  function updateScores() {
    scoreBoard.innerText = score;
  }

  function hitMole() {
    clearTimeout(clearMole);
    disappearMole();
    addScores();
    genMoleRandomly(genRandomNum(1, 6), genRandomNum(500, 1200));
  }

  function endGamePage() {
    titleH1.innerText = 'TIME UP!';
    start_btn.innerText = 'Replay!';
    startBtn.style.display = 'inline-block';
  }

  function resetPageAndScore() {
    titleH1.innerText = 'WHACK-A-MOLE!';
    score = 0;
    timeUp = false;
    updateScores();
  }

  function stopShowingMole() {
    clearTimeout(clearMole);
    disappearMole();
  }
  moles.forEach((mole) => {
    mole.addEventListener('click', (e) => {
      if (e.target === currentMole) {
        hitMole();
      }
      updateScores();
    })
  })
};
let score = 0;

function addScores() {
  return score += 1;
}

function genRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}