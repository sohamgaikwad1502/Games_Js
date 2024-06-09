const cardarray = [

    {
        name: "fries",  
        img : "images/fries.png",
    },

    {
        name: "cheeseburger",  
        img : "images/cheeseburger.png",
    },

    {
        name: "hotdog",  
        img : "images/hotdog.png",
    },

    {
        name: "ice-cream",  
        img : "images/ice-cream.png",
    },

    {
        name: "milkshake",  
        img : "images/milkshake.png",
    },

    {
        name: "pizza",  
        img : "images/pizza.png",
    },


    {
        name: "fries",  
        img : "images/fries.png",
    },

    {
        name: "cheeseburger",  
        img : "images/cheeseburger.png",
    },
    
    {
        name: "hotdog",  
        img : "images/hotdog.png",
    },

    {
        name: "ice-cream",  
        img : "images/ice-cream.png",
    },

    {
        name: "milkshake",  
        img : "images/milkshake.png",
    },

    {
        name: "pizza",  
        img : "images/pizza.png",
    }
]

cardarray.sort(() => 0.5 - Math.random)
  
const gridDisplay = document.querySelector("#grid")
const result = document.querySelector('#result')
let  cardchosen = []
let cardChosenIds = []  
const cardsWon = [] 

function createBoard(){
    for (let i = 0 ; i < cardarray.length ; i++){
        const card = document.createElement('img')
        card.setAttribute('src','images/blank.png')
        card.setAttribute('data-id', i) 
        card.addEventListener('click',flipcard)
        gridDisplay.append(card)
    }
}

createBoard()

function checkMatch(){
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardChosenIds[0] 
    const optionTwoId = cardChosenIds[1]

    if (optionOneId === optionTwoId){
        cards[optionOneId].setAttribute('src','images/blank.png')
        cards[optionTwoId].setAttribute('src','images/blank.png')
        alert('You choose The Same Card')
    }
    
    if (cardchosen[0] == cardchosen[1]){
        cards[optionOneId].setAttribute('src','images/white.png')
        cards[optionTwoId].setAttribute('src','images/white.png')
        cards[optionOneId].removeEventListener('click',flipcard)
        cards[optionTwoId].removeEventListener('click',flipcard)
        cardsWon.push(cardchosen)
    }
    
    else {
        cards[optionOneId].setAttribute('src','images/blank.png')
        cards[optionTwoId].setAttribute('src','images/blank.png')
        alert('Sorry try Again !!')
    }
    result.innerHTML = cardsWon.length
    cardchosen = []
    cardChosenIds = []
     
    if(cardsWon.length == cardarray.length/2){
        result.innerHTML = "Congratulations You Found Them All"
    }
    
     
}

function flipcard(){
    let cardId = this.getAttribute('data-id')
    cardchosen.push(cardarray[cardId].name)
    cardChosenIds.push(cardId)
    this.setAttribute('src',cardarray[cardId].img)
    if (cardchosen.length === 2 ){
        setTimeout(checkMatch , 500)
    }
}