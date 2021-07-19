
//Const And Variables
const BackMusic = new Audio('back.wav');
const MoveSound = new Audio('move.wav');
const FoodSound = new Audio('Food.mp3');
const GameOver = new Audio('GameOver.wav');
var start = document.getElementById("Start");
var speed = 10;
var StartTime = 0;
var SnakeArr = [{x:12,y:13}];
var Food = {x:2,y:1};
var direction = {x:0,y:0};
var CurrentScore = 0;
var HighScoreValue = 0;

//FPS Function
function FPS(Currenttime){
    window.requestAnimationFrame(FPS);
    if((Currenttime - StartTime)/1000 < 1/speed)
        return;
    StartTime = Currenttime;
    GameEngine();
}



//Game Functions

function collide(){
    for (let i = 1; i < SnakeArr.length; i++) {
       if(SnakeArr[0].x === SnakeArr[i].x && SnakeArr[0].y === SnakeArr[i].y)
            return true;
    }
    if(SnakeArr[0].x <= 0 || SnakeArr[0].x >= 25 || SnakeArr[0].y <=0 || SnakeArr[0].y >=25)
        return true;
    return false;
}

function GameEngine(){
    if(collide()){
        GameOver.play();
        CurrentScore = 0;
        var end = 24;
        SnakeArr = [{x:12,y:13}];
        Food.x = Math.round(1+end*Math.random());
        Food.y = Math.round(1+end*Math.random());
        direction.x = 0;
        direction.y = 0;
        BackMusic.pause();
        alert("Game Over!!");
    }
    //updating  The Snake Array And Food

    //if Head Meets Food
    if(Food.x === SnakeArr[0].x && Food.y === SnakeArr[0].y){
        FoodSound.play();
        SnakeArr.unshift({x:Food.x,y:Food.y});
        //Generate The Food
        var end = 24;
        Food.x = Math.round(1+end*Math.random());
        Food.y = Math.round(1+end*Math.random());
        CurrentScore++;
        if(CurrentScore > HighScoreValue){
            HighScoreValue = CurrentScore;
            Hs.innerHTML = "HS : "+JSON.stringify(CurrentScore);
            localStorage.setItem("hiscore",JSON.stringify(HighScoreValue));
        }
    }

    //moving The Snake
    for (let i = SnakeArr.length-2; i >= 0; i--) {
        SnakeArr[i+1] = {...SnakeArr[i]};
    }

    SnakeArr[0].x += direction.x;
    SnakeArr[0].y += direction.y;

    //Displaying The Snake and Food
    //Displaying The Snake
    board.innerHTML = "";
    SnakeArr.forEach((ele,index)=>{
        var SnakeElement = document.createElement('div');
        
        SnakeElement.style.gridRowStart = ele.y;
        SnakeElement.style.gridColumnStart = ele.x;
        if(index === 0)
            SnakeElement.classList.add("Head");
        else    
            SnakeElement.classList.add("Body");
        board.appendChild(SnakeElement);
    });

    //Displaying The Food

    var FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart = Food.y;
    FoodElement.style.gridColumnStart = Food.x;
    FoodElement.classList.add("Food");
    board.appendChild(FoodElement);

    //Displaying The Score
    Score.innerHTML = "Score : " + CurrentScore;

    // Maintaining The HightScore
    
    
    
}





//Main Logic
HighScore = localStorage.getItem("hiscore");
if(HighScore === null){
    localStorage.setItem("hiscore",0);  
    HighScoreValue = 0; 
}else{
    HighScoreValue = parseInt(HighScore);
    Hs.innerHTML = "Hs : "+HighScore;
}
console.log(HighScore);
window.requestAnimationFrame(FPS);
window.addEventListener('keydown',e => {
    
    MoveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            direction.x = 0;
            direction.y = -1;
            break;
        case 'ArrowDown':
            direction.x = 0;
            direction.y = 1;
            break;
        case 'ArrowLeft':
            direction.x = -1;
            direction.y = 0;
            break;
        case 'ArrowRight':
            direction.x = 1;
            direction.y = 0;
            break;
    }
});
// start.addEventListener('click',e =>{
//     BackMusic.loop = true;
//     BackMusic.play();
//     direction.x = -1; //start the game
//     direction.y = 0; //start the game
// });

