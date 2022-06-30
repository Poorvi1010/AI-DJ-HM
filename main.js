song1=""
song2=""

LeftWrist_x=0;
LeftWrist_y=0;

RightWrist_x=0;
RightWrist_y=0

scoreLeftWrist=0;

status1="";
status2="";

function preload()
{
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function setup()
{
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}

function modelLoaded()
{
    console.log("Pose Net is Initialized");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        LeftWrist_x= results[0].pose.leftWrist.x;
        LeftWrist_y= results[0].pose.leftWrist.y;
        RightWrist_x=results[0].pose.rightWrist.x;
        RightWrist_y=results[0].pose.rightWrist.y;
    }
}

function draw()
{
image(video,0,0,600,500);

status1= song1.isPlaying()
fill("red");
stroke("red");
if(scoreLeftWrist>0.2)
{
   
    circle(LeftWrist_x,LeftWrist_y,20);
    song2.stop();
    if(status1==false)
    {
        song1.play();
        document.getElementById("Song_Name").innerHTML="Playing Harry Potter Theme Song "
    }
}
}
