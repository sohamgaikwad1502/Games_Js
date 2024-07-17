const container =  document.querySelector('.container');
const results = document.querySelector('.results');
const scores = document.querySelector('.score');




for(let i = 0 ; i < 225; i++)
{
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
    
}

const squares = document.querySelectorAll('.square');

const invaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39 
];

let shooterIndex = 202;
width = 15;
let direction = 1 ;
let interval;
let cleared = new Set();

function draw_invaders()
{
    for(let square = 0 ; square < invaders.length ; square++)
    {
        if(!(cleared.has(square)))
        {
            
            squares[invaders[square]].classList.add('invader');
        }
    }

    
        
    
}

function check_win()
{
    console.log(cleared);
    if(cleared.size >= 31) 
    {

        clearInterval(interval);
        results.innerHTML = "You Win!!";
    }
}

draw_invaders();
squares[shooterIndex].classList.add('shooter');
function moveShooter(e)
{
    squares[shooterIndex].classList.remove('shooter');
    switch(e.key)
    {
        case 'ArrowLeft':
            if(shooterIndex % width !== 0 ) shooterIndex--
            break;
        case 'ArrowRight' :
            if(shooterIndex % width < width - 1) shooterIndex++
            break;
    }
    squares[shooterIndex].classList.add('shooter');
    
}



function moveInvaders()
{
    
    for(let i = 0 ; i < invaders.length ; i++)
    {
        
        squares[invaders[i]].classList.remove('invader')
        if (direction === 1 )
            invaders[i] += 1;
        else 
            invaders[i] -= 1; 

        if(squares[invaders[i]].classList.contains('shooter') || invaders[invaders.length -1] === 224)
        {
            if( invaders[invaders.length -1] === 224)
            {
                draw_invaders();
                clearInterval(interval);
                results.innerHTML = "Game Over!!!";
                return;
            }

            clearInterval(interval);
            results.innerHTML = "Game Over!!!";
            
        }

    
    }


    const rightEdge = (invaders[invaders.length -1] + 1) % width === 0 ;
    const leftEdge  = invaders[0] % width === 0;

    if(rightEdge || leftEdge)
    {
        if (rightEdge)
            direction = 0 ;
        else
            direction = 1;

        for(let i = 0 ; i < invaders.length ; i++)
        {
            invaders[i] +=  15;
        }
            
    }
    draw_invaders();
    check_win();
}

function shoot(e) 
{
    let shootIndx = shooterIndex;
    let bullet_call;

    if(e.key == 'ArrowRight' || e.key == 'ArrowLeft')
        bullet_call = setInterval(column_shoot,200);

    function column_shoot()
    {
        
        if(shootIndx - width  > 0  )
        {
            squares[shootIndx].classList.remove('bullet');
            shootIndx -= width;
            squares[shootIndx].classList.add('bullet'); 
        
        }
        if (shootIndx - width <= 0  || squares[shootIndx].classList.contains('invader')  )
            {
                squares[shootIndx].classList.remove('bullet');
                cleared.add(invaders.indexOf(shootIndx));
                draw_invaders();
                clearInterval(bullet_call);
                
    
            }
        
    }

    
}



const button = document.querySelector('.start');
button.addEventListener('click',()=>
{
    document.addEventListener('keydown',moveShooter);
    document.addEventListener('keydown',shoot);
    interval = setInterval(moveInvaders,600);
    button.disable = true;
});

