'use strict'

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const currentEl0 = document.querySelector('#current--0');
const currentEl1 = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceImg = document.querySelector('.dice');

let activePlayer, currentScore, score, playing;

const init = function() {
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;

    currentEl0.textContent = 0;
    currentEl1.textContent = 0;

    diceImg.classList.add('hidden');

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    player1.classList.remove('player--active');
    player0.classList.add('player--active');

}

init();


const switchPlayer = function() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};



  

btnRoll.addEventListener('click', () => {
    if (!playing) return; 

    const randomNum = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${randomNum}.png`;

    randomNum !== 1
    ? (currentScore += randomNum, document.querySelector(`#current--${activePlayer}`).textContent = currentScore)
    : switchPlayer();
});




btnHold.addEventListener('click', () => {
    if (!playing) return

    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];
    document.querySelector(`#current--${activePlayer}`).textContent = 0;


    if (score[activePlayer] >= 20) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`#current--${activePlayer}`).textContent = 'WINNER';
        diceImg.classList.add('hidden');
        playing = false;

        return;
    }

    switchPlayer();
});



btnNew.addEventListener('click', init);

