//board
var blockSize=25; // this is the size of a block in the grid
var rows=20; //if you modify this then the width of the canvas will be smaller
var cols=20;
var board;
var context;

//snake head
var snakeX=blockSize*5;
var snakeY=blockSize*5;


var gameOverAlertShown = false; // flag to track if the game over alert has been shown

var counter=0;
//food
var foodX;
var foodY;

var velocityX=0;
var velocityY=0;

var snakeBody=[] //this will store the X,Y coordinates in an array

var gameOver=false;
window.onload=function(){
    board=document.getElementById("board");
    board.height=rows*blockSize; //draw the rows
    board.width=cols*blockSize; //draw the columns
    context=board.getContext("2d"); //drawing on the board
    placeFood();
    document.addEventListener("keyup",changeDirection)
   // update();
   setInterval(update,1000/10);//it runs 10 times a second
}
function update() {

   
    if(gameOver){
      location.reload();
    }
    context.fillStyle="black" //to fill the color of the canvas
    context.fillRect(0,0,board.width,board.height);

    //To create the food in our canvas
    context.fillStyle="red"; //give the food a color
    context.fillRect(foodX,foodY,blockSize,blockSize); 

    if(snakeX==foodX&&snakeY==foodY){
        snakeBody.push([foodX,foodY]); //add coordinates to array
        placeFood(); //if the snake touches the food the food will be placed in another location
        counter++; //Everytime you colide with the food the counter adds a 1 this will be displayed to the user
        document.querySelector('.score').innerText = counter;
    }

    for (let i = snakeBody.length-1; i>0; i--) {//move parts with the body
       snakeBody[i]=snakeBody[i-1];//to get the previous x&y coordinates 
    }
    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }

        //To create the snake in our canvas
        context.fillStyle="lime"; //give the snake a color
        snakeX+=velocityX*blockSize; //to speedup the snake X 
        snakeY+=velocityY*blockSize; //to speedup the snake Y
        context.fillRect(snakeX,snakeY,blockSize,blockSize); 
        for(let i =0;i<snakeBody.length;i++){
            context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);//to let the snake grow but the green points are remaining in the rect 
        }

        //game over conditions
        if(snakeX<0 || snakeX>cols*blockSize||snakeY<0||snakeY>rows*blockSize){
            gameOver=true;
            if(gameOver && !gameOverAlertShown){
                gameOverAlertShown = true; // set the flag to true
                alert("Game over your score was " + counter);
            }
            counter=0;
        }
        //loop over the body parts to check for a collision
        for(let i=0;i<snakeBody.length;i++){
            if(snakeX==snakeBody[i][0]&&snakeY==snakeBody[i][1]){
                gameOver=true;
                if(gameOver && !gameOverAlertShown){
                    gameOverAlertShown = true; // set the flag to true
                    alert("Game over your score was" + counter);
                }
                counter=0;

            }
        }
}
//this is to change the direction of the snake && it is not permitted to go the opposite way so if you go right you cannot go left
function changeDirection(e) {
    if(e.code=="ArrowUp" && velocityY!=1){ //the second check is to be sure that the snake cannot eat his own body and not go the oppiste way
        velocityX=0;
        velocityY=-1;
    }
    else if(e.code=="ArrowDown"&& velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(e.code=="ArrowLeft" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.code=="ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
}
function placeFood() { //to create a random location for our food
    //0-1 *cols==>(0-19.999) ==> because of the floor we get rid of the numbers after the point ==>(0-19) * 25
    foodX=Math.floor(Math.random()*cols)*blockSize;
    foodY=Math.floor(Math.random()*cols)*blockSize;
}