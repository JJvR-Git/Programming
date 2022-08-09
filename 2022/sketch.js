/*

The Game Project 6 

*/

//  Character variables
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

//  Navigation variables
var isLeft;
var isRight;
var isFalling;
var isPlummeting;

//  Scenery variables
var trees_x;
var clouds;
var mountains;
var flagPole;

//  Interactive variables
var collectable;
var canyons;

//  Score Varoables
var game_score;
var lives;
var high_score;

//  Initiate game
function setup(){
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	
    lives = 3;
    
    high_score = 0;
    
    startGame();
}

function draw(){
//  Fill the sky blue.
	background(100, 155, 255);                             

//  Draw some green ground.
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4);   
    
//  Translate and scroll.
    push(); 
    translate(scrollPos, 0);
    
//  Draw Scenery
    drawClouds();                                             
    drawMountains();
    drawTrees();

//   Draw and check Interactables
    for(i = 0; i < canyons.length; i++){
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }

    for(i = 0; i < collectable.length; i++){
        if(collectable[i].isFound == false){
                drawCollectable(collectable[i]);
                checkCollectable(collectable[i]);
            };
    }
    
    renderFlagPole();
    
    pop();
	
//  Draw game character.
	drawGameChar();

//   Death screen.
    if(lives < 1){
       fill(0);
       noStroke();
       textSize(100);
       text("Game Over! \nPress Space \nto try again", 200, height/4);
       
        
       fill(255);
       noStroke();
       textSize(30);
       text("Your highest score: " + high_score, 200, 500);
        
       return;
   }
    
//  Win Screen.
    if(flagPole.isReached){
        fill(235, 235, 0);
        noStroke();
        textSize(100);
        text("You Win! \nPress Jump \nto Continue", 200, height/4);
        
        fill(255);
        noStroke();
        textSize(30);
        text("Your highest score: " + high_score, 200, 500);
        
        return;
    }

//   Logic to make the game character move / the background scroll.
    if(isLeft){
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight){
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5;
		}
	}

//  Logic to make the game character rise and fall.
    if(gameChar_y < floorPos_y){
        isFalling = true;
        
        gameChar_y += 3;
    }
    
    else {
        isFalling = false;
    }
    
    if(isPlummeting){
        gameChar_y += 10;
    }
//--------------------------------------------------------------------
// Interactions
//--------------------------------------------------------------------

//   Winning Condition.
    if (!flagPole.isReached)
    {
        checkFlagpole();
    }

//  Losing Condition.
    checkPlayerDie();

//  Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

//  Draw Life Hearts
    for(var i = 0; i < lives; i++){
        drawLife(i);
    }
}

//--------------------------------------------------------------------
// Key control functions
//--------------------------------------------------------------------

// Player input
function keyPressed(){
    
    if(key == "A" || keyCode == 37){
        isLeft = true;
    }
    
    if(key == "D" || keyCode == 39){
        isRight = true;
    }
    
    if(key == " " || key == "W"){
        if(!isFalling){
            gameChar_y -= 100;
        }
        
        if(flagPole.isReached){
            startGame();
        }
    }
}

function keyReleased(){
    
    if(key == "A" || keyCode == 37){
        isLeft = false;
    }

    if(key == "D" || keyCode == 39){
        isRight = false;
    }
}


//--------------------------------------------------------------------
// Game character and Score render function
//--------------------------------------------------------------------

// Function to draw the game character
function drawGameChar(){
        if(isLeft && isFalling){
            // add your jumping-left code
            //Head
            fill(255, 229, 204);
            ellipse(gameChar_x, gameChar_y - 58, 35);
            //nose
            triangle(gameChar_x - 25, gameChar_y - 70, gameChar_x + 5, gameChar_y - 33, gameChar_x - 10, gameChar_y - 70);
            //Legs
            fill(10);
            rect(gameChar_x - 10 , gameChar_y - 10, 8,12);
            rect(gameChar_x +7, gameChar_y - 10, 8, 12);
            //Body
            fill(200, 0, 0);
            rect(gameChar_x - 11, gameChar_y - 41, 22, 34);

        }
        else if(isRight && isFalling){
            // add your jumping-right code
            //Head
            fill(255, 229, 204);
            ellipse(gameChar_x, gameChar_y - 58, 35);
            //nose
            triangle(gameChar_x -5, gameChar_y - 33, gameChar_x + 25, gameChar_y - 70, gameChar_x + 10, gameChar_y - 70);
            //Legs
            fill(10);
            rect(gameChar_x - 14 , gameChar_y - 10, 8, 12);
            rect(gameChar_x + 4, gameChar_y - 10, 8, 12);
            //Body
            fill(200, 0, 0);
            rect(gameChar_x - 8, gameChar_y - 41, 22, 34);
            rect(gameChar_x - 13, gameChar_y - 41, 26, 34);

        }
        else if(isLeft){
            // add your walking left code
            //Head
            fill(255, 229, 204);
            ellipse(gameChar_x, gameChar_y - 58, 35);
            //nose
            triangle(gameChar_x - 25, gameChar_y - 53, gameChar_x + 5, gameChar_y - 53, gameChar_x - 10, gameChar_y - 70);
            //Body
            fill(200, 0, 0);
            rect(gameChar_x - 11, gameChar_y - 41, 22, 34);
            //Legs
            fill(10);
            rect(gameChar_x - 20 , gameChar_y - 6, 12, 8);
            rect(gameChar_x, gameChar_y - 6, 12, 8);
        }
        else if(isRight){
            // add your walking right code
            //Head
            fill(255, 229, 204);
            ellipse(gameChar_x, gameChar_y - 58, 35);
            //nose
            triangle(gameChar_x - 5, gameChar_y - 53, gameChar_x + 25, gameChar_y - 53, gameChar_x + 10, gameChar_y - 70);
            //Body
            fill(200, 0, 0);
            rect(gameChar_x - 13, gameChar_y - 41, 26, 34);
            //Legs
            fill(10);
            rect(gameChar_x - 13 , gameChar_y - 6, 12, 8);
            rect(gameChar_x + 7 , gameChar_y - 6, 12, 8);
        }
        else if(isFalling || isPlummeting){
            // add your jumping facing forwards code
            //Head
            fill(255, 229, 204);
            ellipse(gameChar_x, gameChar_y - 58, 35);
            //nose
            stroke(5);
            triangle(gameChar_x - 5, gameChar_y - 60, gameChar_x + 5, gameChar_y - 60, gameChar_x, gameChar_y - 70);
            noStroke();
            //Legs
            fill(10);
            rect(gameChar_x - 15 , gameChar_y - 10, 8, 12);
            rect(gameChar_x + 7 , gameChar_y - 10, 8, 12);
            //Body
            fill(200, 0, 0);
            rect(gameChar_x - 13, gameChar_y - 41, 26, 34);
        }
        else{
            // add your standing front facing code
            //Head
            fill(255, 229, 204);
            ellipse(gameChar_x, gameChar_y - 58, 35);
            //nose
            stroke(5);
            triangle(gameChar_x - 5, gameChar_y - 53, gameChar_x + 5, gameChar_y - 53, gameChar_x, gameChar_y - 63);
            noStroke();
            //Body
            fill(200, 0, 0);
            rect(gameChar_x - 13, gameChar_y - 41, 26, 34);
            //Legs
            fill(10);
            rect(gameChar_x - 20 , gameChar_y - 6, 12, 8);
            rect(gameChar_x + 7 , gameChar_y - 6, 12, 8);
        }
    
//      Output Game Score.
        fill(230);
        noStroke();
        textSize(20);
        text("Score: " + game_score, 50, 80);
    
//      Output High score.
        fill(230);
        noStroke();
        textSize(20);
        text("Your highest score: " + high_score, 50, 105);
}

//--------------------------------------------------------------------
// Background render functions
//--------------------------------------------------------------------

// Function to draw cloud objects.
function drawClouds(){
    for(var i = 0; i < clouds.length; i++){
        fill(255);
        ellipse(clouds[i].x_pos - scrollPos + scrollPos/5, clouds[i].y_pos, 80, 50);
        ellipse(clouds[i].x_pos - scrollPos + scrollPos/5 + 30 * clouds[i].size, clouds[i].y_pos + 5 * clouds[i].size, 80 * clouds[i].size, 60 * clouds[i].size);
        ellipse(clouds[i].x_pos - scrollPos + scrollPos/5 - 20 * clouds[i].size, clouds[i].y_pos + 5 * clouds[i].size, 80 * clouds[i].size, 50 * clouds[i].size);
        ellipse(clouds[i].x_pos - scrollPos + scrollPos/5 + 30 * clouds[i].size, clouds[i].y_pos + 15 * clouds[i].size, 70 * clouds[i].size, 50 * clouds[i].size);
        ellipse(clouds[i].x_pos - scrollPos + scrollPos/5 - 40 * clouds[i].size, clouds[i].y_pos + 15 * clouds[i].size, 80 * clouds[i].size, 50 * clouds[i].size);
        ellipse(clouds[i].x_pos - scrollPos + scrollPos/5 + 10 * clouds[i].size, clouds[i].y_pos + 20 * clouds[i].size, 80 * clouds[i].size, 50 * clouds[i].size);
    }
}

// Function to draw mountains objects.
function drawMountains(){
    for(var i = 0; i < mountains.length; i++){
        fill(100, 60, 20);
        triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos + 300 * mountains[i].size, mountains[i].y_pos, mountains[i].x_pos + 200 * mountains[i].size, mountains[i].y_pos - 200 * mountains[i].size);
        triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos + 200 * mountains[i].size, mountains[i].y_pos, mountains[i].x_pos + 100 * mountains[i].size, mountains[i].y_pos - 150 * mountains[i].size);
    }
}

// Function to draw trees objects.
function drawTrees(){
    for(var i = 0; i < trees_x.length; i++ ){
            //trunk
            fill(130, 80, 20);
            rect(trees_x[i], floorPos_y - 300,  50, 300);

            //Branches
            fill(0,120,0);
            triangle(trees_x[i] - 50, floorPos_y - 300 + 50, trees_x[i] + 100, floorPos_y - 300 + 50, trees_x[i] + 25, floorPos_y - 300 - 50);
            triangle(trees_x[i] - 75, floorPos_y - 300 + 150, trees_x[i] + 125, floorPos_y - 300 + 150, trees_x[i] + 25, floorPos_y - 300 - 25);
            triangle(trees_x[i] - 100, floorPos_y - 300 + 250, trees_x[i] + 150, floorPos_y - 300 + 250, trees_x[i] + 25, floorPos_y - 300);
    }
}


//--------------------------------------------------------------------
// Canyon render and check functions
//--------------------------------------------------------------------

// Function to draw canyon objects
function drawCanyon(t_canyon){
        fill(150, 200, 50);
        triangle(t_canyon.x_pos, floorPos_y, t_canyon.x_pos + t_canyon.width, floorPos_y, t_canyon.x_pos, floorPos_y + 500);
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon){
        if(gameChar_world_x - 20 > t_canyon.x_pos && gameChar_world_x + 15 < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y){
            isPlummeting = true;
        }
}

//--------------------------------------------------------------------
// Collectable items render and check functions
//--------------------------------------------------------------------

// Functions to draw and check collectable objects.
function drawCollectable(t_collectable){
        fill(230,0,0);
        strokeWeight(10 * (t_collectable.size/50));
        stroke(255,255,0);
        ellipse(t_collectable.x_pos, t_collectable.y_pos,90 * (t_collectable.size/50), 90 * (t_collectable.size/50));
        fill(255);
        noStroke();
        rect(t_collectable.x_pos - 30 * (t_collectable.size/50), t_collectable.y_pos - 10 * ( t_collectable.size/50), 60 * (t_collectable.size/50), 20 * (t_collectable.size/50));
        rect(t_collectable.x_pos - 10 * (t_collectable.size/50), t_collectable.y_pos - 30 * ( t_collectable.size/50), 20 * (t_collectable.size/50), 60 * (t_collectable.size/50));
        strokeWeight(1);
}

function checkCollectable(t_collectable){
    if (dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size){
            t_collectable.isFound = true;
            game_score += 1;
        }
}
//--------------------------------------------------------------------
// Flagpole render and check functions
//--------------------------------------------------------------------

// Function to draw and check Flag Pole
function renderFlagPole(){ 
    push();
    strokeWeight(10);
    stroke(100);
    line( flagPole.x_pos, floorPos_y, flagPole.x_pos, floorPos_y - 300); 
    pop();
    
//  Draw pole at the Top.
    if(flagPole.isReached){
        fill(250, 0, 0);
        triangle(flagPole.x_pos, floorPos_y - 300, flagPole.x_pos, floorPos_y - 240, flagPole.x_pos + 100, floorPos_y - 270);
    }
//  Draw the Flag at the Bottom.
    else{
        fill(250, 0, 0);
        triangle(flagPole.x_pos, floorPos_y - 60, flagPole.x_pos, floorPos_y, flagPole.x_pos + 100, floorPos_y - 30);
    }
}

function checkFlagpole(){   
    var d = abs(gameChar_world_x - flagPole.x_pos);            
    
    if(d <= 15){
            if(game_score > high_score){
                high_score = game_score;
            }
            
            flagPole.isReached = true;
        }
}
//--------------------------------------------------------------------
// Function to check Losing Condition. ( and Score)
//--------------------------------------------------------------------
function checkPlayerDie(){
    if(gameChar_y > height){
            lives -= 1;
            
            if(game_score > high_score){
                high_score = game_score;
            }
        }
    
    if(lives > 0 && gameChar_y > height){
            startGame();
        }
    
}

// Function to start the Game (initialise everything).
function startGame(){
// Initialize Character Position
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
//  Initialize game Score
    game_score = 0;
//  Variable to control the background scrolling
	scrollPos = 0;

//  Variable to store the real position of the gameChar in the game world. Needed for collision detection
	gameChar_world_x = gameChar_x - scrollPos;

//  Boolean variables to control the movement of the game character
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    
//--------------------------------------------------------------------
// Initialise arrays of scenery objects.
//--------------------------------------------------------------------
    
//  Tree Object
    trees_x = [];
    for(var i = 0; i < random(15, 50); i++)
    {
        trees_x[i] = random(-1000, 3000);
    }
    
//  Cloud Objects
    clouds = [];
    for(var i = 0; i < random(4, 8); i++){
        clouds[i] = {x_pos: random(0 , 900),
                     y_pos: random(50 , 300),
                     size: random(0.7 , 1.8)
                    };
    }

//  Mountain Objects.
    mountains = [];                                         
    for(var i = 0; i < random(2, 5); i++){
        mountains[i] = {x_pos: random(-1000 , 3000),
                        y_pos: floorPos_y,
                        size: random(0.7 , 4)
                       };
    }
    
//  Collectable Objects.
    collectable = []
    for(var i = 0; i < 10; i++){
            collectable[i] = {x_pos: random(-1000, 2000),y_pos: floorPos_y - 100, size: 25,isFound: false};
        };     
    
//  Canyon Objects.
    canyons = [];                                           
    for(var i = 0; i < 5; i++){
        canyons[i] = {x_pos: random(-1000, 2000), 
                      width: random(50, 100)
                     };
        
//      Canyons don't spawn under Player
        if(canyons[i].x_pos >= 400 && canyons[i].x_pos <= 550 )
        {
            canyons[i].x_pos += 100;
        }
    }

//  Place Flagpole.
    flagPole = {isReached: false, x_pos: 1000};
}

// Function to Draw Lives.
function drawLife(lives){
    fill(255, 0, 0);
    ellipse( 50 + lives * 60, 30, 20);
    ellipse( 60 + lives * 60, 30, 20);
    triangle(45 + lives * 60, 38, 65 + lives * 60, 38, 55 + lives * 60, 50 );
}