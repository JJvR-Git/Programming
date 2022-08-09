//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

//other optional sound files
var track = [];

var trackNum;

//preload all sound files
function preload(){
    progress = 0;
    track[0] = loadSound('assets/Loud Pipes.mp3', succeess, error, loading);
    track[1] = loadSound('assets/CREAM ON CHROME.mp3', succeess, error, loading);
    track[2] = loadSound('assets/ABRASIVE.mp3', succeess, error, loading);
    track[3] = loadSound('assets/FALCON JAB.mp3', succeess, error, loading);
    track[4] = loadSound('assets/segway_loop.mp3', succeess, error, loading);
    track[5] = loadSound('assets/parsRadio_loop.mp3', succeess, error, loading);
    track[6] = loadSound('assets/yee-king_track.mp3', succeess, error, loading);
    track[7] = loadSound('assets/stomper_reggae_bit.mp3', succeess, error, loading);
}

function setup(){
	 createCanvas(windowWidth, windowHeight);
    
	 background(0);
    
     angleMode(DEGREES);

     trackNum = 0;
    
     sound = track[trackNum];
    
	 controls = new ControlsAndInput();
    
     frameRate(30);

	 //instantiate the fft object
	 fourier = new p5.FFT();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
     //my own visualisations
     vis.add(new GHero());
     vis.add(new Rainbow());
     vis.add(new Pulse())
     vis.add(new WavePulse())
     vis.add(new LineDance());
     vis.add(new Pop());
     

}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}

function loading(){
    console.log("loading");   
}

function succeess(){
    console.log("succeess");
}

function error(err){
    alert("error: " + err);
}

