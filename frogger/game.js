
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
move_distance_hor = 20;
gameOver = false;
dead = false;
onLog1 = false;
onLog2 = false;
onLog3 = false;
onLog4 = false;
onLog5 = false;
onLog6 = false;
onLog7 = false;
win1Draw = false;
win2Draw = false;
win3Draw = false;
win4Draw = false;
win5Draw = false;
deadID = undefined;


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

log1_Y = 125;
log1_a = 0;
log1_b = 200;
log1_c = -100;

log2_Y = 250;
log2_a = 0;
log2_b = 200;
log2_c = -100;

log3_Y = 225;
log3_a = 0;
log3_b = 200;
log3_c = -100;

log4_Y = 150;
log4_a = 0;
log4_b = 180;
log4_c = 360;

log5_Y = 175;
log5_a = -200;
log5_b = -20;
log5_c = 160;

log6_Y = 200;
log6_a = -25;
log6_b = 155;
log6_c = 235;

log7_Y = 100;
log7_a = -25;
log7_b = 155;
log7_c = 235;

frog_x_start = 50;
frog_y_start = 475;

frog_x = frog_x_start;
frog_y = frog_y_start;
//Single point of truth for styling
//
color = "rgb(0, 255, 0)";
sprites = "assets/frogger_sprites.png";
deadSprite = "assets/dead_frog.png";
font = "bold 20px sans-serif";

document.onkeydown = function(key) {
       switch(key.keyCode) {
           //move left
           case 37:
                frog_x -= move_distance_hor; 
                if(frog_x < 0) {
                    frog_x = 0;
                }
                break;
            //move up
           case 38:
                score += 10;
                frog_y -= move_distance;
                break;
            //move right
           case 39:
                frog_x += move_distance_hor;
                if(frog_x >= 375) {
                    frog_x = 375;
                }
                break;  
            //move down
           case 40:
                frog_y += move_distance;
                if(frog_y > frog_y_start) {
                    frog_y = frog_y_start;
                }
                break;
       } 
}

function makeTimers() {
    run = 0;
    //redraw background every time
    backgroundID = setInterval(drawBackground, 1);
    collissionCheckID = setInterval(collisionCheck, 1);
    winCheckID = setInterval(checkWin, 1);
    waterCheckID = setInterval(waterCheck, 1);
    lane1 = setInterval(car1, 15);
    lane2 = setInterval(car2, 13);
    lane3 = setInterval(car3, 10);
    lane4 = setInterval(car4, 8);
    lane5 = setInterval(car5, 12);
    log1ID = setInterval(log1, 12);
    log2ID = setInterval(log2, 8);
    log3ID = setInterval(log3, 12);
    log4ID = setInterval(log4, 15);
    log5ID = setInterval(log5, 5);
    log6ID = setInterval(log6, 10);
    log7ID = setInterval(log7, 10);
    tid = setInterval(play, 1000);
}

function start_game() {
    gameCanvas = document.getElementById("game");
    ctx = gameCanvas.getContext("2d");
    img = new Image();
    img.onload = makeTimers();
    img.src = sprites;
    deadImg = new Image();
    deadImg.src = deadSprite;
}

function play() {
    run++;
    time--;
    drawTime();

    if(lives == 0){
        gameOver = true;
    }

    if(win1Draw && win2Draw && win3Draw && win4Draw && win5Draw) {
        score += 1000;
        gameOver = true;
    }

    if(time == 0) {
        killIt();
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
    drawWinners();

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
    ctx.fillText("Time:", 300, 550);
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
    ctx.fillStyle = color;
    ctx.fillText(time, 360, 550);
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
    
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log2_a, log2_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log2_b, log2_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log2_c, log2_Y, log1Arr[2], log1Arr[3]);   
    
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log3_a, log3_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log3_b, log3_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log3_c, log3_Y, log1Arr[2], log1Arr[3]);   
    
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log4_a, log4_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log4_b, log4_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log4_c, log4_Y, log1Arr[2], log1Arr[3]);   
    
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log5_a, log5_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log5_b, log5_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log5_c, log5_Y, log1Arr[2], log1Arr[3]);   
    
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log6_a, log6_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log6_b, log6_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log6_c, log6_Y, log1Arr[2], log1Arr[3]);   
    
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log7_a, log7_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log7_b, log7_Y, log1Arr[2], log1Arr[3]);   
    ctx.drawImage(img, log1Arr[0], log1Arr[1], log1Arr[2], log1Arr[3], 
            log7_c, log7_Y, log1Arr[2], log1Arr[3]);   
    
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
    if(onLog1 == true) {
        frog_x++;
    }
}

function log2() {
    if(log2_a < -400) {
        log2_a = 420;
    }
    if(log2_b < -400) {
        log2_b = 420;
    }
    if(log2_c < -400) {
        log2_c = 420;
    }
    log2_a--;
    log2_b--;
    log2_c--;
    if(onLog2 == true) {
        frog_x--;
    }
}

function log3() {
    if(log3_a > 400) {
        log3_a = -200;
    }
    if(log3_b > 400) {
        log3_b = -200;
    }
    if(log3_c > 400) {
        log3_c = -200;
    }
    log3_a++;
    log3_b++;
    log3_c++;
    if(onLog3 == true) {
        frog_x++;
    }
}

function log4() {
    if(log4_a > 400) {
        log4_a = -200;
    }
    if(log4_b > 400) {
        log4_b = -200;
    }
    if(log4_c > 400) {
        log4_c = -200;
    }
    log4_a++;
    log4_b++;
    log4_c++;
    if(onLog4 == true) {
        frog_x++;
    }
}

function log5() {
    if(log5_a < -400) {
        log5_a = 420;
    }
    if(log5_b < -400) {
        log5_b = 420;
    }
    if(log5_c < -400) {
        log5_c = 420;
    }
    log5_a--;
    log5_b--;
    log5_c--;
    if(onLog5 == true) {
        frog_x--;
    }
}

function log6() {
    if(log6_a > 400) {
        log6_a = -200;
    }
    if(log6_b > 400) {
        log6_b = -200;
    }
    if(log6_c > 400) {
        log6_c = -200;
    }
    log6_a++;
    log6_b++;
    log6_c++;
    if(onLog6 == true) {
        frog_x++;
    }
}

function log7() {
    if(log7_a > 400) {
        log7_a = -200;
    }
    if(log7_b > 400) {
        log7_b = -200;
    }
    if(log7_c > 400) {
        log7_c = -200;
    }
    log7_a++;
    log7_b++;
    log7_c++;
    if(onLog7 == true) {
        frog_x++;
    }
}

function collisionCheck() {
    //Tractor
    if(frog_y === car1_y) {
        if(frog_x >= car1_x && frog_x <= car1_x + 160) {
            dead = true;
        }
    }
    //Truck
    else if(frog_y === car2_y) {
        if(frog_x >= car2_x && frog_x <= car2_x + 120) {
            dead = true;
        }
    }
    //Yellow Speeder
    else if(frog_y === car3_y) {
        if(frog_x >= car3_x && frog_x <= car3_x + 120) {
            dead = true;
        }
    }
    //Purple CAr
    else if(frog_y === car4_y) {
        if(frog_x >= car4_x && frog_x <= car4_x + 120) {
            dead = true;
        }
    }
    //White Speeder
    else if(frog_y === car5_y) {
        if(frog_x >= car5_x && frog_x <= car5_x + 160) {
            dead = true;
        }
    }

    if(dead) {
        dead = false;
        killIt();
    }
}

function waterCheck() {
    if(frog_y >= 100 && frog_y <= 250) {
        if(frog_x <= 0 || frog_x >= 399) {
            killIt();
        }

        if(frog_y == log1_Y) {
            if(frog_x >= log1_a && frog_x <= log1_a + 105
                || frog_x >= log1_b && frog_x <= log1_b + 105
                || frog_x >= log1_c && frog_x <= log1_c + 105 ){
                
                onLog1 = true; 
            }
        } else {
            onLog1 = false;
        }
        if (frog_y == log2_Y) {
            if(frog_x >= log2_a && frog_x <= log2_a + 105
                || frog_x >= log2_b && frog_x <= log2_b + 105
                || frog_x >= log2_c && frog_x <= log2_c + 105) {
                
                onLog2 = true;            
            } else {
                onLog2 = false;
            }
        } else {
            onLog2 = false;
        }
        if (frog_y == log3_Y) {
            if(frog_x >= log3_a && frog_x <= log3_a + 105
                || frog_x >= log3_b && frog_x <= log3_b + 105
                || frog_x >= log3_c && frog_x <= log3_c + 105) {
                
                onLog3 = true;            
            } else {
                onLog3 = false;
            }
        } else {
            onLog3 = false;
        }
        
        if (frog_y == log4_Y) {
            if(frog_x >= log4_a && frog_x <= log4_a + 105
                || frog_x >= log4_b && frog_x <= log4_b + 105
                || frog_x >= log4_c && frog_x <= log4_c + 105) {
                
                onLog4 = true;            
            } else {
                onLog4 = false;
            }
        } else {
            onLog4 = false;
        }
        
        if (frog_y == log5_Y) {
            if(frog_x >= log5_a && frog_x <= log5_a + 105
                || frog_x >= log5_b && frog_x <= log5_b + 105
                || frog_x >= log5_c && frog_x <= log5_c + 105) {
                
                onLog5 = true;            
            } else {
                onLog5 = false;
            }
        } else {
            onLog5 = false;
        }
        
        if (frog_y == log6_Y) {
            if(frog_x >= log6_a && frog_x <= log6_a + 105
                || frog_x >= log6_b && frog_x <= log6_b + 105
                || frog_x >= log6_c && frog_x <= log6_c + 105) {
                
                onLog6 = true;            
            } else {
                onLog6 = false;
            }
        } else {
            onLog6 = false;
        }

        if (frog_y == log7_Y) {
            if(frog_x >= log7_a && frog_x <= log7_a + 105
                || frog_x >= log7_b && frog_x <= log7_b + 105
                || frog_x >= log7_c && frog_x <= log7_c + 105) {
                
                onLog7 = true;            
            } else {
                onLog7 = false;
            }
        } else {
            onLog7 = false;
        }

        if(!onLog1 && !onLog2 && !onLog3 && !onLog4 
                && !onLog5 && !onLog6 && !onLog7) {
            killIt();
        }
    } else {
        onLog1 = false;
        onLog2 = false;
        onLog3 = false;
        onLog4 = false;
        onLog5 = false;
        onLog6 = false;
        onLog7 = false;
    }
}

//16, 96, 176, 276, 356
function checkWin() {
    if(frog_y == 75) {
        if(frog_x >= 15 && frog_x <= 35) {
            win1Draw = true;
            score += 50;
            score += (10 * time);
        } else if (frog_x >= 90 && frog_x <= 115) {
            win2Draw = true;
            score += 50;
            score += (10 * time);
        } else if (frog_x >= 170 && frog_x <= 208) {
            win3Draw = true;
            score += 50;
            score += (10 * time);
        } else if (frog_x >= 259 && frog_x <= 294) {
            win4Draw = true;
            score += 50;
            score += (10 * time);
        } else if (frog_x >= 346 && frog_x <= 364) {
            win5Draw = true;
            score += 50;
            score += (10 * time);
        } else {
            killIt();
        }

        frog_x = frog_x_start;
        frog_y = frog_y_start;
        time = 60;
    } 
}

function drawWinners() {
    if (win1Draw) {
        ctx.drawImage(img, frog[0], frog[1], frog[2], frog[3], 
                16, 75, frog[2], frog[3]);
    }
    if (win2Draw) {
        ctx.drawImage(img, frog[0], frog[1], frog[2], frog[3], 
                96, 75, frog[2], frog[3]);
    }
    if (win3Draw) {
        ctx.drawImage(img, frog[0], frog[1], frog[2], frog[3], 
                176, 75, frog[2], frog[3]);
    }
    if (win4Draw) {
        ctx.drawImage(img, frog[0], frog[1], frog[2], frog[3], 
                276, 75, frog[2], frog[3]);
    }
    if (win5Draw) {
        ctx.drawImage(img, frog[0], frog[1], frog[2], frog[3], 
                356, 75, frog[2], frog[3]);
    }
}

function killIt() {
    lives--;
    
    dead_x = frog_x;
    dead_y = frog_y;

    deadID = setInterval(function() {
        ctx.drawImage(deadImg, dead_x, dead_y);
    }, 1);

    stopDead = setTimeout(function() {
        clearInterval(deadID);
    }, 500);

    frog_x = frog_x_start;
    frog_y = frog_y_start;
    if(lives == 0) {
        //draw frog off the screen
        frog_x = 400;
        frog_y = 1000; 
    }
}

