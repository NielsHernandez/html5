'use strict';

//query selector help to get the dom element using css selector

let gameMessage = document.querySelector(".message");
let resultNumber = document.querySelector('.number');
let scoreNumber =document.querySelector('.score');
let guessNumber = document.querySelector('.guess');
let btnGuess = document.querySelector('.check');

//console.log(gameMessage.textContent);

//set value to the text content using textContent on regular elements

//gameMessage.textContent = '🎉 Corret Number!';
// resultNumber.textContent = 15;
// scoreNumber.textContent = 15;
// guessNumber.value = 10;


//generate the random number using Math

let secretNumber = Math.trunc(Math.random() * 20)+1;

// initialia variable 

let startScore = 20;
let highScore = 0;
//add a listener for the click event and log to the console the value of the element


btnGuess.addEventListener('click',() => {

    const guesedNumber = Number(guessNumber.value);

   

    if(!guesedNumber){

        console.log(guesedNumber, typeof guesedNumber);
        gameMessage.textContent = '🚫 not number';
    }else if(guesedNumber===secretNumber){

        document.querySelector('body').style.backgroundColor = '#60b347';
        resultNumber.style.width = '30rem';
      
        gameMessage.textContent = '🎉 Corret Number!';
        resultNumber.textContent = secretNumber;

        if(startScore >highScore){
            highScore=startScore;
            document.querySelector('.highscore').textContent = highScore;
        }
    }else if(guesedNumber !== secretNumber){
        startScore--;
        gameMessage.textContent = guesedNumber>secretNumber ? 'too high!':'too low!';
        // scoreNumber.textContent = startScore;
        activeGame(startScore,gameMessage,scoreNumber);
    }

    // else if(guesedNumber < secretNumber){
    //     startScore--;
    //     gameMessage.textContent = 'too low!';
    //     // scoreNumber.textContent = startScore;
    //     activeGame(startScore,gameMessage,scoreNumber);
    // }

  //se minimizo la cantidad de codigo cambiando >, < que por un differnte que porque era aplicable y se uso el ternary operator
    

})


function activeGame(currentScore, gameMessage, scoreNumber){

    if(currentScore>0){

        scoreNumber.textContent = startScore;

    }else{

        gameMessage.textContent = 'Game Over!';
        scoreNumber.textContent = 0;

    }
      
   

}
// function to reset the game dom element btn
document.querySelector('.again').addEventListener('click', () => {

    secretNumber = Math.trunc(Math.random() * 20)+1;
    resultNumber.textContent = '?';
    gameMessage.textContent = "Start guessing...";
    guessNumber.value = '';
    startScore = 20;
    scoreNumber.textContent = startScore;
    document.querySelector('body').style.backgroundColor = '#222';
    resultNumber.style.width = '15rem';

})