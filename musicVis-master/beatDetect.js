//Insperation for BeatDetect comes from:
//https://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html

function BeatDetect(){
    
    var sampleBuffer = [];
    
    this.detectBeat = function(spectrum){
        var sum = 0;
        var isBeat = false;

		for(var i = 0; i < spectrum.length; i++){
            sum += spectrum[i];
		}
        
        if(sampleBuffer.length == 60){
            //detect Beat
            var sampleSum = 0;
            
            for(var j = 0; j < sampleBuffer.length; j++){
                sampleSum += sampleBuffer[j];
            }
            
            var sampleAverage = sampleSum/sampleBuffer.length;
            var c = calCon(sampleAverage);
            
            if(sum > sampleAverage * c){
                //beat
                isBeat = true;
            }
            
            sampleBuffer.splice(0, 1);
            sampleBuffer.push(sum);
        }
        
        else{
            sampleBuffer.push(sum);
        }
        
        return isBeat;
    };
    
        //calculates the constant
    function calCon(sampleAverage){

        var varianceSum = 0;

        for(var i = 0; i < sampleBuffer.length; i++){
            varianceSum = sampleBuffer[i] - sampleAverage;
        }

        var variance = varianceSum/sampleBuffer.length;
        var m = -0.15/(25 - 200);
        var b = 1 + (m * 200);           
        return (m * variance) + b;
    }
}
