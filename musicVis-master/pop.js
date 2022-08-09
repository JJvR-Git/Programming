//bassed on the fireworks visualisation
function Pop(){
    //vis name
	this.name = "Pop";
    //vis track number
    this.num = 8;
    
    var beatDetect = new BeatDetect();

    var fire = new FireWorks();
    
	this.draw = function(){
		push();
		var spectrum = fourier.analyze();
        
        if(beatDetect.detectBeat(spectrum)){
            //map the position to the energy of the music, so the same beats will apear near each other     
            var energyX = fourier.getEnergy("lowMid");   
            var energyY = fourier.getEnergy("highMid");
            
            //add 2 fireworks for visual effect, 
            fire.addFireWork(energyX, energyY);   
            fire.addFireWork(energyX + random(-50, 50), energyY + random(-50, 50));  
            
        }       
        fire.update();       
		pop();
	};
}