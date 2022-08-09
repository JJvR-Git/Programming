//colour variables, red, green and blue
var r;
var g;
var b;

//firework object
function FireWork( x, y){
    
    var x = x;
    var y = y;
    
    getColour();
    
    //individual particles
    var parts = [];
    var depleted = false;
    
    for(var i = 0; i < 360; i += 18){
        parts.push(new particle(x, y,i, 10));
    }
    //draw particles and detirmine if they are set for removal
    this.draw = function(){
        for(var i = 0; i < parts.length; i++){
            parts[i].draw();            
        }
        if(parts[0].speed <= 0){
            this.depleted = true;
        }
    }
}
//particle object for Firework
function particle(x, y, angle, speed){
    
    var x = x;
    var y = y;
    var angle = angle;
    
    this.speed = speed;
    
    this.draw = function(){
        fill(r, g, b);
        ellipse(x, y, 10, 10);      
        update();
    }
    //update particles to move outward
    function update(){
        this.speed -= 1;
        x += cos(angle) * speed;
        y += sin(angle) * speed; 
    }
}
//function to randomize and change the colour of all the particles
function getColour(){

    var seed = random(100, 700);

    switch(true){

                case (100 <= seed && seed <= 200):  r = map(seed, 100, 200, 148, 75);
                                                   g = 0;
                                                   b = map(seed, 100, 200, 211, 130);
                        break;

                case (200 < seed && seed <= 300):  r = map(seed, 200, 300, 75, 0);
                                                   g = 0;
                                                   b = map(seed, 200, 300, 130, 255);
                        break;

                case (300 < seed && seed <= 400):  r = 0;
                                                   g = map(seed, 300, 400, 0, 255);
                                                   b = map(seed, 300, 400, 255, 0);
                        break;

                case (400 < seed && seed <= 500):  r = map(seed, 400, 500, 0, 255);
                                                   g = 255;
                                                   b = 0;
                        break;

                case (500 < seed && seed <= 600):  r = 255;
                                                   g = map(seed, 500, 600, 255, 127);
                                                   b = 0;
                        break;

                case (600 < seed && seed <= 700): r = 255;
                                                  g = map(seed, 600, 700, 127, 0);
                                                  b = 0;
                        break;

                 default:                    r = 255;
                                             g = 255;
                                             b = 255;
                        break;
                 }


}