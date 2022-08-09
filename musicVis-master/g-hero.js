// GHero was inspired by the popular game Guitar Hero
function GHero(){
	//vis name
	this.name = "GHero";
    //vis tracking number
    this.num = 3;

    //parameters to detirmine positions of the guitar neck and strings
    this.wide = width/4;
    this.narrow = width/5;
    this.height = height - 120;
    //array to house moving frets
    this.frets = [];
    
    //setup  
    for( var i = 0; i < 10; i ++){
            this.frets[i] = this.height/10 * i; 
        }
    
    this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];
    //string colours
    this.stringCol = ["blue", "green", "red", "yellow"];

	this.draw = function(){
        
        push();
        //draw neck
        strokeWeight(6);
        stroke(255);
        line(width/2 - this.wide, this.height, width/2 - this.narrow, 20);
        line(width/2 + this.wide, this.height, width/2 + this.narrow, 20);
        
        var spectrum = fourier.analyze();

        //draw Frets
        strokeWeight(4); 
        for(var i = 0; i < this.frets.length; i ++){
                if(sound.isPlaying()){
                        this.frets[i] ++;
                    }
                
                if(this.frets[i] > this.height){
                        this.frets[i] = 20;
                    }
                
                var x = map(this.frets[i], 20, this.height, this.narrow, this.wide);
                
                line(width/2 - x, this.frets[i], width/2 + x, this.frets[i]);
            }
        
        //draw strings      
		noFill();
		strokeWeight(2);
        
        for(var i = 1; i < 5; i++){
                stroke(this.stringCol[i - 1]);
                      
                var place = map((i - 1), 0, 3, width/2 - this.wide/2, width/2 + this.wide/2);
                
                strokeWeight(map(i, 1, 4, 4, 2));
                
                beginShape();
                //calculate the waveform from the fft.
                var wave = fourier.waveform(this.frequencyBins[i]);

                for (var j = 0; j < wave.length; j += 1){
                        //for each element of the waveform map it to screen
                        var energy = map(fourier.getEnergy(this.frequencyBins[i-1]),0, 255, -50, 50);
                        
                        //coordinates and make a new vertex at the point.
                        var x = map(wave[j], -1, 1, place - energy, place + energy);
                        var y = map(j, 0, wave.length, this.height, 20);
                        
                        curveVertex(x, y);
                    }

                endShape();
            }
		pop();
	};
}
