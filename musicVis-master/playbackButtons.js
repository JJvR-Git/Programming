//displays and handles clicks on the playback button.
function PlaybackButtons(){
	
	this.x = width/2;
    
	this.y = height - 60;
    
	this.width = 40;
    
	this.height = 40; 
    
    this.trackNum = track.length;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.draw = function(){
		if(this.playing){
			rect(this.x - 20, this.y, this.width/2 - 2, this.height);
			rect(this.x - 20 + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
		else{	
			triangle(this.x - this.width/2, this.y, this.x - this.width/2 + this.width, this.y + this.height/2, this.x - this.width/2, this.y + this.height);

		}
        //skip song triangle
        triangle(this.x + this.width * 2, this.y, this.x + this.width * 2, this.y + this.height, this.x + this.width * 2.5, this.y + this.height/2);
        triangle(this.x + this.width * 2.5, this.y, this.x + this.width * 2.5, this.y + this.height, this.x + this.width * 3, this.y + this.height/2);
        
        //previous song triangle
        triangle(this.x - this.width * 2, this.y, this.x - this.width * 2, this.y + this.height, this.x - this.width * 2.5, this.y + this.height/2);
        triangle(this.x - this.width * 2.5, this.y, this.x - this.width * 2.5, this.y + this.height, this.x - this.width * 3, this.y + this.height/2);
        
        push()
        
        stroke(255);
        noFill();
        strokeWeight(2);
        
        //next visualisation box
        rect(this.x + this.width * 4, this.y, this.width, this.height);
        triangle(this.x + this.width * 4, this.y + 5, this.x + this.width * 4, this.y + this.height - 5, this.x + this.width * 4.7, this.y + this.height/2);
        
        //previous visualisation box
        rect(this.x - this.width * 5, this.y, this.width, this.height);
        triangle(this.x - this.width * 4, this.y + 5, this.x - this.width * 4, this.y + this.height - 5 , this.x - this.width * 4.7, this.y + this.height/2);
        
        pop();
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
		if(mouseX > this.x - this.width/2 && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			if (sound.isPlaying()) {
    			sound.pause();
  			} else {
    			sound.loop();
  			}
  			this.playing = !this.playing;
  			return true;
		}
        // previous song
        else if(mouseX > this.x - this.width * 3 && mouseX < this.x - this.width * 2 && mouseY > this.y && mouseY < this.y + this.height){
                    if(trackNum == 0) {
                        trackNum = track.length - 1;
                    }
            
                    else{
                        trackNum --;
                    }
            
                    sound.stop()
                    sound = track[trackNum];
                    sound.loop()
                    return true;
                }
        // next song
        else if(mouseX < this.x + this.width * 3 && mouseX > this.x + this.width * 2 && mouseY > this.y && mouseY < this.y + this.height){
                    if(trackNum == track.length - 1) {
                        trackNum = 0;
                    }
            
                    else{
                        trackNum ++;
                    }
            
                    sound.stop()
                    sound = track[trackNum];
                    sound.loop()
                    return true;
                }
        // previous Visualisation
        else if(mouseX > this.x - this.width * 5 && mouseX < this.x - this.width * 4 && mouseY > this.y && mouseY < this.y + this.height){
                    
                    var i = vis.selectedVisual.num;
            
                    if( i == 0){
                        vis.selectVisual(vis.visuals[vis.visuals.length - 1].name); 
                    }
                    else{
                        vis.selectVisual(vis.visuals[i - 1].name); 
                    }
                    return true;
                }
        
        // next Visualisation
        else if(mouseX < this.x + this.width * 5 && mouseX > this.x + this.width * 4 && mouseY > this.y && mouseY < this.y + this.height){
            
                    var i = vis.selectedVisual.num;
            
                    if( i == vis.visuals.length -1){
                        vis.selectVisual(vis.visuals[0].name); 
                    }
                    
                    else{
                        vis.selectVisual(vis.visuals[i + 1].name); 
                    }
            
                    return true;
                }  
			return false;
	};

}