window.onload = function() {
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.getElementById('score');
  const moles = document.querySelectorAll('.mole');
  const startBtn = document.getElementById('start_btn');
  const game = document.getElementById('game');
  let titleH1 = document.getElementById('title');
  let lastHole, clearMole, chosenHole;
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
    titleH1.innerText = 'WHACK-A-MOLE!';
    genMoleRandomly();
    hitMole();
  }

  function genRandomNum() {
    return Math.round(Math.random() * 5 + 1);
  }

  function genRandomTime() {
    return Math.round(Math.random() * 1000 + 400);
  }

  function showMole() {
    lastHole = `.hole${genRandomNum()}`;
    $(lastHole).toggleClass('up', true);
  }

  function disappearMole() {
    $(lastHole).toggleClass('up', false);
  }

  function genMoleRandomly() {
    showMole();
    clearMole = setTimeout(function() {
      disappearMole();
      genMoleRandomly();
    }, genRandomTime());
  }

  function addScores() {
    scoreBoard.innerText = parseInt(scoreBoard.innerText) + 1;
  }

  function hitMole() {
    game.addEventListener('click', function(event) {
      chosenHole = event.target.parentNode.getAttribute('class').split(' ')[1];
      if (chosenHole === lastHole.slice(1)) {
        clearTimeout(clearMole);
        disappearMole();
        addScores();
        setTimeout(function() {
          genMoleRandomly();
        }, 400)
      }
    })
  }

  function endGame(){
    titleH1.innerText = 'TIME UP!';
    start_btn.innerText = 'Replay!';
  }
};