/*
    The claiming caves
    
        I have added a number of changes using the random function to give the game a bit more variety, this includes the number of objects being placed, their sizes and their locations. 
        The random function is also used to add visual effects to my collectables and enemies 
        2 different grass objects are made, one for the foreground and one for the background. I initially struggled with the concept of “ push( ) ” and “ pop( ) ”, but after using it I see how valuable it is. 
        Functions are in place to prevent the player from spawning over an canyon or enemy. Grass also does not spawn over an canyon.  
        I have added a power up, which increases your jump height 
        A platform is spawned with each of my enemies, to ensure the player can get past them. 
        Using arrays of objects with their own methods is a valuable skill I learned.  
*/

// Game Character and world variables
var gameCharX;
var gameCharY;
var floorY;
var scrollPos;
var gameChar_world_x;
var floorEdge;

// Movement variables
var isLeft;
var isRight;
var isFalling;
var isPlummeting;

// Scenery variables
var shrooms;
var clouds;
var stelagmites;
var grassFore;
var grassBack;
var clouds;

// Interactive variables
var collectable;
var canyons;
var platforms;

// Score and Mechanic variables
var game_score;
var high_score;
var flagPole;
var lives;
var endGame;
var jumpHeight;
var powerUp;

// Enemy variables
var enemies;

// Sound variables
var jumpSound;
var caveTrack;
var fallSound;
var gameOver;
var goldSound;
var painSound;
var pwrUp;
var winTrack;

// Sound loading
function preload()
{
    soundFormats('mp3','wav');
    
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    
    fallSound = loadSound('assets/fall.wav');
    fallSound.setVolume(0.1);
    
    gameOver = loadSound('assets/gameOver.wav');
    gameOver.setVolume(0.1);
    
    goldSound = loadSound('assets/gold.wav');
    goldSound.setVolume(0.1);
    
    painSound = loadSound('assets/hurt.wav');
    painSound.setVolume(0.1);
    
    pwrUp = loadSound('assets/powerUp.wav');
    pwrUp.setVolume(0.1);
    
    winTrack = loadSound('assets/win.wav');
    winTrack.setVolume(0.2);
}

function setup()
{
	createCanvas(1024, 576);
	floorY = height * 3/4;
    floorEdge = 475;
    startGame();
}

function draw()
{
    // Fill Cave Background
	background(97, 95, 78);                          

    // Draw Cave Floor
	noStroke();
	fill(77,75,58);
	rect(0, floorY, width, height/4);
    
    fill(0);
	rect(0, floorEdge, width, height - floorEdge);
    
    // Draw Cave Ceiling
    fill(50);
    rect(0,0, width, 80);
    
    // Translate and scroll.
    push();                                                
    translate(scrollPos, 0);                                       
     
    // Draw stelagmites.
    drawStelagmites();   
    
    // Draw stelagtites.
    drawStelagtites(); 

    // Draw Shrooms.
    drawShrooms();
    
    //Draw BackGround grass
    drawGrassBack();

    // Draw Platforms
    for(var i = 0; i < platforms.length; i++)                 
        {
            platforms[i].draw();
        }
    
    // Draw canyons.
    for(i = 0; i < canyons.length; i++)                    
        {
            drawCanyon(canyons[i]);
            checkCanyon(canyons[i]);
        }

    // Draw collectable items.
    for(i = 0; i < collectable.length; i++)                    
        {
            if(collectable[i].isFound == false)
               {
                    collectable[i].draw();
                    collectable[i].checkFound(gameChar_world_x, gameCharY);
               }
        }
    
    if(powerUp.isFound == false)
       {
           powerUp.draw();
           powerUp.checkFound(gameChar_world_x, gameCharY);
       }

    //--------------------------------
    // Draw Enemies.
    //--------------------------------
    for(i = 0; i < enemies.length; i++)                    
        {
            enemies[i].draw();
            var isContact = enemies[i].checkContact(gameChar_world_x, gameCharY);
            if(isContact)
                {
                    if(lives > 0)
                        {
                            painSound.play();
                            loseLife();
                        }
                }
        }
    
    // Draw flag pole.
    renderFlagPole(); 
    
    pop();                                                 
	
    // Draw game character.
	drawGameChar();
    
    // Draw Grass in the ForeGround
    push();
    translate(scrollPos, 0);    
    drawGrassFore();
    pop();
    
    // Draw Life Hearts
    for(var i = 0; i < lives; i++)                          
        {
            drawLife(i);
        }
    
    // Death screen.
    if(lives < 1)                                          
        {
            fill(0);
            rect(0, 0, width, height);
            
            fill(255, 0, 0);
            noStroke();
            textSize(80);
            text("The cave claims another", 70, 200);

            fill(255);
            noStroke();
            textSize(30);
            text("Your highest score: " + high_score, 350, 500);
            
            fill(255, 0, 0);
            noStroke();
            textSize(30);
            text("Press Space to try again", 350, 300);
            
            endGame = true;
       }
    
    // Win Screen.
    if(flagPole.isReached)                                 
        {
            fill(0, 200, 200);
            rect(0, 0, width, height); 
            fill(10, 150, 10);
            rect(0, floorY, width, 300);
            
            drawClouds();
            
            for(var i = 0; i < clouds.length; i ++)
                {
                    if(clouds[i].x > 1200)
                        {
                            clouds[i].x = -200;
                        }
                    clouds[i].x ++;
                }
            
            fill(255);
            noStroke();
            textSize(100);
            text("You Win!", 320, height/4);

            fill(255);
            noStroke();
            textSize(30);
            text("Your highest score: " + high_score, 350, 500);
            
            fill(255);
            noStroke();
            textSize(30);
            text("Press Space to try again", 350, 300);
            
            
            
            drawGameChar();
            
            endGame = true;
        }
    
    // Logic to make the game character move / the background scroll.
    if(isLeft)                                             
        {
            if(isPlummeting)
                {
                    if(gameCharX > width * 0.2)
                        {
                            gameCharX -= 1;
                        }
                    else{
                            scrollPos += 1;
                        }
                }
            else
                {
                    if(gameCharX > width * 0.2)
                        {
                            gameCharX -= 5;
                        }
                    else{
                            scrollPos += 5;
                        }
                }
        }

    // negative for moving against the background
	if(isRight)
        {
            if(isPlummeting)
                {
                    if(gameCharX < width * 0.8)
                        {
                            gameCharX += 1;
                        }
                    else{
                            scrollPos -= 1;
                        }
                }
            else
                {
                    if(gameCharX < width * 0.8)
                        {
                            gameCharX += 5;
                        }
                    else{
                            scrollPos -= 5;
                        }
                }
        }

    // Logic to make the game character rise and fall.
    if(gameCharY < floorY)                             
        {
            isFalling = false;
            var isContact = false;
            for(var i = 0; i < platforms.length; i++)
                {
                    if(platforms[i].checkContact(gameChar_world_x, gameCharY) == true)
                        {
                            isContact = true;
                            break;
                        }
                }
            // Gravity Logic
            if(isContact == false)                                       
                {
                    gameCharY += 3;
                    isFalling = true;
                }
        }
    else
        {
            isFalling = false;
        }
    
    if(isPlummeting)
        {
            gameCharY += 5;
        }
    //--------------
    // Interactions
    //--------------
    
    // Check end Conditions
    
    // Winning Condition.
    if (!flagPole.isReached)                                
        {
            checkFlagpole();
        }
    // Losing Condition.
    checkPlayerDie();                                       

    // Update real position of gameChar for collision detection.
	gameChar_world_x = gameCharX - scrollPos;                 
}

// Key control functions.
function keyPressed(){
    
// if statements to control the animation of the character when keys are pressed.
    
    if(key == "A" || keyCode == 37)
        {
            isLeft = true;
        }
    
    if(key == "D" || keyCode == 39)
        {
            isRight = true;
        }
    
    if(key == " " || key == "W")
        {
            if(!isFalling && !isPlummeting)
                {
                    gameCharY -= jumpHeight;
                    jumpSound.play();
                }
            
            if(endGame)
                {
                    gameOver.stop();
                    winTrack.stop();
                    startGame();
                }
        }
}

function keyReleased()
{
    
// if statements to control the animation of the character when keys are released.
    
    if(key == "A" || keyCode == 37)
        {
            isLeft = false;
        }

    if(key == "D" || keyCode == 39)
        {
            isRight = false;
        }
}

// Game character and Score render function.

function drawGameChar()                                     
{
    if(isLeft && isFalling)
        {
            //Head
            fill(255, 229, 204);
            ellipse(gameCharX, gameCharY - 58, 35);
            //nose
            triangle(gameCharX - 25, gameCharY - 70, gameCharX + 5, gameCharY - 33, gameCharX - 10, gameCharY - 70);
            //Legs
            fill(10);
            rect(gameCharX - 10 , gameCharY - 10, 8,12);
            rect(gameCharX +7, gameCharY - 10, 8, 12);
            //Body
            fill(200, 0, 0);
            rect(gameCharX - 11, gameCharY - 41, 22, 34, 20);
            
            // Hat
            fill(255, 255, 0);
            stroke(5);
            beginShape();
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 10, gameCharY - 75);
            curveVertex(gameCharX, gameCharY - 80);
            curveVertex(gameCharX + 10, gameCharY - 75);
            curveVertex(gameCharX + 20, gameCharY - 63);
            curveVertex(gameCharX + 20, gameCharY - 63);
            endShape();
            
            fill(0);
            stroke(5);
            beginShape();
            vertex(gameCharX - 10, gameCharY - 87);
            vertex(gameCharX + 10, gameCharY - 80);
            vertex(gameCharX + 11, gameCharY - 77);
            vertex(gameCharX + 10, gameCharY - 74);
            vertex(gameCharX - 10, gameCharY - 73);
            endShape();

            fill(255);
            ellipse(gameCharX - 10, gameCharY - 80, 10, 15); 
            
            fill(255, 255, 0, 100);
            noStroke();
            beginShape();
            vertex(gameCharX - 10, gameCharY - 87);
            vertex(gameCharX - 180, gameCharY - 167);
            vertex(gameCharX - 210, gameCharY - 67);
            vertex(gameCharX - 10, gameCharY - 73);
            endShape();
        }
    else if(isRight && isFalling)
        {
            // add your jumping-right code
            //Head
            fill(255, 229, 204);
            ellipse(gameCharX, gameCharY - 58, 35);
            //nose
            triangle(gameCharX -5, gameCharY - 33, gameCharX + 25, gameCharY - 70, gameCharX + 10, gameCharY - 70);
            //Legs
            fill(10);
            rect(gameCharX - 14 , gameCharY - 10, 8, 12);
            rect(gameCharX + 4, gameCharY - 10, 8, 12);
            //Body
            fill(200, 0, 0);
            rect(gameCharX - 8, gameCharY - 41, 22, 38, 10);
            
            // Hat
            fill(255, 255, 0);
            stroke(5);
            beginShape();
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 10, gameCharY - 75);
            curveVertex(gameCharX, gameCharY - 80);
            curveVertex(gameCharX + 10, gameCharY - 75);
            curveVertex(gameCharX + 20, gameCharY - 63);
            curveVertex(gameCharX + 20, gameCharY - 63);
            endShape();
            
            fill(0);
            stroke(5);
            beginShape();
            vertex(gameCharX + 10, gameCharY - 87);
            vertex(gameCharX - 10, gameCharY - 80);
            vertex(gameCharX - 11, gameCharY - 77);
            vertex(gameCharX - 10, gameCharY - 74);
            vertex(gameCharX + 10, gameCharY - 73);
            endShape();

            fill(255);
            ellipse(gameCharX + 10, gameCharY - 80, 10, 15); 
            
            fill(255, 255, 0, 100);
            noStroke();
            beginShape();
            vertex(gameCharX + 10, gameCharY - 87);
            vertex(gameCharX + 180, gameCharY - 167);
            vertex(gameCharX + 210, gameCharY - 67);
            vertex(gameCharX + 10, gameCharY - 73);
            endShape();
        }
    else if(isLeft)
        {
            //Head
            fill(255, 229, 204);
            ellipse(gameCharX, gameCharY - 58, 35);
            //nose
            triangle(gameCharX - 25, gameCharY - 53, gameCharX + 5, gameCharY - 53, gameCharX - 10, gameCharY - 70);
            //Body
            fill(200, 0, 0);
            rect(gameCharX - 11, gameCharY - 41, 22, 38, 10);
            //Legs
            fill(10);
            rect(gameCharX - 20 , gameCharY - 6, 12, 8);
            rect(gameCharX, gameCharY - 6, 12, 8);
            
            // Hat
            fill(255, 255, 0);
            stroke(5);
            beginShape();
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 10, gameCharY - 75);
            curveVertex(gameCharX, gameCharY - 80);
            curveVertex(gameCharX + 10, gameCharY - 75);
            curveVertex(gameCharX + 20, gameCharY - 63);
            curveVertex(gameCharX + 20, gameCharY - 63);
            endShape();
            
            fill(0);
            stroke(5);
            beginShape();
            vertex(gameCharX - 10, gameCharY - 87);
            vertex(gameCharX + 10, gameCharY - 83);
            vertex(gameCharX + 11, gameCharY - 80);
            vertex(gameCharX + 10, gameCharY - 77);
            vertex(gameCharX - 10, gameCharY - 73);
            endShape();

            fill(255);
            ellipse(gameCharX - 10, gameCharY - 80, 10, 15); 
            
            fill(255, 255, 0, 100);
            noStroke();
            beginShape();
            vertex(gameCharX - 10, gameCharY - 87);
            vertex(gameCharX - 210, gameCharY - 127);
            vertex(gameCharX - 210, gameCharY - 37);
            vertex(gameCharX - 10, gameCharY - 73);
            endShape();
        }
    else if(isRight)
        {
            //Head
            fill(255, 229, 204);
            ellipse(gameCharX, gameCharY - 58, 35);
            //nose
            triangle(gameCharX - 5, gameCharY - 53, gameCharX + 25, gameCharY - 53, gameCharX + 10, gameCharY - 70);
            //Body
            fill(200, 0, 0);
            rect(gameCharX - 13, gameCharY - 41, 26, 38, 10);
            //Legs
            fill(10);
            rect(gameCharX - 13 , gameCharY - 6, 12, 8);
            rect(gameCharX + 7 , gameCharY - 6, 12, 8);
            
            // Hat
            fill(255, 255, 0);
            stroke(5);
            beginShape();
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 10, gameCharY - 75);
            curveVertex(gameCharX, gameCharY - 80);
            curveVertex(gameCharX + 10, gameCharY - 75);
            curveVertex(gameCharX + 20, gameCharY - 63);
            curveVertex(gameCharX + 20, gameCharY - 63);
            endShape();
            
            fill(0);
            stroke(5);
            beginShape();
            vertex(gameCharX + 10, gameCharY - 87);
            vertex(gameCharX - 10, gameCharY - 83);
            vertex(gameCharX - 11, gameCharY - 80);
            vertex(gameCharX - 10, gameCharY - 77);
            vertex(gameCharX + 10, gameCharY - 73);
            endShape();

            fill(255);
            ellipse(gameCharX + 10, gameCharY - 80, 10, 15); 
            
            fill(255, 255, 0, 100);
            noStroke();
            beginShape();
            vertex(gameCharX + 10, gameCharY - 87);
            vertex(gameCharX + 210, gameCharY - 127);
            vertex(gameCharX + 210, gameCharY - 37);
            vertex(gameCharX + 10, gameCharY - 73);
            endShape();
        }
    else if(isFalling || isPlummeting)
        {
            //Head
            fill(255, 229, 204);
            ellipse(gameCharX, gameCharY - 58, 35);
            //Legs
            fill(10);
            rect(gameCharX - 15 , gameCharY - 10, 8, 12);
            rect(gameCharX + 7 , gameCharY - 10, 8, 12);
            //Body
            fill(200, 0, 0);
            rect(gameCharX - 13, gameCharY - 41, 26, 38, 10);
            
            // Hat
            fill(255, 255, 0);
            stroke(5);
            beginShape();
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 10, gameCharY - 75);
            curveVertex(gameCharX, gameCharY - 80);
            curveVertex(gameCharX + 10, gameCharY - 75);
            curveVertex(gameCharX + 20, gameCharY - 63);
            curveVertex(gameCharX + 20, gameCharY - 63);
            endShape();

            fill(255);
            ellipse(gameCharX, gameCharY - 80, 15, 10); 
            
            fill(255, 255, 0, 100);
            noStroke();
            beginShape();
            vertex(gameCharX - 7, gameCharY - 80);
            vertex(gameCharX + 7, gameCharY - 80);
            vertex(gameCharX + 40, gameCharY - 280);
            vertex(gameCharX - 40, gameCharY - 280);
            endShape();
            
            //nose
            fill(255, 229, 204);
            stroke(5);
            triangle(gameCharX - 5, gameCharY - 60, gameCharX + 5, gameCharY - 60, gameCharX, gameCharY - 70);
            noStroke();
        }
    else{
            //Head
            fill(255, 229, 204);
            ellipse(gameCharX, gameCharY - 58, 35);
            //nose
            stroke(5);
            triangle(gameCharX - 5, gameCharY - 53, gameCharX + 5, gameCharY - 53, gameCharX, gameCharY - 63);
            noStroke();
            //Body
            fill(200, 0, 0);
            rect(gameCharX - 13, gameCharY - 41, 26, 38, 10);
            //Legs
            fill(10);
            rect(gameCharX - 20 , gameCharY - 6, 12, 8);
            rect(gameCharX + 7 , gameCharY - 6, 12, 8);

            // Hat
            fill(255, 255, 0);
            stroke(5);
            beginShape();
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 20, gameCharY - 63);
            curveVertex(gameCharX - 10, gameCharY - 75);
            curveVertex(gameCharX, gameCharY - 80);
            curveVertex(gameCharX + 10, gameCharY - 75);
            curveVertex(gameCharX + 20, gameCharY - 63);
            curveVertex(gameCharX + 20, gameCharY - 63);
            endShape();

            fill(255);
            ellipse(gameCharX, gameCharY - 80, 15);
        
            fill(255, 255, 0, 100);
            noStroke();
            ellipse(gameCharX, gameCharY - 80, 30);


        }
    
    
// Output Game Score.
    fill(230);
    noStroke();
    textSize(20);
    text("Score: " + game_score, 50, 80);
// Output High score.
    fill(230);                                          
    noStroke();
    textSize(20);
    text("High score: " + high_score, 50, 105);
}

// ---------------------------
// Background render functions.
// ---------------------------

// Function to draw stelagmite objects.
function drawStelagmites()                                    
{
    for(var i = 0; i < stelagmites.length; i++)
        {
            fill(80, 75, 60);
            for(var j = 10; j > 0; j-- )
                {
                    ellipse(stelagmites[i].x, stelagmites[i].y + j * stelagmites[i].size - 10 * stelagmites[i].size, j * stelagmites[i].size, 2 * stelagmites[i].size);
                }

        }
}

// Function to draw stelagtite objects.
function drawStelagtites()                                    
{
    for(var i = 0; i < stelagtites.length; i++)
        {
            fill(80, 75, 60);     
            for(var j = 10; j > 0; j-- )
                {
                    ellipse(stelagtites[i].x, stelagtites[i].y - j * stelagtites[i].size, j/2 * stelagtites[i].size, 2 * stelagtites[i].size);
                }

        }
}

// Function to draw mushroom objects.
function drawShrooms()                                        
{
    for(var i = 0; i < shrooms.length; i++ )
        {
            // Stem
            fill(200);
            strokeWeight(1);
            rect(shrooms[i].x, floorY - shrooms[i].y, 30, shrooms[i].y);

            // Dome
            var direct = round(random(-1, 1));

            fill(120,0,120);
            beginShape();
            curveVertex(shrooms[i].x, floorY - shrooms[i].y);
            curveVertex(shrooms[i].x, floorY - shrooms[i].y);
            curveVertex(shrooms[i].x - 110, floorY - shrooms[i].y - 10); 
            curveVertex(shrooms[i].x - 40, floorY - shrooms[i].y - 50);
            curveVertex(shrooms[i].x + 15, floorY - shrooms[i].y - 100);
            curveVertex(shrooms[i].x + 70, floorY - shrooms[i].y - 50);
            curveVertex(shrooms[i].x + 140, floorY - shrooms[i].y - 10);
            curveVertex(shrooms[i].x + 30, floorY - shrooms[i].y);
            curveVertex(shrooms[i].x + 30, floorY - shrooms[i].y);
            endShape();
        }
}

// Function to draw grass in the foreground.
function drawGrassFore()                                        
{
    for(var i = 0; i < grassFore.length; i++ )
        {
            fill(0, 50, 100);
            beginShape();
            curveVertex(grassFore[i].x, grassFore[i].y);
            curveVertex(grassFore[i].x, grassFore[i].y);
            
            curveVertex(grassFore[i].x + 4, grassFore[i].y - 40);
            curveVertex(grassFore[i].x + 2, grassFore[i].y - 25);
            
            curveVertex(grassFore[i].x + 3, grassFore[i].y);
            curveVertex(grassFore[i].x + 3, grassFore[i].y);
            curveVertex(grassFore[i].x + 10, grassFore[i].y - 40);
            curveVertex(grassFore[i].x + 8, grassFore[i].y - 25);
            
            curveVertex(grassFore[i].x + 9, grassFore[i].y);
            curveVertex(grassFore[i].x + 9, grassFore[i].y);
            curveVertex(grassFore[i].x + 13, grassFore[i].y - 40);
            curveVertex(grassFore[i].x + 11, grassFore[i].y - 25);
            
            curveVertex(grassFore[i].x + 9, grassFore[i].y);
            curveVertex(grassFore[i].x + 9, grassFore[i].y);
            curveVertex(grassFore[i].x + 16, grassFore[i].y - 40);
            curveVertex(grassFore[i].x + 14, grassFore[i].y - 25);
            
            curveVertex(grassFore[i].x + 12, grassFore[i].y);
            curveVertex(grassFore[i].x + 12, grassFore[i].y);
            endShape();
        }
}

// Function to draw grass in the background.
function drawGrassBack()                                        
{
    for(var i = 0; i < grassBack.length; i++ )
        {
            fill(0, 50, 100);
            beginShape();
            curveVertex(grassBack[i].x, grassBack[i].y);
            curveVertex(grassBack[i].x, grassBack[i].y);
            
            curveVertex(grassBack[i].x + 4, grassBack[i].y - 40);
            curveVertex(grassBack[i].x + 2, grassBack[i].y - 25);
            
            curveVertex(grassBack[i].x + 3, grassBack[i].y);
            curveVertex(grassBack[i].x + 3, grassBack[i].y);
            curveVertex(grassBack[i].x + 10, grassBack[i].y - 40);
            curveVertex(grassBack[i].x + 8, grassBack[i].y - 25);
            
            curveVertex(grassBack[i].x + 9, grassBack[i].y);
            curveVertex(grassBack[i].x + 9, grassBack[i].y);
            curveVertex(grassBack[i].x + 13, grassBack[i].y - 40);
            curveVertex(grassBack[i].x + 11, grassBack[i].y - 25);
            
            curveVertex(grassBack[i].x + 9, grassBack[i].y);
            curveVertex(grassBack[i].x + 9, grassBack[i].y);
            curveVertex(grassBack[i].x + 16, grassBack[i].y - 40);
            curveVertex(grassBack[i].x + 14, grassBack[i].y - 25);
            
            curveVertex(grassBack[i].x + 12, grassBack[i].y);
            curveVertex(grassBack[i].x + 12, grassBack[i].y);
            endShape();
        }
}

// Function to draw cloud objects.
function drawClouds()                                       
{
    for(var i = 0; i < clouds.length; i++)
    {
        fill(235);
        ellipse(clouds[i].x, clouds[i].y_pos, 80, 50);
        ellipse(clouds[i].x + 30 * clouds[i].size, clouds[i].y_pos + 5 * clouds[i].size, 80 * clouds[i].size, 60 * clouds[i].size);
        ellipse(clouds[i].x - 20 * clouds[i].size, clouds[i].y_pos + 5 * clouds[i].size, 80 * clouds[i].size, 50 * clouds[i].size);
        ellipse(clouds[i].x + 30 * clouds[i].size, clouds[i].y_pos + 15 * clouds[i].size, 70 * clouds[i].size, 50 * clouds[i].size);
        ellipse(clouds[i].x - 40 * clouds[i].size, clouds[i].y_pos + 15 * clouds[i].size, 80 * clouds[i].size, 50 * clouds[i].size);
        ellipse(clouds[i].x + 10 * clouds[i].size, clouds[i].y_pos + 20 * clouds[i].size, 80 * clouds[i].size, 50 * clouds[i].size);
    }
}

// ---------------------------------
// Canyon render and check functions.
// ---------------------------------

// Function to draw canyon objects.
function drawCanyon(t_canyon)                               
{
    fill(247, 104, 6);
    rect(t_canyon.x, floorY, t_canyon.width, 43);   
    beginShape();
    vertex(t_canyon.x, floorY + 43);
    vertex(t_canyon.x + t_canyon.width, floorY + 43);
    vertex(t_canyon.x + t_canyon.width + 50, height);
    vertex(t_canyon.x - 50, height);
    endShape();
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon)                              
{
        if (gameChar_world_x - 20 > t_canyon.x && gameChar_world_x + 15 < t_canyon.x + t_canyon.width && gameCharY >= floorY)
            {
                isPlummeting = true;
            }
}

// ----------------------------------
// Flagpole render and check functions.
// ----------------------------------

// Function to draw Flag Pole.
function renderFlagPole()                                   
{ 
    // Drawing the Pole.
    push();                                                 
    strokeWeight(10);
    stroke(100);
    line( flagPole.x, floorY, flagPole.x, floorY - 300);
    pop();
    
    // Draw pole at the Top.
    if(flagPole.isReached)                                  
        {
            fill(250, 0, 0);
            triangle(flagPole.x, floorY - 300, flagPole.x, floorY - 240, flagPole.x + 100, floorY - 270);
        }
    // Draw the Flag at the Bottom.
    else                                                    
        {
            fill(250, 0, 0);
            triangle(flagPole.x, floorY - 60, flagPole.x, floorY, flagPole.x + 100, floorY - 30);
        }
}

// Function to check Win Condition.
function checkFlagpole()                                    
{   
    var d = abs(gameChar_world_x - flagPole.x);            
    
    if(d <= 15)
        {
            if(game_score > high_score)
                {
                    high_score = game_score;
                }
            
            winTrack.play();
            flagPole.isReached = true;
        }
}

// ----------------------------------
// Function to check Losing Condition.
// ----------------------------------
function checkPlayerDie()                                   
{
    if(gameCharY > height)
        {
            fallSound.play();
            loseLife();
        }
    
    if(lives < 1)
        {
            gameOver.play();
        }
}

// ----------------------------------
// Function to Spawn a new Character apon death or new game.
// ---------------------------------
function spawnCharacter()
{
    // Initialize Character Position
    gameCharX = width/2;
	gameCharY = floorY;
    
    // Initialize game Score.
    game_score = 0;                                         
    
    // Variable to control the background scrolling.
	scrollPos = 0;                                          

    // Variable to store the real position of the gameChar in the game world. Needed for collision detection.
	gameChar_world_x = gameCharX - scrollPos;

    // Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
}

// ----------------------------------
// Function to start the Game (initialise everything).
// ---------------------------------
function startGame()                                        
{
    endGame = false;
    
    lives = 3;
    
    high_score = 0;
    
    spawnCharacter();
    
    jumpHeight = 100;
    
    powerUp = {
        x: random(- 500, 2000),

        y: floorY - 150,
        isFound: false,
        draw: function(){
            fill(230,0,0);
            strokeWeight(5);
            stroke(255,255,0);
            ellipse(powerUp.x, powerUp.y, 40, 40);
            fill(250);
            noStroke();
            rect(powerUp.x - 15, powerUp.y - 5, 30 , 10);
            rect(powerUp.x - 5, powerUp.y - 15, 10, 30);
            strokeWeight(1);
        },
        checkFound: function(gcX, gcY){
            var d = dist(gcX, gcY, powerUp.x, powerUp.y);
        
            if(d < 100)
                {
                    jumpHeight = 150;
                    powerUp.isFound = true;
                    pwrUp.play();
                }
        }
    } 

    //--------------------------------------
    // Initialise arrays of scenery objects.
    //--------------------------------------
    
    // Shroom Object.
    shrooms = [];                                           
    for(var i = 0; i < random(15, 50); i++)
        {
            shrooms[i] = {
                            x: random(-1000 , 3000),
                            y: random(100, 200)
                           };
        }
    
    // stelagmite Objects.
    stelagmites = [];                                         
    for(var i = 0; i < random(10, 20); i++)
        {
            stelagmites[i] = {
                            x: random(-1000 , 3000),
                            y: floorY,
                            size: random(1 , 20)
                           };
        }
    
    // stelagtite Objects.
    stelagtites = [];                                         
    for(var i = 0; i < random(10, 20); i++)
        {
            stelagtites[i] = {
                            x: random(-1000 , 3000),
                            y: random(150, 200),
                            size: random(1 , 20),
                           };
        }
    
    // Cloud Objects.
    clouds = [];                                            
    for(var i = 0; i < random(5, 20); i++)
    {
        clouds[i] = {
                     x: random(-200 , 1100),
                     y_pos: random(0 , 300),
                     size: random(0.7 , 1.8)
                    };
    }
    
    // Collectable Objects.
    collectable = []                                        
    for(var i = 0; i < 10; i++)
        {
            collectable.push(new Collectable(random(-1000, 2000), floorY - 80));
        };     
    
    // Canyon Objects.
    canyons = [];                                           
    for(var i = 0; i < 5; i++)
        {
            canyons[i] = {
                          x: random(-1000, 2000), 
                          width: random(50, 100)
                         };
            // Canyons don't spawn under Player
            if(canyons[i].x >= 400 && canyons[i].x <= 550 )
                {
                    canyons[i].x += 100;
                }
        }
    
    // Grass Foreground Objects
    grassFore = [];
    for(var i = 0; i < random(100, 2000); i++)
        {
            grassFore[i] = {
                            x: random(-1000 , 3000),
                            y: random(floorY + 30, floorY + 10)
                           };
            for(var j = 0; j < canyons.length; j++)
                {
                    if(grassFore[i].x + 20 > canyons[j].x && grassFore[i].x < canyons[j].x + canyons[j].width)
                        {
                            grassFore[i].x -= canyons[j].width + 20;
                        }
                }
        }
    // Grass Background Objects
    grassBack = [];
    for(var i = 0; i < random(100, 2000); i++)
        {
            grassBack[i] = {
                            x: random(-1000 , 3000),
                            y: random(floorY + 20, floorY)
                           };
            for(var j = 0; j < canyons.length; j++)
                {
                    if(grassBack[i].x + 20 > canyons[j].x && grassBack[i].x < canyons[j].x + canyons[j].width)
                        {
                            grassBack[i].x -= canyons[j].width + 20;
                        }
                }
        }
    
    // Place Flagpole.
    flagPole = {isReached: false, x: 2000};             
    
    // Initialize Enemies
    enemies = []; 
    for(var i = 0; i < random(5, 10); i++)
        {
            var e = random(-1000, 2000);
            if(e > 400 && e < 600)
                {
                    e += 500;
                }
            enemies.push(new Enemy(e, floorY, random(50, 200)));
        }
    
    // Initialize Platforms
    platforms = [];
    for(var i = 0; i < random(5, 15); i++)
        {
            platforms.push(createPlatforms(random(-2000, 2000), floorY - random(100, 250), random(100, 150)));
        }
    
    for(var i = 0; i < enemies.length; i++)
        {
            platforms.push(createPlatforms(enemies[i].x, floorY - random(40, 90), random(100, 150)));
        }
}

// Function to Draw Lives.
function drawLife(lives)                                    
{
    fill(255, 0, 0);
    ellipse( 50 + lives * 60, 30, 20);
    ellipse( 60 + lives * 60, 30, 20);
    triangle(45 + lives * 60, 38, 65 + lives * 60, 38, 55 + lives * 60, 50 );
}
                 
// Platform  Creation.
function createPlatforms(x, y, length )                     
{
    var p = {
        x: x,
        y: y,
        length: length, 
        draw: function(){
            fill(150, 50, 0);
            for(var i = 0; i < 10; i++)
                {
                    ellipse(this.x + (this.length/20) + i * (this.length/10), this.y + (this.length/20), this.length/10);
                }
            rect(this.x, this.y, this.length/20, floorY - this.y);
            rect(this.x + this.length - this.length/20, this.y, this.length/20, floorY - this.y);
        },
        checkContact: function(gC_x, gC_y){
            if(gC_x > this.x && gC_x < this.x + this.length)
                {
                    var d = this.y - gC_y;
                    if(d >= 0 && d <= 3)
                        {
                            return true;
                        }
                }
            return false;
        }
    } 
    return p;
}

//Enemy Creation.
function Enemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    this.currentX = x;
    this.inc = 1; // increment
    this.left = false;
    
    this.update = function()
    {
        this.currentX += this.inc;
        
        if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
                this.left = true;
            }
        else if(this.currentX < this.x)
            {
                this.inc = 1;
                this.left = false;
            }
    }
    
    this.draw = function()
    {
        
        this.update();
        fill(0, 150, 10);
        if(this.left)
        {
            //Body
            beginShape();
            curveVertex(this.currentX + 25, this.y);
            curveVertex(this.currentX + 25, this.y);
            curveVertex(this.currentX + 30 + random(0, 2), this.y - 60 + random(0, 2));
            curveVertex(this.currentX - 30 + random(0, 2), this.y - 70 + random(0, 2));
            curveVertex(this.currentX - 25, this.y);
            curveVertex(this.currentX - 25, this.y);
            endShape();
            //Eyes
            fill(250);
            ellipse(this.currentX + 30, this.y - 60, 20+ random(0, 2));
            ellipse(this.currentX - 30, this.y - 70, 20+ random(0, 2));
            fill(0);
            ellipse(this.currentX + 30 + random(0, 2), this.y - 60, 8);
            ellipse(this.currentX - 30 + random(0, 2), this.y - 70, 8);
            // Mouth
            fill(240, 0, 0);
            beginShape();
            curveVertex(this.currentX + 5, this.y - 20);
            curveVertex(this.currentX + 5, this.y - 20);
            curveVertex(this.currentX + 10, this.y - 40);
            curveVertex(this.currentX - 10, this.y - 50);
            curveVertex(this.currentX - 5, this.y - 20);
            curveVertex(this.currentX - 5, this.y - 20);
            endShape();
            fill(0);
            rect()
        }
        else
        {
            // Body
            beginShape();
            curveVertex(this.currentX + 25, this.y);
            curveVertex(this.currentX + 25, this.y);
            curveVertex(this.currentX + 30 + random(0, 2), this.y - 70 + random(0, 2));
            curveVertex(this.currentX - 30 + random(0, 2), this.y - 60 + random(0, 2));
            curveVertex(this.currentX - 25, this.y);
            curveVertex(this.currentX - 25, this.y);
            endShape();
            // Eyes
            fill(250);
            ellipse(this.currentX + 30, this.y - 70, 20 + random(0, 2));
            ellipse(this.currentX - 30, this.y - 60, 20 + random(0, 2));
            fill(0);
            ellipse(this.currentX + 30 - random(0, 2), this.y - 70, 8);
            ellipse(this.currentX - 30 - random(0, 2), this.y - 60, 8);
            //Mouth
            fill(240, 0, 0);
            beginShape();
            curveVertex(this.currentX + 5, this.y - 20);
            curveVertex(this.currentX + 5, this.y - 20);
            curveVertex(this.currentX + 10, this.y - 50);
            curveVertex(this.currentX - 10, this.y - 40);
            curveVertex(this.currentX - 5, this.y - 20);
            curveVertex(this.currentX - 5, this.y - 20);
            endShape();
        }       
    }
    
    this.checkContact = function(gcX, gcY)
    {
        var d = dist(gcX, gcY, this.currentX, this.y);
        
        if(gcX > this.currentX - 50 && gcX < this.currentX + 50 && gcY > this.y - 65)
            {
                return true;
            }
        return false;
    }
}
// Collectable Creation.
function Collectable(x, y)
{
    this.x = x;
    this.y = y;
    this.isFound = false;
    this.draw = function()
    {
        fill(random(220, 255), random(180, 215), 0);
        ellipse(this.x - 8, this.y + 3, 6);
        ellipse(this.x - 7, this.y + 2, 10);
        ellipse(this.x + 2, this.y - 4, 15);
        ellipse(this.x + 8, this.y - 8, 11);
        fill(random(220, 255), random(180, 215), 0);
        ellipse(this.x, this.y, 10);
        ellipse(this.x - 3, this.y - 5, 12);
        ellipse(this.x - 2, this.y + 2, 8);
        ellipse(this.x + 5, this.y + 4, 4);
        fill(random(220, 255), random(180, 215), 0);
        ellipse(this.x + 8, this.y - 2, 10);
        ellipse(this.x - 3, this.y + 6, 9);
        ellipse(this.x + 4, this.y - 4, 14);
        ellipse(this.x + 2, this.y + 2, 3);
    }
    this.checkFound = function(gcX, gcY)
    {
        var d = dist(gcX, gcY, this.x, this.y);
        
        if(d < 50)
            {
                game_score += 1;
                this.isFound = true;
                goldSound.play();
            }
    }
}
// Function to hanle lives and score.
function loseLife()
{
    if(game_score > high_score)
        {
            high_score = game_score;
        }
    
    if(lives > 0)
        {
            lives -= 1;
            spawnCharacter();
        }
}