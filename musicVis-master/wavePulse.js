// this visualisation is simmilar to pulse, but uses the waveform in stead of the spectrum 
//draw the pulse to the screen 
function WavePulse() {
	//vis name
	this.name = "WavePulse";
    //vis track number
    this.num = 6;
    
    //spiral inner and outer sizes
    var thin = 40;
    var thick = 70;
    
    var prog = 0;

	//draw the wave form to the screen
	this.draw = function() {
		push();
        //translate to the centre of the screen
        translate(width/2, height/2);    
        var angle = 360;

		//calculate the waveform from the fft.
		var wave = fourier.waveform();
        
        //thick outer line
        var prevX;
        var prevY;
        
        //thin inner line
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
            
            //drawing the outer line
            
            var wav = map(wave[i], -1, 1, -thick, thick);
            var x = (thick + wav + prog/2) * sin(angle);
            var y = (thick + wav + prog/2) * cos(angle);
            
            strokeWeight(6);
            stroke(r, g, b);
            line(prevX, prevY, x, y);
            line(-prevX, prevY, -x, y);
            
            prevX = x;
            prevY = y;
            
            //drawing the inner line
            
            var thinWav = map(wave[i], -1, 1, -thin, thin);
            var thinX = (thin + thinWav + prog/4) * sin(angle);
            var thinY = (thin + thinWav + prog/4) * cos(angle);
            
            strokeWeight(5);
            line(preX, preY, thinX, thinY);
            line(-preX, preY, -thinX, thinY);
            
            preX = thinX;
            preY = thinY;
            
            angle += 180/700;            
            //creating the continual spiral 
            if(prog > 700){
                prog = 0;
            }
            else{
                prog += 1 ;
            }   
		}  
		pop();
	};
}