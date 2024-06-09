const gridDisplay = document.querySelector('#grid')

function createGrid(){
    for(let i = 1 ; i <= 9; i++){
        let div_inside_div = document.createElement('div')
        div_inside_div.setAttribute('class','square')
        div_inside_div.setAttribute('id',i)
        gridDisplay.append(div_inside_div)
    }

}
createGrid()

const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const TimeLeft =document.querySelector('#time-left')
const score = document.querySelector('#Score1')

let result = 0
let hitposition
let currentTime = 60  
let timerId = null

function randomSquares()
{
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomPosition = squares[Math.floor(Math.random() * 9)] 
    randomPosition.setAttribute('class','square mole')

    hitposition = randomPosition.id 
}


squares.forEach(square =>{
    square.addEventListener('mousedown',()=> {
        if(square.id == hitposition){
            result++
            score1.textContent = result
            hitposition = null 
        }
    })  
})

function moveMole(){
    
    timerId = setInterval(randomSquares,500)
}


moveMole()

function countDown(){
    currentTime--
    TimeLeft.textContent = currentTime

    if(currentTime == 0 ){
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert("Game Over ! Your Final Score is " + result)
        
    }
}

let countDownTimerId = setInterval(countDown , 1000)