const computerchoiceDisplay= document.getElementById("computer_choice")
const userchoiceDisplay = document.getElementById("your_choice")
const result = document.getElementById("result")
const possiblechoices = document.querySelectorAll("button")

let userchoice 

possiblechoices.forEach(possiblechoice => possiblechoice.addEventListener('click',(e) =>{
    userchoice = e.target.id 
    userchoiceDisplay.innerHTML = userchoice
    generateComputerChoice()
    result1()
}))

let computerChoice
function generateComputerChoice(){
    const randomNumber = Math.floor(Math.random() * 3) + 1
    if (randomNumber === 1 ){
        computerChoice = 'rock'
    }
    else if(randomNumber === 2){
        computerChoice = 'scissor'
    }
    else {
        computerChoice = 'paper'
    }

    computerchoiceDisplay.innerHTML = computerChoice
}

function result1(){
    if(computerChoice === userchoice){
        result.innerHTML = "Draw"
    }

    else {
        if (computerChoice === "paper" && userchoice == "rock")
        {
            result.innerHTML = "computer Win"
        }
        if(computerChoice === "rock" && userchoice == "paper") {
            result.innerHTML = "You Win"   
        }

        if (computerChoice === "rock" && userchoice == "scissor")
        {
            result.innerHTML = "computer Win"
        }
        if (computerChoice === "scissor" && userchoice == "rock"){
            result.innerHTML = "You Win"   
        }

        if (computerChoice === "scissor" && userchoice == "paper")
        {
            result.innerHTML = "computer Win"
        }
        if (computerChoice === "paper" && userchoice =="scissor" ) {
            result.innerHTML = "You Win"   
        }
    }
    

}