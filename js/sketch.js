//set global variables
var fft;
var pitch;
var osc;
var y = 100;
var x = 400;
//jquery variables
var screenWidth = $(window).width();
var screenHeight = $(window).height();
//set canvas as variable screen width with jquery screen variable in function setup()
function setup() {
	var cnv = createCanvas(screenWidth,screenHeight);
	cnv.mousePressed(mouseDragged).mouseReleased(pitchEnd);
	osc = new p5.Oscillator(y);
	osc.start();
	fft = new p5.FFT();
}


// draw the assets
function draw(){
//background
	background("rgba(380,380,380,.5)");
//antenna
	push();
	stroke('grey');
	strokeWeight(5);
	line(50,10, 50, 280 );
	pop();
//arm between antenna and body
	push();
	strokeWeight(20);
	line(50,280, 180, 280 );
	pop();
//body
	push();
  fill('black');
	strokeWeight(20);
	rect(180,280, 50, 120 );
	pop();
//hoop that controls volume
	push();
	noFill();
	stroke('black');
	ellipse(260,280, 100, 10);
	pop();
//position dot
	push();
	fill('black');
	ellipse(mouseX, mouseY, 10,10);
	pop();
// Wave for that visually displays
// the frequency
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
  var x = map(i, 0, waveform.length, 0, width);
  var y = map(waveform[i], -1, 1, 0, height);
  vertex(x,y);
  }
  endShape();
// Test that visually displays
// the HZ value
  push();
  var pitchText = round(pitch) + "HZ";
  textSize(40);
  fill("red");
  text(pitchText, 100, 100);
  pop();
}
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false ) {
function mouseDragged() {
//math function that controls pitch
	pitchRange = (1200-439)/screenWidth;
	pitch = (screenWidth - mouseX)*pitchRange+439;
	osc.freq(pitch);
//math function that controls amplitude
  volumeRange = (.9)/screenHeight;
  volume = (screenHeight - mouseY )*volumeRange;
  osc.amp(volume);
}
}
else if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == true ){
function touchMoved() {
//math function that controls pitch
  pitchRange = (1200-439)/screenWidth;
  pitch = (screenWidth - touchX)*pitchRange+439;
  osc.freq(pitch);
//math function that controls amplitude
  volumeRange = (.9)/screenHeight;
  volume = (screenHeight - touchY )*volumeRange;
  osc.amp(volume);
}
}
function pitchEnd(){
//mouse event that turns off the oscillator
	osc.freq(0);
}











