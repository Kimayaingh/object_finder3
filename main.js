object_name="";
objects=[];
status="";

 
 function setup(){
     canvas = createCanvas(480,380);
     canvas.center();

     video = createCapture(VIDEO);
     video.size(480,380);
     video.hide();
     
 }

 function start(){
     document.getElementById("status").innerHTML = "Status = Detecting Objects";
     objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    object_name = document.getElementById("object_name").value;

     
    }
       
 


 function modelLoaded(){
     console.log("model loaded");
     status=true;

 }


 function draw(){
     image(video, 0, 0, 480, 380);

     if(status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i< objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects detected";
           

            fill("#FF0000");
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("detecting_objects").innerHTML= object_name + "" + " has been successfully detected";
        
        
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterThis);

        }
        
        else{
            document.getElementById("detecting_objects").innerHTML= object_name +  "" + "has not been detected";
             

     }
    

    }

 }
}




 function gotResult(error,results){

    if(error){
     console.log(error);
    }
    objects=results;
 }