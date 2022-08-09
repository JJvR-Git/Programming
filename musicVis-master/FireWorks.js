function FireWorks(){
    
    var fireworks = [];
    
    this.addFireWork = function(energyX, energyY){
        
        // map the firework positions according to the beat
        var nX = noise(energyX);
        var nY = noise(energyY);
        var fX = map(nX, 0, 1, width*0.2, width*0.8);
        var fY = map(nY, 0, 1, height*0.2, height*0.8);
        
        //new FireWork object
        fireworks.push(new FireWork(fX, fY));
    };
    //update array of fireworks and removes completed fireworks
    this.update = function(){
        for( var i = 0; i < fireworks.length; i++){
            
            fireworks[i].draw();
            
            if(fireworks[i].depleted){
                fireworks.splice(i, 1);
            }
        }
    }
}