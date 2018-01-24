var t = 0;
var circles = [];
function preload(){
	//fontVector = loadFont("./libraries/Vectorb.ttf");
}
function setup() {
	frameRate(60);
	createCanvas(windowWidth, windowHeight);
	stroke(255);
	noFill();
	var network = [];
	var radi = 50;
	var total = 6;
	var outside_radi = 150;
	var orgin = outside_radi + radi + 20;
	for (i=1;i<total;i++)
		network.push(i);
	for (i=0;i<total;i++){
		circles.push(new circle(orgin+outside_radi*cos(i*(PI*2)/total),orgin+outside_radi*sin(i*(PI*2)/total),radi,PI*i,.02+.005*((i>3)?6-i:i),network.slice()));
		network.splice(0,1);
		}
	
	
	/*  Rect array
	var length = 3;
	var width = 3;
	var spacing = 90;
	var offset = 150;
	for (i=1;i<(length*width);i++)
		network.push(i);
	for (i = 0;i<length;i++){
		for (j=0;j<width;j++){
			circles.push(new circle(spacing+spacing*j+offset,spacing+spacing*i+offset,radi,.1*j*PI,.003-.003*i,network.slice()));
			network.splice(0,1);
			}
		}
	*/
	//console.log(circles[24].network);
}
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	t++;
	background(0);
	//text(frameRate(),500,500,20,20);
	stroke(100);
	for (i = 0 ; i < circles.length ; i++){
		circles[i].findPoint();
		circles[i].show();
	}
	stroke(255);
	for (i = 0 ; i < circles.length ; i++){
		circles[i].drawLines();
	}
	
}
