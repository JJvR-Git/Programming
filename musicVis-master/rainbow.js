function Rainbow(){
    //vis name
	this.name = "Rainbow";
    //vis track number
    this.num = 4;
    
	this.draw = function(){
		var spectrum = fourier.analyze();
		noStroke();
    		
		 for (var i = 0; i < 700; i++){
             
             // implementing rainbow colours
             var r;
             var g;
             var b;
             
             switch(true){
                    
                case (i <= 100):             r = map(i, 0, 100, 0, 148);
                                             g = 0;
                                             b = map(i, 0, 100, 0, 211);
                        break;
                    
                case (100 < i && i <= 200):  r = map(i, 100, 200, 148, 75);
                                             g = 0;
                                             b = map(i, 100, 200, 211, 130);
                        break;
                     
                case (200 < i && i <= 300):  r = map(i, 200, 300, 75, 0);
                                             g = 0;
                                             b = map(i, 200, 300, 130, 255);
                        break;
                     
                case (300 < i && i <= 400):  r = 0;
                                             g = map(i, 300, 400, 0, 255);
                                             b = map(i, 300, 400, 255, 0);
                        break;
                     
                case (400 < i && i <= 500):  r = map(i, 400, 500, 0, 255);
                                             g = 255;
                                             b = 0;
                        break;
                     
                case (500 < i && i <= 600):  r = 255;
                                             g = map(i, 500, 600, 255, 127);
                                             b = 0;
                        break;
                     
                case (600 < i && i <= 700): r = 255;
                                             g = map(i, 600, 700, 127, 0);
                                             b = 0;
                        break;
                     
                 default:                    r = 255;
                                             g = 255;
                                             b = 255;
                        break;
                 }
             
             //drawing the bars
             fill(r, g, b);
             //mapping the bars to be an appropriate width for the screen.
		 	 var x = map(i, 0, 700, 0, width);
		     var h = -height/2 + map(spectrum[i], 0, 255, height/2, 0);
		     rect(x, height/2, width / 700 + 2, 1 + h * 0.7);
             //drawing the reflection of the bars
             fill(r, g, b, 100);
             rect(x, height/2, width / 700 + 2, - 1 -h * 0.7);
             
             //drawing particles
             if(fourier.getEnergy("bass") > 160 && frameCount % 30 == 0){
                 //original particles
                 this.parts.push(this.newPart(x, height/2 + h*0.7, round(random(-2, -3)), r, g, b, 200));
                 //reflection of particles
                 this.parts.push(this.newPart(x, height/2 - h*0.7, round(random(2, 3)), r, g, b, 70));
             }
   		}	
        
        this.update();
	};
    //array to hold particles
    this.parts = [];
    //creating a neaw particle
    this.newPart = function(x, y, yVel, r, g, b, oppacity){
        var p = new Particle(x, y, yVel, r, g, b, oppacity);
        return p
    };
    //moving the particles and removing them once they go off screen
    this.update = function(){
        for(var i = this.parts.length -1 ; i >= 0 ; i--){
            this.parts[i].draw();
            this.parts[i].update();
            
            if(this.parts[i].x < 0 || this.parts[i].y > height || this.parts[i].y < 0){
                this.parts.splice(i, 1);
            }
        }
    };
}
//particle constructor
function Particle(x, y, yVel, r, g, b, oppacity)
{
    this.x = x;
    this.y = y;
    this.yVel = yVel;
    //mapping the particles to be appropriate to the screen size
    this.size = width/700 + 2;
    
    this.draw = function(){
        fill(r, g, b, oppacity);
        ellipse(this.x, this.y, this.size);
    }
    //moving particles
    this.update = function(){
        this.x += round(random(-1, 1));
        this.y += this.yVel;       
    }
}


