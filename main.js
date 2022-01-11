object_name="";
objects=[];
status="";

 
 function setup(){
     canvas = createCanvas(480,380);
     canvas.center();

     video = createCapture(VIDEO);
     video.hide();
 }

 function start(){
     document.getElementById("status").innerHTML = "Status = Detecting Objects";
     objectDetector = ml5.objectDetector("cocossd", modelLoaded);
     document.getElementById(object_name).innerHTML="input";

     if (objects[i].label = object_name){
        object_name_webcamLiveView.stop()
        objectDetector.detect(gotResult);
        document.getElementById("detecting_objects").innerHTML= object_name +  "" + "has been successfully detected";


        var synth = window.speechSynthesis;
        speak_data_1 = "object mentioned found"
        var utterThis = new SpeechSynthesisUtterance(speak_data_1);
        synth.speak(utterThis);
    }
        else{
            document.getElementById("detecting_objects").innerHTML= object_name +  "" + "has not been detected";
        

     }
    
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
            document.getElementById("number_of_objects").innerHTML="Number of objects are" + objects.length;

            fill("#FF0000");
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
        

    }

 }



 function gotResult(error,results){

    if(error){
     console.log(error);
    }
    objects=results;
 }