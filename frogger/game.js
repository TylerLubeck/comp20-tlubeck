
//packets of info for locations of each element
//x, y, width, height
frog = new Array(10, 365, 25, 25);
livesFrog = new Array(10, 335, 25, 25);
log = new Array(0, 195, 130, 30); 
carOne = new Array(70, 300, 30, 25);
carTwo = new Array(100, 300, 55, 35);
carThree = new Array(100, 300, 55, 35);
carFour = new Array(100, 300, 55, 35);
carFive = new Array(100, 300, 55, 35);
head = new Array(0, 0, 399, 115);
road = new Array(0, 120, 399, 30);

//Variables for various aspects of the game
highScore = 9001;
score = 0;
level = 1;
lives = 5;
time = 60;
gameOver = false;

//Moving things coordinates
car1_x = -25;
car1_y = 375;

car2_x = 399;
car2_y = 400;

car3_x = 40;
car3_y = 400;

car4_x = 20;
car4_y = 400;

car5_x = 150;
car5_y = 400;

//Single point of truth for styling
color = "rgb(0, 255, 0)";
sprites = "assets/frogger_sprites.png";
font = "bold 20px sans-serif";

function start_game() {
    gameCanvas = document.getElementById("game");
    ctx = gameCanvas.getContext("2d");
    init();
    run = 0;
    lane1 = setInterval(car1, 10);
    lane2 = setInterval(car2, 20);
    //lane3 = setInterval(car3, 500);
    //lane4 = setInterval(car4, 50);
    //lane5 = setInterval(car5, 20);
    tid = setInterval(play, 1000);
}

function play() {
    run++;
    console.log(run);
    time--;
    drawTime();
    if(lives == 0){
            gameOver = true;
    }
    
    if(gameOver) {
        clearInterval(tid);
    }
}


function init() {
    img = new Image();

    img.onload = start();
    img.src = sprites;


    start();
}

function start() {
    //These won't need to be redrawn each time
    drawWater();
    drawRoads();
    drawHeader();
    drawText();
    drawTime();

    //These will be. Perhaps second function to seperate them?
    drawFrog(50, 478);
    drawLog(20, 240);
    drawLives(lives);
    drawLevels(10);
    drawScore(score);
    drawHighScore(highScore);
}

function drawLives(num) {
    //draw images for whatever number of lives. Lets you add a new life
    for(i = 0; i < num; i++) {
        ctx.drawImage(img, livesFrog[0], livesFrog[1], 
                        livesFrog[2], livesFrog[3],
                        (i*20), 505, 20, 20);
    }
}

function drawText() {
    ctx.fillStyle = color;
    
    //reset font each time, in case it changes
    ctx.font = font;
    ctx.fillText("Level ", 100, 521);
    ctx.fillText("Score: ", 175, 550);
    ctx.fillText("Highscore: ", 0, 550);
}

function drawLevels(num) {
    ctx.fillStyle = color;

    //reset font each time, in case it changes
    ctx.font = font;
    ctx.fillText(num, 160, 521);
    level = num;
}

function drawHighScore(num) {
    ctx.fillStyle = color;
    
    //reset font each time, in case it changes
    ctx.font = font;
    ctx.fillText(num, 110, 550);
    highScore = num;
}

function drawTime() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(340, 530, 30, 20);
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText("Time:", 280, 550);
    ctx.fillText(time, 340, 550);
}

function drawScore(num) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(240, 530, 30, 20);
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(num, 240, 550);
    score = num;
}

function drawWater() {
    ctx.fillStyle = "#191970";
    ctx.fillRect(0, 0, 400, 270); 
}

function drawRoads() {
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 300, 400, 380); 

    ctx.drawImage(img, road[0], road[1], road[2], road[3],
                        0, 270, road[2], road[3]);
    
    ctx.drawImage(img, road[0], road[1], road[2], road[3],
                        0, 475, road[2], road[3]);
}

function drawHeader() {
    ctx.drawImage(img, head[0], head[1], head[2], head[3],
                        0, 0, head[2], head[3]);
}

function drawFrog(x, y) {
    ctx.drawImage(img, frog[0], frog[1], frog[2], frog[3], 
                        x, y, frog[2], frog[3]);
}

function drawLog(x, y) {
    ctx.drawImage(img, log[0], log[1], log[2], log[3],
                        x, y, log[2], log[3]);
}

function car1() {
    if(car1_x > 399) {
        car1_x = -25;
    }
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, car1_y, 399, 25); 
    
    car1_x++;
    
    ctx.drawImage(img, carOne[0], carOne[1], carOne[2], carOne[3], 
                        car1_x, car1_y, carOne[2], carOne[3]);   
}

function car2() {
    if (car2_x < -50) {
        car2_x = 400;
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, car2_y, 399, 25); 

    car2_x--;
    ctx.drawImage(img, carTwo[0], carTwo[1], carTwo[2], carTwo[3], 
                        car2_x, car2_y, carTwo[2], carTwo[3]);   
}

function car3() {
    if(car3_x < -25) {
        car3_x = 400;
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, car3_y, 399, 25);

    ctx.drawImage(img, carThree[0], carThree[1], carThree[2], carThree[3], 
                        car3_x, car3_y, carThree[2], carThree[3]);   
}

function car4() {
    if(car4_x < -25) {
        car4_x = 400;
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, car4_y, 399, 25);

    ctx.drawImage(img, carFour[0], carFour[21], carFour[2], carFour[3], 
                        car4_x, car4_y, carFour[2], carFour[3]);   
}

function car5() {
    if(car5_x < -25) {
        car5_x = 400;
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, car5_y, 399, 25);

    ctx.drawImage(img, carFive[0], carFive[1], carFive[2], carFive[3], 
                        car5_x, car5_y, carFive[2], carFive[3]);   
}
