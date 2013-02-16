

function start_game() {
    gameCanvas = document.getElementById("game");
    ctx = gameCanvas.getContext("2d");
    sprites = "assets/frogger_sprites.png";
    init();
}

function init() {
    img = new Image();
    //x, y, width, height
    frog = new Array(10, 365, 25, 25);
    livesFrog = new Array(10, 335, 25, 25);
    log = new Array(0, 195, 130, 30); 
    carOne = new Array(70, 300, 30, 25);
    carTwo = new Array(100, 300, 55, 35);
    head = new Array(0, 0, 399, 115);
    road = new Array(0, 120, 399, 30);
    img.onload = start();
    img.src = sprites;

    lives = 3;

    start();
}

function start() {
    drawWater();
    drawRoads();
    drawFrog(50, 478);
    drawLog(20, 240);
    drawCarOne(300, 375);
    drawCarTwo(120, 325);
    drawHeader();
    drawLives(3);
}

function drawLives(num) {
    for(i = 0; i < num; i++) {
        ctx.drawImage(img, livesFrog[0], livesFrog[1], 
                        livesFrog[2], livesFrog[3],
                        (i*15), 505, 15, 15);
    }
}

function drawLevels(num) {

}

function drawHighScore(num) {

}

function drawScore(num) {

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

function killTheFrog(position) {
    
}
