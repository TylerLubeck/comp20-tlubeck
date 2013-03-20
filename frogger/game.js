
//packets of info for locations of each element
//x, y, width, height
frog = new Array(10, 365, 25, 25);
livesFrog = new Array(10, 335, 25, 25);
log = new Array(0, 195, 130, 30); 
carOne = new Array(70, 300, 30, 25);
carTwo = new Array(100, 300, 55, 35);
head = new Array(0, 0, 399, 115);
road = new Array(0, 120, 399, 30);

//Variables for various aspects of the game
highScore = 9001;
score = 0;
level = 1;
lives = 5;
gameOver = false;

//Moving things coordinates
car1_x = -25;
car1_y = 375;

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
    //lane2 = setInterval(car2, 200);
    //lane3 = setInterval(car3, 500);
    //lane4 = setInterval(car4, 50);
    //lane5 = setInterval(car5, 20);
    tid = setInterval(play, 1000);
}

function car1() {
    if(car1_x > 399) {
        car1_x = -25;
    }
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 375, 399, 25); 
    
    car1_x++;
    console.log('car1_x: ' + car1_x);
    drawCarOne(car1_x, car1_y);
}

function play() {
    run++;
    console.log(run);
        

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

    //These will be. Perhaps second function to seperate them?
    drawFrog(50, 478);
    drawLog(20, 240);
    //drawCarOne(300, 375);
    drawCarTwo(120, 325);
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

function drawScore(num) {
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

function drawCarOne(x, y) {
    ctx.drawImage(img, carOne[0], carOne[1], carOne[2], carOne[3], 
                        x, y, carOne[2], carOne[3]);   
}

function drawCarTwo(x, y) {
    ctx.drawImage(img, carTwo[0], carTwo[1], carTwo[2], carTwo[3], 
                        x, y, carTwo[2], carTwo[3]);   
}

