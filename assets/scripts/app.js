document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
        {name: 'fries', img:'images/fries.png'},
        {name: 'fries', img:'images/fries.png'},
        {name: 'cheeseburguer', img:'images/cheeseburger.png'},
        {name: 'cheeseburguer', img:'images/cheeseburger.png'},
        {name: 'hotdog', img:'images/hotdog.png'},
        {name: 'hotdog', img:'images/hotdog.png'},
        {name: 'ice-cream', img:'images/ice-cream.png'},
        {name: 'ice-cream', img:'images/ice-cream.png'},
        {name: 'milkshake', img:'images/milkshake.png'},
        {name: 'milkshake', img:'images/milkshake.png'},
        {name: 'pizza', img:'images/pizza.png'},
        {name: 'pizza', img:'images/pizza.png'}
    ]

    cardArray.sort(() => 0.5 - Math.random());
    const grid = document.querySelector('.grid');

    //to set the result
    const resultDisplay = document.querySelector('#result');
    var resultValue = resultDisplay.textContent;
    resultValue = Number(resultValue);
    
    //to set the life
    var lifeElement = document.querySelector('#life');
    var lifeValue = lifeElement.textContent;
    lifeValue = Number(lifeValue);

    //create arrays
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardWon = [];
    

    //create the bord
    function createBoard(){

        for(let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }
    
    //check for match
    function checkForMatch(){


        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if(lifeValue === 0 && cardsChosen[0] !== cardsChosen[1]){
            alert('You missed your chances, please try again!');
            location.reload();
            return;
        }
        

        if(optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            alert('You have clicked the same image!')
        }
        else if(cardsChosen[0] === cardsChosen[1]){
            alert('You found a match!');
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            resultValue += 3;
            cardWon.push(cardsChosen);
        }else{
            
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            lifeValue--;
            alert('Try again!');
        }

        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = resultValue;
        lifeElement.textContent = lifeValue;
        if(cardWon.length === cardArray.length/2){
            alert('Congratulations! You found them all!');
        }
        
    }


    //flip the card
    function flipCard(){
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);

        this.setAttribute('src', cardArray[cardId].img);

        if(cardsChosen.length === 2){
            setTimeout(checkForMatch, 500);
        }
    }
    

    createBoard();


})