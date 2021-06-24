document.addEventListener('DOMContentLoaded', () => {


    const deck = [ {
        name: 'ace',
        frontimg: 'ace.png'
      },
      {
        name: 'king',
        frontimg: 'king.png'
      },
      {
        name: 'queen',
        frontimg: 'queen.png'
      },
      {
        name: 'jack',
        frontimg: 'jack.png'
      },
      {
        name: 'two',
        frontimg: 'two.png'
      },
      {
        name: 'three',
        frontimg: 'three.png'
      },
      {
        name: 'four',
        frontimg: 'four.png'
      },
      {
        name: 'five',
        frontimg: 'five.png'
      },
      {
        name: 'ace',
        frontimg: 'ace.png'
      },
      {
        name: 'king',
        frontimg: 'king.png'
      },
      {
        name: 'queen',
        frontimg: 'queen.png'
      },
      {
        name: 'jack',
        frontimg: 'jack.png'
      },
      {
        name: 'two',
        frontimg: 'two.png'
      },
      {
        name: 'three',
        frontimg: 'three.png'
      },
      {
        name: 'four',
        frontimg: 'four.png'
      },
      {
        name: 'five',
        frontimg: 'five.png'
      }
    ]

    const memoryCards = document.querySelector(".memory-cards");
    const resultDisplay = document.querySelector('#result');
    const timeLeftDisplay = document.querySelector('#time-left')
    const startBtn = document.querySelector('#start-button')
    let cardsFlipped = []
    let cardsFlippedId = []
    let cardsWon = []


       
        //function to shuffle the cards
        function shuffle(array) {
            let currentIdx = array.length, temp, randomIdx;

            for (currentIdx = array.length - 1; currentIdx > 0; currentIdx -= 1) {
                randomIdx = Math.floor(Math.random() * (currentIdx + 1))
                temp = array[currentIdx]
                array[currentIdx] = array[randomIdx]
                array[randomIdx] = temp

            }
            return array;
          }

          //function in creating the board
          function createBoard() {
            const shuffleDeck = shuffle(deck);
            for (let i = 0; i < shuffleDeck.length; i++) {
              const newDiv = document.createElement('div');
              newDiv.classList.add('card');
              const backfrontCard = document.createElement('img')
              backfrontCard.setAttribute('src', 'back.png');
              backfrontCard.setAttribute('data-id', i);
              backfrontCard.classList.add('back-card');
              backfrontCard.addEventListener('click', flipCard)
              newDiv.appendChild(backfrontCard);
              memoryCards.appendChild(newDiv)

            }
        }
            //function for flipping the cards 
            function flipCard() {
                //getting the data id of the card that is clicked
                let cardId = this.getAttribute('data-id')
                //data id goes back to the deck array and gets the name of the index of the data id
                cardsFlipped.push(deck[cardId].name)
                //it pushes the cards id number to cardsFlippedId
                cardsFlippedId.push(cardId)
                //so once clicked on the card it provided the data id number and the image
                this.setAttribute('src', deck[cardId].frontimg)
                if (cardsFlipped.length === 2) {
                document.body.style.pointerEvents = "none";
                setTimeout(checkForMatch, 1000)
    
                console.log("clicked")
                }
            }
            
            //function for the timer
            let timeLeft = 30;
            function countDown() {
            //backfrontCard.addEventListener('click', flipCard)
                setInterval(function() {
                if(timeLeft <= 0) {
                    clearInterval(timeLeft = 0)
                    document.body.style.pointerEvents = "none";
                    //timeLeftDisplay.innerHTML = "Time is up!"
                }
                timeLeftDisplay.innerHTML = timeLeft 
                timeLeft -= 1

            }, 1000)
        }

            //console.log(countDown);
            startBtn.addEventListener('click', countDown)

          function checkForMatch () {
            const cards = document.querySelectorAll('img')
            const cardOne = cardsFlippedId[0]
            const cardTwo = cardsFlippedId[1]

            if(cardsFlipped[0] === cardsFlipped[1]) {
                console.log("matched")
                cards[cardOne].removeEventListener('click', flipCard)
                cards[cardTwo].removeEventListener('click', flipCard)
                document.body.style.pointerEvents = "auto";
                cardsWon.push(cardsFlipped)
            }
            else {
                cards[cardOne].setAttribute('src', 'back.png')
                cards[cardTwo].setAttribute('src', 'back.png')
                document.body.style.pointerEvents = "auto";
                console.log("unmatched")
            }
            cardsFlipped = []
            cardsFlippedId = []
            resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === deck.length/2) {
        //stopTime();
      resultDisplay.textContent = 'Congratulations! You found them all!'
    
    } else if(timeLeft === 0) {
        
        resultDisplay.textContent = 'You loose!'
    }
        }

        createBoard()

});