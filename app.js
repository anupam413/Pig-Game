/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundscore,activePlayer,gamePlaying,prevDice;


function init(){
    gamePlaying = true;
    roundscore = 0;
    scores=[0,0];
    activePlayer = 0;
    
    // Query selector to change the CSS
    document.getElementById("dice-1").style.display = 'none';
    document.getElementById("dice-2").style.display = 'none';


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');


}
init();

//document.querySleector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//Use QuerySelector for reading only
//var x = document.querySelector('#score-' + activePlayer).textContent ;
//console.log(x);



document.querySelector('.btn-roll').addEventListener('click',function(){
    
    if (gamePlaying){
        //random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        //display the result
        //var diceDOM = document.querySelector('.dice');
        
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        //diceDOM.style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        if (dice1 != 1 && dice2 != 1) {
             roundscore += dice1 + dice2;
             document.querySelector('#current-' + activePlayer).textContent = roundscore; 
         }else{
             nextPlayer(); 
         }   


        // //update the round score if the rolled number was not the 1
        // if(dice === 6 && prevDice === 6){
        //     //player losed score
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //     nextPlayer();
        // }
        // else if (dice != 1){
        //     roundscore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundscore; 
        // }else{
        //     nextPlayer(); 
        // }   
        // //saving the previous roll after operation
        // prevDice = dice; 
    }
 
});

document.querySelector('.btn-hold').addEventListener('click' , function(){
    if (gamePlaying){
        //add current score to the global score

        scores[activePlayer] += roundscore;

        //update the UI

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        if (input != NaN){
            winningScore = input;
        }else{
            winningScore = 100;
        }

        //check if player won the game

        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER';
            document.querySelector('.dice1').style.display = "none";
            document.querySelector('.dice2').style.display = "none";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            // Next Player
            nextPlayer();
        }

    }

});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundscore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click',init);












