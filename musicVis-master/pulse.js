//draw the pulse to the screen
function Pulse() {
	//vis name
	this.name = "Pulse";
    //vis track number
    this.num = 5;

	//draw the vis form to the screen
	this.draw = function() {
		push();        
        translate(width/2, height/3);
        
        //create an array amplitude values from the fft.
		var spectrum = fourier.analyze();
        
        var angle = 360;
        
        //thick outer line previous positions
        var prevX;
        var prevY;
        //thin inner line previous positions
        var preX;
        var preY;
        
        for (var i = 0; i < 700; i++) {
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
            
            //thick pulse creation
            
            var spect = map(spectrum[i], 0, 255, 0, 200);
            
            var x = (100 + spect) * sin(angle);
            var y = (100 + spect) * cos(angle);
            
            if(i == 0)
                {
                    prevX = x;
                    prevY = y;
                }
            
            strokeWeight(6);
            stroke(r, g, b);
            line(prevX, prevY, x, y);
            line(-prevX, prevY, -x, y);
            
            prevX = x;
            prevY = y;
            
            // thin pulse creation
            
            var thinSpect = map(spectrum[i], 0, 255, 0, 120);
            
            var thinX = (60 + thinSpect) * sin(angle);
            var thinY = (60 + thinSpect) * cos(angle);
            
            if(i == 0)
                {
                    preX = thinX;
                    preY = thinY;
                }
            
            strokeWeight(2);
            line(preX, preY, thinX, thinY);
            line(-preX, preY, -thinX, thinY);
            
            preX = thinX;
            preY = thinY;
            
            //updating angle to create a smooth sircle
            angle += 180/700;
            
		}  
		pop();
	};
}