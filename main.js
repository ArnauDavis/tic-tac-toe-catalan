//misc values used
let turnNumber = document.querySelector('.turnHere')
let symbolHolder = document.querySelector('.symbolHere')




//defining buttons
let startButton = document.querySelector('.glowing-btn')
let resetBtn = document.querySelector('.resetButton')

//adding event listeners to buttons
startButton.addEventListener('click',startGame)
resetBtn.addEventListener('click',resetGame)


//functions to start or reset game

function startGame(){
    startButton.style.display='none'
    resetBtn.style.display='block'
    count +=  Math.floor(Math.random() * 2)
    console.log(count)
    if(count % 2 == 0){
        turnNumber.innerText = 'És el torn del primer jugador!'
        turnNumber.style.color ='#ffffe0'
        symbolHolder.innerText = '0'
        symbolHolder.style.color= '#71eeb8'
        turnNumber.style.textAlign = 'center'
    }else{
        turnNumber.innerText = 'És el torn del segon jugador'
        turnNumber.style.color ='#71eeb8'
        symbolHolder.innerText = 'X'
        symbolHolder.style.color= '#ffffe0'
        turnNumber.style.textAlign = 'center'
    }
    
    
    
}

function resetGame(){
    startButton.style.display='block'
    resetBtn.style.display='none'
    count = 0
    gotcha.forEach(div =>{
        div.innerText = ''
        div.style.backgroundColor = '#003366' 
    })
    turnNumber.innerText = ''
    symbolHolder.innerText = ''

}

//array values needed to win
const player1Win = ['O', 'O', 'O']
const player2Win = ['X', 'X', 'X']



function getStats(){
    // Assign values to each div
    const a1 = document.querySelector('#a1').innerText
    const a2 = document.querySelector('#a2').innerText
    const a3 = document.querySelector('#a3').innerText
    const b1 = document.querySelector('#b1').innerText
    const b2 = document.querySelector('#b2').innerText
    const b3 = document.querySelector('#b3').innerText
    const c1 = document.querySelector('#c1').innerText
    const c2 = document.querySelector('#c2').innerText
    const c3 = document.querySelector('#c3').innerText
    
    //possible win routes
    //(thanks Nic for the suggestion!)
    const a1Down = [a1, b1, c1]
    const a2Down = [a2,b2,c2]
    const a3Down = [a3,b3,c3]
    
    const a1Across = [a1,a2,a3]
    const b1Across = [b1,b2,b3]
    const c1Across = [c1,c2,c3]
    
    const a1Diagonal = [a1,b2,c3]
    const c1Diagonal = [c1,b2,a3]
    
    return [
        a1Down, a2Down, a3Down,
        a1Across, b1Across, c1Across,
        a1Diagonal, c1Diagonal
    ]
}

function whoWon(){
    let winnerArray = getStats()
    let showTime = winnerArray.some(innerArray => innerArray.includes(''))
    
    let player1Won = winnerArray.some(innerArray => JSON.stringify(innerArray) === JSON.stringify(player1Win))
    let player2Won = winnerArray.some(innerArray => JSON.stringify(innerArray) === JSON.stringify(player2Win)) 

    if (player1Won) {
        console.log('Player 1 (O) won!');
        count += 999999
        turnNumber.innerText = 'El jugador 1 va guanyar!'
        turnNumber.style.color = '#ffffe0'
        symbolHolder.innerText = ''

        
    } else if (player2Won) {
        console.log('Player 2 (X) won!');
        count += 999999
        turnNumber.innerText = 'El jugador 2 va guanyar!'
        turnNumber.style.color = '#71eeb8'
        symbolHolder.innerText = ''

    }else if (showTime == false){
        console.log('game is a tie')
        count += 999999
        turnNumber.innerText = 'Com els mitjons, esteu empatats!'
        turnNumber.style.color = '#fdfd96'
        turnNumber.style.textAlign = 'center'
        symbolHolder.innerText = ''
    }
    // I kept trying different ways to remove the event lisenters so the game couldn't be played anymore
    //to think the solution of just making an out of bounds count worked is amazing
}





//special variable 
let count = 0

//selecting every div marked as a player space
let gotcha = document.querySelectorAll('.playerSpace')

//adding event listeners to each div to trigger function
gotcha.forEach(space =>{
    space.addEventListener('click',function(element){
        if(count <= 9999){
            if(startButton.style.display !== 'none'){

            }else{
            if(element.target.innerText == ''){
                count+=1
                //if odd, player 1/ O goes, if even player 2/ X goes
                //here playerspace changes based on turn
                if(count % 2 == 0){
                    element.target.innerText = 'X'
                    element.target.style.color = '#ffffe0'
                    element.target.style.backgroundColor = '#71eeb8'
                    turnNumber.innerText = 'És el torn del jugador 1!'
                    turnNumber.style.color ='#ffffe0'
                    symbolHolder.innerText = '0'
                    symbolHolder.style.color= '#71eeb8'

                }else{
                    element.target.innerText = 'O'
                    element.target.style.color = '#71eeb8'
                    element.target.style.backgroundColor = '#ffffe0'
                    turnNumber.innerText = 'És el torn del jugador 2!'
                    turnNumber.style.color ='#71eeb8'
                    symbolHolder.innerText = 'X'
                    symbolHolder.style.color= '#ffffe0'
                                          
                }
            }//if checking if space is empty
            whoWon()

        }//else to trigger only if start button is clicked
    }// if count is less than 9999
    })//event Listener
})//for Each