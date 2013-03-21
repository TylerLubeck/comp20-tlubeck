
//packets of info for locations of each element
//x, y, width, height
frog = new Array(10, 365, 25, 25);
livesFrog = new Array(10, 335, 25, 25);
log = new Array(0, 195, 130, 30); 
carOne = new Array(70, 300, 30, 25);
carTwo = new Array(100, 300, 55, 35);
carThree = new Array(80, 260, 30, 35);
carFour = new Array(10, 265, 30, 25);
carFive = new Array(45, 265, 30, 25);
log1Arr = new Array(0, 195, 130, 30); 
head = new Array(0, 0, 399, 115);
road = new Array(0, 120, 399, 30);

//Variables for various aspects of the game
highScore = 9001;
score = 0;
level = 1;
lives = 5;
time = 60;
move_distance = 25;
gameOver = false;

//Moving things coordinates
car1_x = -75;
car1_y = 300;

car2_x = -25;
car2_y = 325;

car3_x = 450;
car3_y = 375;

car4_x = -25;
car4_y = 400;

car5_x = -25;
car5_y = 450;

log1_Y = 110;
log1_a = 0;
log1_b = 200;
log1_c = -100;

frog_x_start = 50;
frog_y_start = 475;

frog_x = frog_x_start;
frog_y = frog_y_start;
//Single point of truth for styling
color = "rgb(0, 255, 0)";
sprites = "assets/frogger_sprites.png";
font = "bold 20px sans-serif";

document.onkeydown = function(key) {
       switch(key.keyCode) {
           case 37:
                frog_x -= move_distance; 
                break;
           case 38:
                score += 10;
                frog_y -= move_distance;
                break;
           case 39:
                frog_x += move_distance;
                break;  
           case 40:
                frog_y += move_distance;
                break;
       } 
}

function makeTimers() {
    run = 0;
    //redraw background every time
    backgroundID = setInterval(drawBackground, 1);
    collissionCheckID = setInterval(collisionCheck, 1);
    lane1 = setInterval(car1, 15);
    lane2 = setInterval(car2, 13);
    lane3 = setInterval(car3, 10);
    lane4 = setInterval(car4, 8);
    lane5 = setInterval(car5, 12);
    log1ID = setInterval(log1, 12);
    //log2 = setInterval(log2, 8);
    //log3 = setInterval(log3, 12);
    tid = setInterval(play, 1000);
}

function start_game() {
    gameCanvas = document.getElementById("game");
    ctx = gameCanvas.getContext("2d");
    img = new Image();
    img.onload = makeTimers();
    img.src = sprites;
}

function play() {
    run++;
    time--;
    drawTime();
    console.log('in play');
   

    if(lives == 0){
        gameOver = true;
    }

    if(time == 0) {
        time = 60;
    }

    if(gameOver) {
        clearInterval(tid);
    }
}



function drawBackground() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawWater();
    drawRoads();
    drawHeader();
    drawText();
    drawTime();
    drawCars();
    drawWaterItems();
    drawLives();
    drawLevels(10);
    drawScore();
    drawHighScore(highScore);

    drawFrog();
}

function drawLives() {
    //draw images for whatever number of lives. Lets you add a new life
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 505, 100, 20);

    for(i = 0; i < lives; i++) {
        ctx.drawImage(img, livesFrog[0], livesFrog[1], 
                livesFrog[2], livesFrog[3],
                (i*20), 505, 20, 20);
    }
}

function drawText() {
    ctx.fillStyle = color;

    //reset font each time, in case it changes
    ctx.font = font;
    ctx.fillText("Time:", 280, 550);
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
    ctx.fillText(time, 340, 550);
}

function drawScore() {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(score, 240, 550);
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

function drawFrog() {
    ctx.drawImage(img, frog[0], frog[1], frog[2], frog[3], 
            frog_x, frog_y, frog[2], frog[3]);

}

function drawLog(x, y) {
    ctx.drawImage(img, log[0], log[1], log[2], log[3],
            x, y, log[2], log[3]);
}

function drawCars() {
    //Tractor
    ctx.drawImage(img, carOne[0], carOne[1], carOne[2], carOne[3], 
            car1_x, car1_y, carOne[2], carOne[3]);   
    ctx.drawImage(img, carOne[0], carOne[1], carOne[2], carOne[3], 
            car1_x+40, car1_y, carOne[2], carOne[3]);   
    ctx.drawImage(img, carOne[0], carOne[1], carOne[2], carOne[3], 
            car1_x+80, car1_y, carOne[2], carOne[3]);   
    ctx.drawImage(img, carOne[0], carOne[1], carOne[2], carOne[3], 
            car1_x+120, car1_y, carOne[2], carOne[3]);   
    ctx.drawImage(img, carOne[0], carOne[1], carOne[2], carOne[3], 
            car1_x+160, car1_y, carOne[2], carOne[3]);   
    
    //Truck
    ctx.drawImage(img, carTwo[0], carTwo[1], carTwo[2], carTwo[3], 
            car2_x, car2_y, carTwo[2], carTwo[3]);   
    ctx.drawImage(img, carTwo[0], carTwo[1], carTwo[2], carTwo[3], 
            car2_x+60, car2_y, carTwo[2], carTwo[3]);   
    ctx.drawImage(img, carTwo[0], carTwo[1], carTwo[2], carTwo[3], 
            car2_x+120, car2_y, carTwo[2], carTwo[3]);   
    
    //Yellow Speeder
    ctx.drawImage(img, carThree[0], carThree[1], carThree[2], carThree[3], 
            car3_x, car3_y, carThree[2], carThree[3]);   
    ctx.drawImage(img, carThree[0], carThree[1], carThree[2], carThree[3], 
            car3_x+40, car3_y, carThree[2], carThree[3]);   
    ctx.drawImage(img, carThree[0], carThree[1], carThree[2], carThree[3], 
            car3_x+80, car3_y, carThree[2], carThree[3]);   
    ctx.drawImage(img, carThree[0], carThree[1], carThree[2], carThree[3], 
            car3_x+120, car3_y, carThree[2], carThree[3]);   

    //Purple Car
    ctx.drawImage(img, carFour[0], carFour[1], carFour[2], carFour[3], 
            car4_x, car4_y, carFour[2], carFour[3]);   
    ctx.drawImage(img, carFour[0], carFour[1], carFour[2], carFour[3], 
            car4_x+40, car4_y, carFour[2], carFour[3]);   
    ctx.drawImage(img, carFour[0], carFour[1], carFour[2], carFour[3], 
            car4_x+80, car4_y, carFour[2], carFour[3]);   
    ctx.drawImage(img, carFour[0], carFour[1], carFour[2], carFour[3], 
            car4_x+120, car4_y, carFour[2], carFour[3]);   
    
    //WhiteSpeeder
    ctx.drawImage(img, carFive[0], carFive[1], carFive[2], carFive[3], 
            car5_x, car5_y, carFive[2], carFive[3]);   
    ctx.drawImage(img, carFive[0], carFive[1], carFive[2], carFive[3], 
            car5_x+40, car5_y, carFive[2], carFive[3]);   
    ctx.drawImage(img, carFive[0], carFive[1], carFive[2], carFive[3], 
            car5_x+80, car5_y, carFive[2], carFive[3]);   
    ctx.drawImage(img, carFive[0], carFive[1], carFive[2], carFive[3], 
            car5_x+120, car5_y, carFive[2], carFive[3]);   
    ctx.drawImage(img, carFive[0], carFive[1], carFive[2], carFive[3], 
            car5_x+160, car5_y, carFive[2], carFive[3]);   
}

//Truck
function car1() {
    if(car1_x > 399) {
        car1_x = -200;
    }
    car1_x++;
}


//Truck
function car2() {
    if (car2_x < -200) {
        car2_x = 400;
    }
    car2_x--;
}

//Yellow Speeder
function car3() {
    if(car3_x < -200) {
        car3_x = 400;
    }
    car3_x--;
}

//Purple Car
function car4() {
    if(car4_x < -200) {
        car4_x = 400;
    }
    car4_x--;
}

//White Speeder
function car5() {
    if(car5_x > 400) {
        car5_x = -200;
    }
    car5_x++;
}

function drawWaterItems() {
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log1_a, log1_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log1_b, log1_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log1_c, log1_Y, log1Arr[2], log1Arr[3]);   
}

function log1() {
    if(log1_a > 400) {
        log1_a = -200;
    }
    if(log1_b > 400) {
        log1_b = -200;
    }
    if(log1_c > 400) {
        log1_c = -200;
    }
    log1_a++;
    log1_b++;
    log1_c++;
}

function collisionCheck() {
    //Tractor
    //if(frog_y >= car1_y && frog_y <= car1_y+24) {
    if(frog_y === car1_y) {
        if(frog_x >= car1_x && frog_x <= car1_x + 160) {
            console.log('frog squashed by Tractor');
        }
    }
    //Truck
    //else if(frog_y >= car2_y && frog_y <= car2_y+34) {
    else if(frog_y === car2_y) {
        if(frog_x >= car2_x && frog_x <= car2_x + 120) {
            console.log('frog squashed by Truck');
        }
    }
    //Yellow Speeder
    //else if(frog_y >= car3_y && frog_y <= car3_y+24) {
    else if(frog_y === car3_y) {
        if(frog_x >= car3_x && frog_x <= car3_x + 120) {
            console.log('frog squashed by Yellow Speeder');
        }
    }
    //Purple CAr
    //else if(frog_y >= car4_y && frog_y <= car4_y+34) {
    else if(frog_y === car4_y) {
        if(frog_x >= car4_x && frog_x <= car4_x + 120) {
            console.log('frog squashed by Purple Car');
        }
    }
    //White Speeder
    //else if(frog_y >= car5_y && frog_y <= car5_y+24) {
    else if(frog_y === car5_y) {
        if(frog_x >= car5_x && frog_x <= car5_x + 160) {
            console.log('frog squashed by White SPeeder');
        }
    }
}
