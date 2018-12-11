window.onload = function() {
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.getElementById('score');
  const moles = document.querySelectorAll('.mole');
  const startBtn = document.getElementById('start_btn');
  const game = document.getElementById('game');
  let titleH1 = document.getElementById('title');
  let lastHole, chosenHole, clearMole, clearMoleAfterHit;
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
    // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
    setTimeout(() => {
      startBtn.classList.remove('animate');
      startBtn.style.display = 'none';
    }, 700);
  }

  function startGame() {
    // TODO: 写开始新游戏后发生的事
    resetPageAndScore();
    genMoleRandomly(genRandomNum(1,6), genRandomTime(500,1200));
    setTimeout(() => {
      timeUp = true;
      endGamePage();
      stopShowingMole();
      return timeUp;
    }, gameTime);
  }

  function genRandomNum(min, max) {
    return Math.round(Math.random() * (max-min) + min);
  }

  function genRandomTime(min, max) {
    return Math.round(Math.random() * (max-min) + min);
  }

  function showMole(hole) {
    lastHole = `.hole${hole}`;
    $(lastHole).toggleClass('up', true);
  }

  function disappearMole() {
    $(lastHole).toggleClass('up', false);
  }

  function genMoleRandomly(hole, time) {
    if (!timeUp) {
      showMole(hole);
      clearMole = setTimeout(function() {
        disappearMole();
        genMoleRandomly(hole, time);
      }, time);
    } else {
      return null;
    }
  }

  function addScores() {
    scoreBoard.innerText = parseInt(scoreBoard.innerText) + 1;
  }

  function hitMole() {
    if (chosenHole === lastHole.slice(1)) {
      clearTimeout(clearMole);
      disappearMole();
      addScores();
      clearMoleAfterHit = setTimeout(function() {
        genMoleRandomly(genRandomNum(1,6),genRandomTime(500,1200));
      }, 400)
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
    clearTimeout(clearMoleAfterHit);
    disappearMole();
  }
  game.addEventListener('click', function(event) {
    chosenHole = event.target.parentNode.getAttribute('class').split(' ')[1];
    hitMole();
  });
};