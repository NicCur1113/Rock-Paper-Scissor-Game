/*rock: https://images.emojiterra.com/twitter/v13.1/512px/1faa8.png
paper: https://hotemoji.com/images/dl/p/page-facing-up-emoji-by-twitter.png
scissors: https://images.emojiterra.com/twitter/v13.1/512px/2702.png
*/

const rockBttn = document.querySelector(".rock");
const paperBttn = document.querySelector(".paper");
const scissorBttn = document.querySelector(".scissors");

const bttns = document.querySelectorAll(".bttn");

const playerEmoji = document.querySelector(".playerEmoji");
const compEmoji = document.querySelector(".compEmoji");

const elements = {

    "rock": "https://images.emojiterra.com/twitter/v13.1/512px/1faa8.png",
    "paper": "https://hotemoji.com/images/dl/p/page-facing-up-emoji-by-twitter.png",
    "scissors": "https://images.emojiterra.com/twitter/v13.1/512px/2702.png"
}

// inital values
let player_value = ''
let comp_value = ''

let playerPoint = 0;
let compPoint = 0;

let round = 0; // current round
let max = 3; // amount of rounds 

rockBttn.addEventListener("mousedown", newGame);
paperBttn.addEventListener("mousedown", newGame);
scissorBttn.addEventListener("mousedown", newGame);

function newGame(){
        
    if(this.value in elements){
        player_value = this.value;
        playerEmoji.src = elements[this.value];
        console.log(`player value: ${player_value}`) // returns player value
    }
        // is set to timeout because if there is no delay, then the points will be coming on from the last time.
        setTimeout(
            function(){
            
                function compMove(playerMove){
                    function decide(){ // decide function to utilize in decision tree.
                        let element_keys = Object.keys(elements)
                        let decision = element_keys[element_keys.length * Math.random() << 0]
                        compEmoji.src = elements[decision];
                        comp_value = decision;
                    }

                    if(playerMove.length > 0){
                        if(playerMove === "rock"){
                            decide();
                        }
                        else if(playerMove === "paper"){
                            decide();
                        }
                        else if(playerMove === "scissors"){
                            decide();
                        }
                    }
                   
                }
                    // general way //
                 /* let element_keys = Object.keys(elements);
                    comp_value = element_keys[element_keys.length * Math.random() << 0]; // randomly selects an element from the list.
                    let comp_result = elements[comp_value];
                    if(player_value.length !== ""){
                        compEmoji.src = comp_result;
                        console.log(`computer value: ${comp_value}`); // returns computer value
                    }}*/
    
                compMove(player_value);

                console.log(comp_value);

                // Clears everything when the Play Again button is triggered.
                document.querySelector('.playAgain').addEventListener("click", ()=>{
                        round = 0; 
                        playerPoint = 0; 
                        compPoint = 0;
                        player_value = ''
                        comp_value = ''
                        document.querySelector('.playAgain').style.opacity = 0;
                        playerEmoji.src = "", compEmoji.src = "";
                        document.querySelector(".announceWinner").innerHTML = "";
                        document.querySelectorAll(".bttn").forEach((bttn)=>{
                            bttn.disabled = false;
                        })
                    })
    
                // rules of the game. 
                if (player_value === comp_value){
                    console.log("Tie");
                    compPoint, playerPoint += 0;    
                }
                else if (player_value == "rock" && comp_value == "paper"){
                    compPoint += 1;
                    round += 1;
                }
                else if (player_value == "scissors" && comp_value == "paper"){
                    playerPoint += 1;
                    round += 1;
                }
                else if (player_value == "paper" && comp_value == "scissors"){
                    compPoint += 1;
                    round += 1;
                }
                else if (player_value == "scissors" && comp_value == "rock"){
                    compPoint += 1;
                    round += 1;
                }
                else if (player_value == "paper" && comp_value == "rock"){
                    playerPoint += 1
                    round += 1;
                }
                else if (player_value == "rock" && comp_value == "scissors"){
                    playerPoint += 1;
                    round += 1;
                }
        
            }, 5);

            function decideWinner(){
                if(round === max){
                    document.querySelectorAll(".bttn").forEach((bttn)=>{
                        bttn.disabled = true;
                    })
                    if(playerPoint > compPoint ){
                        document.querySelector(".announceWinner").style.color = "#45e91c";
                        document.querySelector(".announceWinner").innerHTML = "Player wins!";

                    }
                    else if (compPoint > playerPoint){
                        document.querySelector(".announceWinner").style.color = "#f73650";
                        document.querySelector(".announceWinner").innerHTML = "Computer wins!";
                    }
                }
            }
            decideWinner()

            function playAgain(){
                if(round >= max){
                    document.querySelector('.playAgain').style.opacity = 1;
                }
            }

            playAgain();

            document.querySelector(".roundNumber").innerHTML = `${round}`;
            document.querySelector('#score-comp').innerHTML = `Computer: ${compPoint}`;
            document.querySelector('#score-player').innerHTML = `Player: ${playerPoint}`;
};


