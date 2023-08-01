const boxes =document.querySelectorAll(".box");
const playerInfo =document.querySelector(".player-info")
const newbtn =document.querySelector(".btn");


let currentPlayer ;
let gameGrid ;

const winningPos =[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]

// now make a fun that iniliazed game
function gameStart(){
    currentPlayer  ="X";
    gameGrid =["","","","","","","","",""]

//---- UI pare empty karn hoga after click newgame btn
    boxes.forEach((box,index)=>{
        box.textContent ="";
        boxes[index].style.pointerEvents ="all"


        //color remove ->reinilzation
        box.classList =`box box${index+1}`;
    })


    newbtn.classList.remove("active")
    playerInfo.textContent =`Current Player -${currentPlayer}`
}

gameStart();

function swapPlayer(){
    if(currentPlayer ==="X"){
        currentPlayer ="O"
    }
    else{
        currentPlayer ="X"
    }

    //update on the UI 
    playerInfo.textContent =`Current Player -${currentPlayer}`
}

function checkGameOver(){
        let answer ="";
        
        winningPos.forEach((position) =>{
            if((gameGrid[position[0]] !== ""|| gameGrid[position[1]] !== "" ||gameGrid[position[2]] !== "")&& (gameGrid[position[0]] ===gameGrid[position[1]])  &&(gameGrid[position[1]] ===gameGrid[position[2]]) ){

                if(gameGrid[position[0]] ==="X") answer ="X";
                else  answer="O";


                boxes.forEach((box)=>{
                    box.style.pointerEvents ="none";
                })

                boxes[position[0]].classList.add("winner");
                boxes[position[1]].classList.add("winner");
                boxes[position[2]].classList.add("winner");
            }
        })

        if(answer !== ""){
            playerInfo.textContent =`Winner Player -${answer}`;
            newbtn.classList.add("active");
            return
        }

        let totalfilled =0;
        gameGrid.forEach((box) =>{
            if(box !== "")totalfilled++;
        })

        if(totalfilled === 9){
            playerInfo.textContent ="Game tied!!"
            newbtn.classList.add("active")
        }

}


function handleClick(index){
    // 1 update on UI current player  ->where update that place empty
    if(gameGrid[index] === ""){
        boxes[index].textContent =currentPlayer;
        gameGrid[index] =currentPlayer;

//--------
boxes[index].style.pointerEvents ="none"



        //swap player
        swapPlayer();
        //check winner the game
        checkGameOver();

    }

}


boxes.forEach((box,index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
})




//------work on new game btn
newbtn.addEventListener("click",gameStart)