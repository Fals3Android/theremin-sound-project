var fft, osc, canvas, currentPitch, minPitch = 0, maxPitch = 3000;

var screenWidth = $(window).width(),
	screenHeight = $(window).height();

$(window).resize(function() {
	screenWidth = $(window).width();
	screenHeight = $(window).height();
});

/* Initiate */
function setup() {
	canvas = createCanvas( screenWidth, screenHeight, P2D);
	noCursor();

	osc = new p5.Oscillator(minPitch);
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
	line(300,10, 300, 280 );
	pop();
	/* arm */
	push();
	stroke('black');
	strokeWeight(20);
	line(100,280, 300, 280 );
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
	ellipse(75,280, 100, 10);
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
  	var pitchText = round(currentPitch) + "HZ";
  	textSize(40);
  	fill("red");
  	text(pitchText, 100, 100);
  	pop();
}

function mouseDragged() {
	yPerc = ( mouseX / screenWidth ) * 100;  
	pitchPerc = 100 / yPerc;
	currentPitch = maxPitch / pitchPerc;

	ampRange = (.9) / screenHeight;
  	amplitude = (screenHeight - mouseY ) * ampRange;
  	
	osc.freqNode.value = currentPitch;
  	osc.output.gain.value = amplitude;
}

function mouseReleased() {
	osc.freqNode.value = 0;
}

function resizePlayArea() {
	$(window).resize(function() {
		resizeCanvas(screenWidth, screenHeight);
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