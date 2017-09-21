var fft, osc, canvas, pitch = 100;

var screenWidth = $(window).width(),
	screenHeight = $(window).height();

/* Initiate */
function setup() {
	canvas = createCanvas( screenWidth, screenHeight, P2D);
	noCursor();

	osc = new p5.Oscillator(100);
	osc.start();

	canvas.mousePressed( mouseDragged );
	canvas.mouseReleased( mouseReleased );

	fft = new p5.FFT();

	resizePlayArea();
}

function draw(){
	background("rgba(380,380,380,.5)");
	/* antenna */
	push();
	stroke('grey');
	strokeWeight(5);
	line(50,10, 50, 280 );
	pop();
	/* arm */
	push();
	stroke('black');
	strokeWeight(20);
	line(50,280, 180, 280 );
	pop();
	/* body */
	push();
	stroke('black');
  	fill('black');
	strokeWeight(20);
	rect(180,280, 50, 120 );
	pop();
	/* hoop */
	push();
	noFill();
	stroke('black');
	ellipse(260,280, 100, 10);
	pop();
	/* position dot */
	push();
	stroke('black');
	fill('black');
	ellipse(mouseX, mouseY, 10,10);
	pop();
	/* Wave for that visually displays the frequency */ 
  	noFill();
  	beginShape();
  	stroke('red'); 
  	strokeWeight(1);
	drawWaveform(fft.waveform());
  	endShape();
	/* Test that visually displays the HZ value */ 
  	push();
  	var pitchText = round(pitch) + "HZ";
  	textSize(40);
  	fill("red");
  	text(pitchText, 100, 100);
  	pop();
}

function mouseDragged() {
	pitchRange = ( 800 - 439 ) / screenHeight;
	pitch = ( screenHeight - mouseY ) * pitchRange + 439;

	ampRange = (.9) / screenWidth;
  	amplitude = (screenWidth - mouseX ) * ampRange;
  	
	osc.freqNode.value = pitch;
  	osc.output.gain.value = amplitude;
}

function mouseReleased() {
	osc.freqNode.value = 0;
}

function resizePlayArea() {
	$(window).resize(function() {
		resizeCanvas($(window).width(), $(window).height());
	});
}

function drawWaveform(waveform) {
	var x, y;
	for (var i = 0; i< waveform.length; i++){
	  	x = map(i, 0, waveform.length, 0, width);
	  	y = map(waveform[i], -1, 1, 0, height);
	  	vertex(x,y);
	}
}