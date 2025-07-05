function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/JUMP.mp3');
    jumpSound.setVolume(0.1);
    gamestartSound = loadSound('assets/GAME START.mp3');
    gamestartSound.setVolume(0.1);
    gameoverSound = loadSound('assets/GAME OVER.mp3');
    gameoverSound.setVolume(0.1);
    enemySound = loadSound('assets/ENEMY.mp3');
    enemySound.setVolume(0.1);
    endgameSound = loadSound('assets/ENDGAME.mp3');
    endgameSound.setVolume(0.1);
    collectibleSound = loadSound('assets/COLLECTIBLE.mp3');
    collectibleSound.setVolume(0.1);
    canyonSound = loadSound('assets/CANYON.mp3');
    canyonSound.setVolume(0.1);
}



var gameRobo_x;
var gameRobo_y;
//var jumpSound;

var cameraPosX;

var isLeft = false;
var isRight = false;
var isPlummeting = false;
var isFalling = false;
 
var floorPos_y; 

//background varriables
var star;
var moon; 
var ufo;
var planet;
var flagpole = { x: 6900, isReached: false };

var game_score;
var lives;

/////////////////////////////////////////////////////////function setup///////////////////////////////////////////////////////////////////


function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4.2;
    lives = 3; 
    startGame();
}

function startGame() {
    gamestartSound.play();
    gameRobo_x = 100;
    gameRobo_y = floorPos_y;
    flagpole.isReached = false;
    game_score = 0;
    cameraPosX=0;
    

    star =   {
        x: [0,1000,2000,3000,4000,5000,6000],
        y: 0,
    }

    moon = {
        x: [0,1000,2000,3000,4000,5000,6000],
        y: 0,
    }

    ufo = {
        x: [0,900,2000,3000,4000,5000,6000],
        y: 0,
    }

    planet = {
        x: [0,1000,2000,3000,4000,5000,6000],
        y: 0,
    }
   
    flagpole = {
    x: 6900, 
    isReached: false
};

    
    cameraPosX=0;
    
    diamond = [
        {
        x: 800,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 950,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 1000,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 1050,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 1200,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 1800,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 1950,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 2000,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 2050,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 2200,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 2800,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 2950,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 3000,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 3050,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 3200,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 3800,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 3950,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 4000,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 4050,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 4200,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 4800,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 4950,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 5000,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 5050,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 5200,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 5800,
        y: 312,
        size: 10,
        isFound: false
    },
        {
        x: 5950,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 6000,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 6050,
        y: 262,
        size: 10,
        isFound: false
    },
        {
        x: 6200,
        y: 312,
        size: 10,
        isFound: false
    },
        
        
        ]
    
    canyon = [
        {
        x: 500,
        y: 415,
        width:80,
        height: 300
    },
        {
        x: 1500,
        y: 415,
        width:80,
        height: 300
    },

        {
        x: 2500,
        y: 415,
        width:80,
        height: 300
    },

        {
        x: 3500,
        y: 415,
        width:80,
        height: 300
    },

        {
        x: 4500,
        y: 415,
        width:80,
        height: 300
    },

        {
        x: 5500,
        y: 415,
        width:80,
        height: 300
    },

        {
        x: 6500,
        y: 415,
        width:80,
        height: 300
    },
]
    platforms = [];
    newPlatforms();
    enemies = [];
    enemiesFormation();
    loop();
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function drawCanyons() {
     for (var i = 0; i < canyon.length; i++) {
        fill(0,0,0);
        triangle(canyon[i].x - 30, canyon[i].y, canyon[i].x - 80, canyon[i].y - 60, canyon[i].x - 30, 352);
        triangle(canyon[i].x + 40, canyon[i].y, canyon[i].x + 90, canyon[i].y - 60, canyon[i].x + 40, 352);
        rect(canyon[i].x - 30, canyon[i].y - 55, canyon[i].width, canyon[i].height);
    }
}
 
function drawmoon(){
//Moon surface
    for(var i =0; i < moon.x.length; i++){
    fill(220,220,220);
    noStroke();
    rect(moon.x[i]+0,moon.y+360,1024,255);
    
    fill(161,390);
    rect(moon.x[i]+0,moon.y+360,1024,56);
    
//    Top Layer
    fill(13,120,135);
    rect(moon.x[i]+0,moon.y+360,1024,12);


    //  moon
    
    fill(169,169,169);
    ellipse(moon.x[i]+70,moon.y+500,56);
    ellipse(moon.x[i]+370,moon.y+500,76);
    ellipse(moon.x[i]+170,moon.y+450,56);
    ellipse(moon.x[i]+210,moon.y+570,106);
    ellipse(moon.x[i]+1007,moon.y+460,56);
    ellipse(moon.x[i]+690,moon.y+520,86);
    ellipse(moon.x[i]+900,moon.y+590,156);
    ellipse(moon.x[i]+570,moon.y+450,96);}
    }

function drawstars(){
    //stars
    for(var i =0; i < star.x.length; i++){
    fill(255,255,255,255);
    ellipse(star.x[i]+70,star.y+30,2);
    ellipse(star.x[i]+570,star.y+20-0,2);
    ellipse(star.x[i]+270,star.y+150,2);
    ellipse(star.x[i]+310,star.y+270,2);
    ellipse(star.x[i]+107,star.y+160,2);
    ellipse(star.x[i]+790,star.y+220,2);
    ellipse(star.x[i]+800,star.y+290,2);
    ellipse(star.x[i]+470,star.y+150,2);
    ellipse(star.x[i]+70,star.y+200,2);
    ellipse(star.x[i]+370,star.y+200,2);
    ellipse(star.x[i]+170,star.y+150,2);
    ellipse(star.x[i]+210,star.y+270,2);
    ellipse(star.x[i]+1007,star.y+160,2);
    ellipse(star.x[i]+690,star.y + 220,2);
    ellipse(star.x[i]+900,star.y+290,2);
    ellipse(star.x[i]+570,star.y+150,2);}
}

function drawplanet(){
    //   blue planet 1
    for(var i =0; i < planet.x.length; i++){
    fill(0,0,138);
    ellipse(planet.x[i]+480,planet.y+120,200);
    
    //  planet 1
    fill(65,42,0);
    ellipse(planet.x[i]+560,planet.y+140,10);
    ellipse(planet.x[i]+530,planet.y+100,20);
    ellipse(planet.x[i]+500,planet.y+80,10);
    ellipse(planet.x[i]+550,planet.y+80,10);
    ellipse(planet.x[i]+520,planet.y+50,10);
    ellipse(planet.x[i]+500,planet.y+140,10);
    ellipse(planet.x[i]+430,planet.y+160,20);
    ellipse(planet.x[i]+430,planet.y+190,10);
    ellipse(planet.x[i]+520,planet.y+180,20);
    ellipse(planet.x[i]+480,planet.y+200,10);
    
//   planet 2
    fill(185,0,0);
    ellipse(planet.x[i]+350,planet.y+20,300);
    
    //planet 2 lines
    fill(129,0,0);
    rect(planet.x[i]+200,planet.y,160,12);
    rect(planet.x[i]+340,planet.y+30,160,12);
    rect(planet.x[i]+208,planet.y+60,260,12);
    rect(planet.x[i]+380,planet.y+90,100,12);
    rect(planet.x[i]+250,planet.y+120,100,12);
    rect(planet.x[i]+298,planet.y+150,100,12);
    
        
//planet 3
    fill(0,255,215);
    ellipse(planet.x[i]+860,planet.y+120,120);
    fill(0,220,200);
    ellipse(planet.x[i]+850,planet.y+120,80);
    fill(0,250,120);
    ellipse(planet.x[i]+850,planet.y+120,60);
    
    fill(27,63,45);
    ellipse(planet.x[i]+665,planet.y+60,60);}
}





function drawufo(){
    //space ship light
    for(var i =0; i < ufo.x.length; i++){
    fill(0,255,0);
    triangle(ufo.x[i]+98, ufo.y+215, ufo.x[i]+20, ufo.y+416, ufo.x[i]+188, ufo.y+416);

    //ufo
    fill(67,45,97);
    ellipse(ufo.x[i]+100, ufo.y+200, 200, 70);
    fill(255,255,0);  
    ellipse(ufo.x[i]+100, ufo.y+175, 100, 40);
    fill(255,0,0);  
    ellipse(ufo.x[i]+100, ufo.y+215, 25, 15);
    ellipse(ufo.x[i]+30, ufo.y+200, 25, 15);
    ellipse(ufo.x[i]+165, ufo.y+200, 25, 15);}
}

function renderFlagpole() {
    push(); 
    strokeWeight(2);
    stroke(0);
    fill(180);
    // Pole
    rect(flagpole.x, floorPos_y - 100, 5, 100); 

    // Flag
    if (flagpole.isReached) {
        fill(0, 255, 0); 
    } else {
        fill(255, 0, 0);
    }
    triangle(flagpole.x, floorPos_y - 100, flagpole.x, floorPos_y - 80, flagpole.x + 20, floorPos_y - 90);
    pop();
}

function checkFlagpole() {
    if (abs(gameRobo_x - flagpole.x) < 50) { 
        flagpole.isReached = true;
        gameoverSound.play();
    }
}

// This function should already adequately handle game reset when the player falls off the screen.
function checkPlayerDie() {
    if (gameRobo_y > height) {
        lives--;
        if (lives > 0) {
            startGame(); // Restart the game with one less life.
        } else {
            gameoverSound.play();
            noLoop(); // Stop the game loop, showing the game over message until reset.
        }
    }
}


function drawLives() {
    for (var i = 0; i < lives; i++) {
        fill(255, 0, 0); // Red heart for lives
        // Adjust positioning and size to your liking
        ellipse(40 + i * 30, 40, 20, 20); // Simple circle for demo, replace with heart or character icon as desired
    }
}




function ditchInteraction(canyon){
    
    if(gameRobo_x > canyon.x && gameRobo_x < canyon.x + canyon.width  && gameRobo_y >= floorPos_y)
        { 
            gameRobo_y += 50;
            isLeft = false;
            isRight = false;
            canyonSound.play();

        }
}
function diamondInteraction(diamond){
       if(dist(diamond.x, diamond.y, gameRobo_x, gameRobo_y) < 45)
    {
        diamond.isFound = true;
        game_score += 1;
        collectibleSound.play();
    }
   }
  
   function drawDiamond(diamond){ 
    // Draw a ruby gem
    fill(184, 134, 11); // Ruby color
    beginShape();
    vertex(diamond.x, diamond.y - diamond.size);
    vertex(diamond.x + diamond.size, diamond.y);
    vertex(diamond.x, diamond.y + diamond.size);
    vertex(diamond.x - diamond.size, diamond.y);
    endShape(CLOSE);
  
    // Draw a diamond shape inside the rubdiamond.y
    fill(255,255,255); // White color
    beginShape();
    vertex(diamond.x, diamond.y - diamond.size / 2);
    vertex(diamond.x + diamond.size / 2, diamond.y);
    vertex(diamond.x, diamond.y + diamond.size / 2);
    vertex(diamond.x - diamond.size / 2, diamond.y);
    endShape(CLOSE);
  
    // Draw a small circle to represent a sparkle
    fill(255, 255, 0); // Yellow color
    ellipse(diamond.x + diamond.size / 2, diamond.y - diamond.size / 2, diamond.size / 2, diamond.size / 2);

}

  /////////////////////////////////////////character rendering starts here/////////////////////////////////////////////////////
 function drawRobo(){
    push();
    if(isRight && isFalling)
    {    
        //char jumping right
        //right jump
        //main character
        //face
        stroke(10);
        fill(255,255,255);
        ellipse(gameRobo_x-32,gameRobo_y-65,28);
        fill(0,0,100);
        ellipse(gameRobo_x-21.5,gameRobo_y-65,8,20);
        fill(255,0,0);
        ellipse(gameRobo_x-31,gameRobo_y-65,7);
    
        //body
        fill(255,255,255);
        rect(gameRobo_x-40,gameRobo_y-49,15,25);
    
        //arms and neck
        rect(gameRobo_x-36,gameRobo_y-42,15,5);
        rect(gameRobo_x-32,gameRobo_y-49,15,5);
        rect(gameRobo_x-36,gameRobo_y-53,7.5,5);
        
        //hands
        fill(255,0,0);
        ellipse(gameRobo_x-17,gameRobo_y-39,8);
        ellipse(gameRobo_x-13,gameRobo_y-47,8);
    
    
        //shirt
        fill(0,0,100);
        rect(gameRobo_x-34,gameRobo_y-45,4,5);
        rect(gameRobo_x-34,gameRobo_y-37,4,5);
    
        //eyes
        fill(255,255,255);
        // rect(57,104,25,2);
        ellipse(gameRobo_x-21,gameRobo_y-60.5,5);
    
        //legs
        rect(gameRobo_x-40,gameRobo_y-25,6,5);
        rect(gameRobo_x-32,gameRobo_y-25,6,5);
        rect(gameRobo_x-35,gameRobo_y-21,9,5);
        rect(gameRobo_x-45,gameRobo_y-21,9,5);
        fill(255,0,0);
        rect(gameRobo_x-40,gameRobo_y-30,15,5);
        stroke(0);
        fill(255,0,0);
        rect(gameRobo_x-49,gameRobo_y-21,7,6);
        rect(gameRobo_x-40,gameRobo_y-21,7,6);
    }
    
    
 else if(isLeft && isFalling)
    {
        //left facing jump
        //main character
        //face 
        stroke(10);
        fill(255,255,255);
        ellipse(gameRobo_x-32,gameRobo_y-65,28);
        fill(0,0,100);
        ellipse(gameRobo_x-42,gameRobo_y-65,8,20);
        fill(255,0,0);
        ellipse(gameRobo_x-31,gameRobo_y-65,7);
    
        //body
        fill(255,255,255);
        rect(gameRobo_x-40,gameRobo_y-49,15,25);
    
        //arms and neck
        rect(gameRobo_x-52,gameRobo_y-42,15,5);
        rect(gameRobo_x-46,gameRobo_y-49,15,5);
        rect(gameRobo_x-36,gameRobo_y-53,7.5,5);
    
        //hands
        fill(255,0,0);
        ellipse(gameRobo_x-53,gameRobo_y-39,8);
        ellipse(gameRobo_x-50,gameRobo_y-47,8);
    

        //shirt
        fill(0,0,100);
        rect(gameRobo_x-34,gameRobo_y-45,4,5);
        rect(gameRobo_x-34,gameRobo_y-37,4,5);
    
        //eyes
        fill(255,0,0);
        rect(gameRobo_x-23,gameRobo_y-21,7,6);
        fill(255,255,255);
    //  rect(244,504,25,2);
        ellipse(gameRobo_x-42,gameRobo_y-60.5,5);
    
        //legs
        rect(gameRobo_x-40,gameRobo_y-25,6,5);
        rect(gameRobo_x-32,gameRobo_y-25,6,5);
        rect(gameRobo_x-32,gameRobo_y-21,9,5);
        rect(gameRobo_x-40,gameRobo_y-21,9,5);
        fill(255,0,0);
        rect(gameRobo_x-40,gameRobo_y-30,15,5);
        fill(255,0,0); 
        rect(gameRobo_x-32,gameRobo_y-21,7,6);
    }
    
    
    else if(isLeft) 
    {   
            //left
        //main character
        //face    
        stroke(10);
        fill(255,255,255);
        ellipse(gameRobo_x-32,gameRobo_y-65,28);
        fill(0,0,100);
        ellipse(gameRobo_x-42,gameRobo_y-65,8,20);
        fill(255,0,0);
        ellipse(gameRobo_x-31,gameRobo_y-65,7);
    
        //body
        fill(255,255,255);
        rect(gameRobo_x-40,gameRobo_y-49,15,25);

        //arms and neck
        rect(gameRobo_x-52,gameRobo_y-42,15,5);
        rect(gameRobo_x-46,gameRobo_y-49,15,5);
        rect(gameRobo_x-36,gameRobo_y-53,7.5,5);
    
        //hands
        fill(255,0,0);
        ellipse(gameRobo_x-53,gameRobo_y-39,8);
        ellipse(gameRobo_x-50,gameRobo_y-47,8);
    

        //shirt
        fill(0,0,100);
        rect(gameRobo_x-34,gameRobo_y-45,4,5);
        rect(gameRobo_x-34,gameRobo_y-37,4,5);
    
        //eyes
        fill(255,255,255);
        // rect(244,304,25,2);
        ellipse(gameRobo_x-42,gameRobo_y-60.5,5);
    
        //legs
        rect(gameRobo_x-40,gameRobo_y-21,6,10);
        rect(gameRobo_x-32,gameRobo_y-21,6,15);
        fill(255,0,0);
        rect(gameRobo_x-40,gameRobo_y-25,15,5);
        fill(255,0,0);
        rect(gameRobo_x-42,gameRobo_y-13,9,6);
        rect(gameRobo_x-34,gameRobo_y-11,9,6);
    }
    
    
    else if(isFalling)
    {
            //front facing jump
        //main character
        //face
        stroke(10);
        fill(255,0,0);
        ellipse(gameRobo_x-43,gameRobo_y-65,7);
        ellipse(gameRobo_x-17,gameRobo_y-65,7);
        fill(255,255,255);
        ellipse(gameRobo_x-30,gameRobo_y-65,28);
        fill(0,0,100);
        ellipse(gameRobo_x-30,gameRobo_y-65,23);
    
        //body
        fill(255,255,255);
        rect(gameRobo_x-38,gameRobo_y-49,15,25);
    
        //arms and neck
        rect(gameRobo_x-53,gameRobo_y-49,15,5);
        rect(gameRobo_x-23,gameRobo_y-49,15,5);
        rect(gameRobo_x-34,gameRobo_y-53,7.5,5);
    
        //hands
        fill(255,0,0);
        ellipse(gameRobo_x-51,gameRobo_y-47,8);
        ellipse(gameRobo_x-9,gameRobo_y-47,8);
    
    
        //shirt
        fill(0,0,100);
        rect(gameRobo_x-33.5,gameRobo_y-46,6,12);
        
        //eyes
        fill(255,255,255);
        rect(gameRobo_x-42,gameRobo_y-61,25,2);
        ellipse(gameRobo_x-35,gameRobo_y-60,5);
        ellipse(gameRobo_x-25,gameRobo_y-60,5);

        //legs
        fill(255,0,0);
        rect(gameRobo_x-37,gameRobo_y-19,7,6);
        rect(gameRobo_x-28,gameRobo_y-19,7,6);
        fill(255,255,255);
        rect(gameRobo_x-38,gameRobo_y-27,6,10);
        rect(gameRobo_x-29,gameRobo_y-27,6,10);
        fill(255,0,0);
        rect(gameRobo_x-38,gameRobo_y-29,15,5);
    }

        
        
    else if(isRight==true)
    {
        //right
        //main character      
        //face
        stroke(10);  
        fill(255,255,255);
        ellipse(gameRobo_x-32,gameRobo_y-65,28);
        fill(0,0,100);
        ellipse(gameRobo_x-21.5,gameRobo_y-65,8,20);
        fill(255,0,0);
        ellipse(gameRobo_x-31,gameRobo_y-65,7);
    
        //body
        fill(255,255,255);
        rect(gameRobo_x-40,gameRobo_y-49,15,25);
    
        //arms and neck
        rect(gameRobo_x-36,gameRobo_y-42,15,5);
        rect(gameRobo_x-32,gameRobo_y-49,15,5);
        rect(gameRobo_x-36,gameRobo_y-53,7.5,5);
    
        //hands
        fill(255,0,0);
        ellipse(gameRobo_x-17,gameRobo_y-39,8);
        ellipse(gameRobo_x-13,gameRobo_y-47,8);
    
        //shirt
        fill(0,0,100);
        rect(gameRobo_x-34,gameRobo_y-45,4,5);
        rect(gameRobo_x-34,gameRobo_y-37,4,5);
        
        //eyes
        fill(255,255,255);
        // rect(247,104,25,2);
        ellipse(gameRobo_x-21,gameRobo_y-60.5,5);
        
        //legs
        rect(gameRobo_x-40,gameRobo_y-21,6,15);
        rect(gameRobo_x-32,gameRobo_y-21,6,10);
        fill(255,0,0);
        rect(gameRobo_x-40,gameRobo_y-25,15,5);
        fill(255,0,0);
        rect(gameRobo_x-40,gameRobo_y-11,9,6);
        rect(gameRobo_x-32,gameRobo_y-11,9,6);
    }
   else
    {
        //Standing, facing frontwards
        //main character
        //face
        stroke(10);
        fill(255,0,0);
        ellipse(gameRobo_x-43,gameRobo_y-65,7);
        ellipse(gameRobo_x-17,gameRobo_y-65,7);
        fill(255,255,255);
        ellipse(gameRobo_x-30,gameRobo_y-65,28);
        fill(0,0,100);
        ellipse(gameRobo_x-30,gameRobo_y-65,23);
        
        //body
        fill(255,255,255);
        rect(gameRobo_x-38,gameRobo_y-49,15,25);
        
        //arms and neck
        rect(gameRobo_x-43,gameRobo_y-49,5,15);
        rect(gameRobo_x-23,gameRobo_y-49,5,15);
        rect(gameRobo_x-34,gameRobo_y-53,7.5,5);
        
        //hands
        fill(255,0,0);
        ellipse(gameRobo_x-41,gameRobo_y-31,8);
        ellipse(gameRobo_x-20,gameRobo_y-31,8);
        //black part
        fill(0,0,0);
        rect(gameRobo_x-38,gameRobo_y-47,1,11);
        rect(gameRobo_x-24,gameRobo_y-47,1,11);
        
        //shirt
        fill(0,0,100);
        rect(gameRobo_x-33.5,gameRobo_y-46,6,15);
        
        //eyes
        fill(255,255,255);
        rect(gameRobo_x-42,gameRobo_y-61,25,2);
        ellipse(gameRobo_x-35,gameRobo_y-60,5);
        ellipse(gameRobo_x-25,gameRobo_y-60,5);
        
        //legs
        rect(gameRobo_x-38,gameRobo_y-23,6,10);
        rect(gameRobo_x-29,gameRobo_y-23,6,10);
        fill(255,0,0);
        rect(gameRobo_x-38,gameRobo_y-27,15,5);
        fill(255,0,0);
        rect(gameRobo_x-38,gameRobo_y-13,7,6);
        rect(gameRobo_x-29,gameRobo_y-13,7,6);
    }
    pop();
 }
 
////////////////////////////////////////////////////////function draw///////////////////////////////////////////////////////////////////////
function draw ()
{
   
    cameraPosX=gameRobo_x-width/8;
    
//    Scenery
    background(0,0,0);

     push();
    translate(-cameraPosX,0);
drawmoon();
drawstars();
drawplanet();
drawufo();
drawCanyons();
renderFlagpole();
drawRobo();
checkPlayerDie();

    
    
    
    if (!flagpole.isReached) {
        checkFlagpole();
    }
    for(var i=0; i< platforms.length; i++)
        {
            platforms[i].draw();
        }
    
    for(var i=0; i< diamond.length;i++){
        if (diamond[i].isFound==false){
            diamondInteraction(diamond[i]);
            drawDiamond(diamond[i]);
        }
    }   
    
    for(var i = 0; i < canyon.length; i++){
        drawCanyons(canyon[i]);
    }
    
    for(var i = 0; i < canyon.length; i++){
        ditchInteraction(canyon[i]);
    }
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        
        // Check for contact with the player
        var isContact = enemies[i].checkContact(gameRobo_x, gameRobo_y);
        if (isContact) {
            enemySound.play();
            if (lives > 0) {
                lives--; // Decrement lives
                console.log("Lives left: " + lives);
                // Optionally reset the player to a safe state or position
                gameRobo_x = 100; // Example: Reset player position
                gameRobo_y = floorPos_y;
                
                if (lives === 0) {
                    // Handle game over state, such as stopping the game loop
                    console.log("Game Over");
                    noLoop(); // Stop drawing
                }
                
                // Break out of the loop to avoid multiple collisions at once
                break;
            }
        }
    }

pop();
 
    if (lives < 1) {
        fill(255, 0, 0); 
        textSize(32); 
        text("Game over! Press space to continue.", width / 2 - 220, height / 2); 
        noLoop(); 
        return; 
    }

    // Display "Level complete" message
    if (flagpole.isReached) {
        fill(0, 255, 0); 
        textSize(32); 
        text("Level completed!!! Press space to continue.", width / 2 - 240, height / 2); 
        noLoop(); 
        return;
    }
    drawLives();
    fill(255,255,0);
    noStroke();
    text("SCORE = " + game_score, 35, 25);
   
  /////////////////////////////////////////////character interaction code///////////////////////////////////////////////  
    
    if (isLeft) {
        gameRobo_x -= 10;
    }
    if (isRight) {
        gameRobo_x += 10;
    }
    // Correctly apply gravity and jumping logic
    if (gameRobo_y < floorPos_y) {
        let isContact = false; // Reset isContact to false at the beginning of the logic check
        for (var i = 0; i < platforms.length; i++) {
            if (platforms[i].checkContact(gameRobo_x, gameRobo_y) === true) {
                isContact = true;
                break;
            }
        }
        if (isContact === false) {
            isFalling = true;
            gameRobo_y += 5;
        }
    } else {
        isFalling = false;
        isPlummeting = false;
    }

    //mouse function
        fill(255,255,255);
        noStroke();
        text(mouseX + "," + mouseY, mouseX, mouseY);
    }



function keyPressed()
{
    
// console.log("keyPressed: "+key);
// console.log("keyPressed: "+keyCode);

    if(keyCode == 37){
        isLeft=true;
        console.log("L"+isLeft);
        
    }

    if(keyCode==39){
        isRight=true;
        console.log("R"+isRight);
    }

    if(keyCode==38 && isFalling){
        return 0;
    }
    else if(keyCode==38 && isPlummeting == false){
        isFalling=true;
        console.log("F"+isFalling);
        gameRobo_y -= 150;
        //jumpSound.play();
    }
    if (keyCode === 32) { 
        if (lives < 1 || flagpole.isReached) {
            if (lives < 1) {
                lives = 3; 
            }
            startGame(); 
            loop(); 
        }
    }
          
}

function keyReleased()
{
  
    if(keyCode == 37){
        isLeft=false;
        console.log("L"+isLeft);
        
    }

    if(keyCode==39){
        isRight=false;
        console.log("R"+isRight);
    }   

}
function createPlatform(x, y, width, height, color) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
        draw: function() {
            fill(this.color);
            rect(this.x, this.y, this.width, this.height);
        },
        // Define the checkContact method
        checkContact: function(playerX, playerY) {
            // Basic example: Check if player is above the platform and within its x bounds
            let platformTop = this.y;
            let platformLeft = this.x;
            let platformRight = this.x + this.width;
            // Adjust these conditions based on your game's logic
            if (playerX >= platformLeft && playerX <= platformRight && playerY >= platformTop) {
                return true;
            }
            return false;
        }
    };
}
function newPlatforms() {
    platforms.push(createPlatform(750, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(900, floorPos_y - 150, 200, 10, 'grey'));
    platforms.push(createPlatform(1150, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(1750, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(1900, floorPos_y - 150, 200, 10, 'grey'));
    platforms.push(createPlatform(2150, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(2750, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(2900, floorPos_y - 150, 200, 10, 'grey'));
    platforms.push(createPlatform(3150, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(3750, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(3900, floorPos_y - 150, 200, 10, 'grey'));
    platforms.push(createPlatform(4150, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(4750, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(4900, floorPos_y - 150, 200, 10, 'grey'));
    platforms.push(createPlatform(5150, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(5750, floorPos_y - 100, 100, 10, 'grey'));
    platforms.push(createPlatform(5900, floorPos_y - 150, 200, 10, 'grey'));
    platforms.push(createPlatform(6150, floorPos_y - 100, 100, 10, 'grey'));

}
function Enemy(x, y, range) {
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;

    // Corrected draw method
    this.draw = function() {
        // Update position before drawing
        this.update();

        // Drawing enemy representation
        stroke(0, 0, 0);
        fill(0);
        stroke(0, 0, 0);
    fill(0);
    arc(this.currentX + 0.17, this.y + 1.67, 5, 5, PI, TWO_PI, CHORD); // Left leg
    arc(this.currentX + 6.67, this.y + 1.67, 5, 5, PI, TWO_PI, CHORD); // Right leg

    // Body
    fill(255, 0, 252);
    ellipse(this.currentX + 3.33, this.y - 10, 21.67, 21.67); // Big body

    // Smile
    fill(0);
    arc(this.currentX + 3.33, this.y - 5, 10, 6.67, 0, QUARTER_PI, QUARTER_PI);

    // Eye outer
    fill(255, 255, 255);
    ellipse(this.currentX + 0.5, this.y - 10, 8.33, 8.33);
    
    // Eye inner
    fill(0, 0, 0);
    ellipse(this.currentX + 0.5, this.y - 11.67, 3.33, 3.33);
    
    // Eye sparkle
    fill(255, 255, 255);
    ellipse(this.currentX - 0.83, this.y - 11.67, 1.67, 1.67);
  
    };

    // Corrected update method
    this.update = function() {
        this.currentX += this.inc;

        // Reverse direction at the end of the range
        if(this.currentX >= this.x + this.range) {
            this.inc = -1;
        } else if(this.currentX <= this.x) {
            this.inc = 1;
        }
    };

    // Check if the enemy has come into contact with the player
    this.checkContact = function(gpX, gpY) {
        var d = dist(gpX, gpY, this.currentX, this.y);

        if(d < 30) { 
            return true;
        }
        return false;
    };
}


function enemiesFormation() {
    enemies = []; 
    for (let x = 225; x <= 4325; x += 300) {
        enemies.push(new Enemy(x, floorPos_y - 10, 100));
    }
}


    this.checkContact = function(gpX, gpY) {
        var d = dist(gpX, gpY, this.currentX, this.y);
        
        if(d < 10) { 
            return true;
        }
        return false;
    };

function enemiesFormation(){
    for (let x = 225; x <= 4325; x += 300) {
    enemies.push(new Enemy(x, floorPos_y - 10, 100));
    };
}

