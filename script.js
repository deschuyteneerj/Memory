const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

//Function to flip the cards:
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    
    secondCard = this;
    
    checkForMatch();
}

//Function to check if the cards have the same image:
function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        return;
    }
unflipCards();
//Other way to write the if just above and the unflipCards() method is in the second line
//(so I could replace the 5 lines above the comments by the 2 following):
//let isMatch = firstCard.dataset.name === secondCard.dataset.name;
//isMatch ? disableCards() : unflipCards();
}

//Function to disable the click on the cards that are in pairs and so have to stay flipped:
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//Function to flip cards again if the cards are not a pair:
function unflipCards() {
    lockBoard = true;
    //Set a time out of 1,5sec after a pair is compared to flip the card again if it does not match:
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}
//Function to be able to click on 2 different cards only.
//And when the pair is found or two different cards,
//after flipping it back, be able to click on 2 other cards:
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Function to randomize the cards at the beginning of the game:
//IIFE -> Immediately-Invoked Function Expression
(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

//Add the event listener on click on the cards:
cards.forEach(card => card.addEventListener('click', flipCard));