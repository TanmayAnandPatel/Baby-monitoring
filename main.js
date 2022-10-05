img="";
object= [];
function preload() {
    img=loadImage("baby.webp");
}

function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
}
status= "";
function start() {
    objectDetector= ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML= "Status: Detecting objects"
}
function draw() {
    image(video,0,0,380,380);
    objectDetector.detect(video,gotResult);
    if(status!=""){
   for(i= 0;i<object.length;i++){
    if(object[i].label=="person"){
        document.getElementById("status").innerHTML="Baby found"
    }else{
        document.getElementById("status").innerHTML="Baby not found"

    }
    r= random(255);
    g= random(255);
    b= random(255);
    document.getElementById("number_object").innerHTML= "Number of object detected are: "+object.length;
    fill(r,g,b)
    persent= floor(object[i].confidence*100);
    text(object[i].label+" "+persent+"%",object[i].x+15,object[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
   }
    }
    
}
function modelloaded() {
    console.log("Model is loaded");
    status= true;
}
function gotResult(error,results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    object= results;
}