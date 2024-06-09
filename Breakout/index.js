const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20 
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20 
let score = 0 
let timerId 
let xDirection = 2 
let yDirection = 2 


const userStart = [230,10]
let currentPosition = userStart 

const ballStart = [270,40]
let currentPositionBall = ballStart


class block 
{
    constructor(xAxis,Yaxis){
        this.bottomLeft = [xAxis,Yaxis]
        this.bottomRight = [xAxis + blockWidth, Yaxis]
        this.TopLeft = [xAxis , Yaxis + blockHeight]
        this.TopRight = [xAxis + blockWidth, Yaxis + blockHeight]
    }
}

const blocks = [
    new  block(10,270),
    new  block(120,270),
    new  block(230,270),
    new  block(340,270),
    new  block(450,270),
    new  block(10,240),
    new  block(120,240),
    new  block(230,240),
    new  block(340,240),
    new  block(450,240),
    new  block(10,210),
    new  block(120,210),
    new  block(230,210),
    new  block(340,210),
    new  block(450,210),
]

function addBlock ()
{
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlock()  

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}


function moveUser(e){
     switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0 ) {
                currentPosition[0] -= 10 
                drawUser()
                break;
            }
            

        case 'ArrowRight' :
            if(currentPosition[0] < 460 ){
                currentPosition[0] += 10 
                drawUser()
                break; 
            }
            

     }
}

document.addEventListener('keydown' ,moveUser)


function drawBall(){
    ball1.style.left = currentPositionBall[0] + 'px'
    ball1.style.bottom = currentPositionBall[1] + 'px'
}


const ball1 = document.createElement('div')
ball1.classList.add('ball')
drawBall()
grid.appendChild(ball1)



function moveBall(){
    currentPositionBall[0] += xDirection 
    currentPositionBall[1] += yDirection 
    drawBall()
    collisions()
}

timerId = setInterval(moveBall,30)


function collisions(){

    // check for collisions 

    for(let i = 0; i < blocks.length; i++)
    {
        if((currentPositionBall[0] > blocks[i].bottomLeft[0] && currentPositionBall[0] < blocks[i].bottomRight[0]) && ((currentPositionBall[1] + ballDiameter) > blocks[i].bottomLeft[1] && currentPositionBall[1] < blocks[i].TopLeft[1]) ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()
            score ++ 
            scoreDisplay.innerHTML = score
            // check for win 
            if(blocks.length === 0 ){
                scoreDisplay.innerHTML = 'YOU WIN'
                clearInterval(timerId)
                document.removeEventListener('keydown',moveUser)
            }
        }
    }

    
    if (currentPositionBall[0] >= (boardWidth - ballDiameter) || 
    currentPositionBall[1] >=  (boardHeight - ballDiameter)||
    currentPositionBall[0] <= 0 ){
        changeDirection()
    }

    // Check for user collision 
    if ((currentPositionBall[0] > currentPosition[0] && currentPositionBall[0] < currentPosition[0] + blockWidth) && (currentPositionBall[1] > currentPosition[1] && currentPositionBall[1] < currentPosition[1] + blockHeight))
    {
        changeDirection()

    }
 
    // Check for Game over 
    if (currentPositionBall[1] <= 0 )
    {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You Loose'
        document.removeEventListener('keydown',moveUser)
    }
}

function changeDirection(){
    if(xDirection === 2 && yDirection === 2 ){
        yDirection = -2
        return 
    }

    if(xDirection === 2 && yDirection === -2 ){
        xDirection = -2 
        return 
    }
    if(xDirection === -2 && yDirection === -2 ){
        yDirection = 2
        return 
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2 
        return 
    }


}