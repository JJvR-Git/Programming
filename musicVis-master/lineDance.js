//colour variables, red, green and blue
var r;
var g;
var b;

//draw the dancing line to the screen
function LineDance() {
	//vis name
	this.name = "LineDance";
    //vis tracking number
    this.num = 7;
    
    //amount of dancing lines
    var figures = 40;
    
    var lineStep;
    
    var beatDetect = new BeatDetect();
    
    var prog;
       
    this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];
    
    function setup(){
        prog = 0;
        
        lineStep = 0.01;
        
        getCol();
    }
    
    setup();

	//draw the vis form to the screen
	this.draw = function(){
		push();
        background(0);
        //translate the centre of the screen to move the vis around 
        var tX = map(noise(prog), 0, 1, width/2 - 100, width/2 + 100)       
        var tY = map(noise(prog + 1000), 0, 1, height/2 - 100, height/2 + 100)
        translate(tX, tY);       
        
        var spectrum = fourier.analyze();
        //changes colour each time a beat is detected
        if(beatDetect.detectBeat(spectrum)){
            getCol();   
        };
        
        for(var j = 0; j < figures; j++){ 
            //select the energy from the frequencyBins and map it to e
            var energy = fourier.getEnergy(this.frequencyBins[j % 4]);
            var e = map(energy, 0, 255, 0.01, 0.05);
            //draw the shape of each dancing line
            noFill();
            stroke(r, g, b);
            strokeWeight(3);
            beginShape();
            vertex(0, 0);
            for(var i = 0; i < 6; i++){
                var x = map(noise(i * lineStep + (j * 1000) + prog), 0, 1, -width/2, width/2);
                var y = map(noise(i * lineStep + (j * 1000) + prog + 1000), 0, 1, -height + 200, height - 300);
                vertex(x, y);
            }
            vertex(0, 0);
            endShape();
            //use e to advance the progress used in the noise functions, to make the shapes move to the energy of the music
            if(energy > 50){
                prog += e/figures;
            }
    }
		pop();
	};
}
//function to get a new random colour when a beat is detected
function getCol(){

    var seed = random(100, 600);

    switch(true){


                case (100 <= seed && seed <= 200): r = map(seed, 100, 200, 148, 75);
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


                 default:                    r = 255;
                                             g = 255;
                                             b = 255;
                        break;
                 }


}