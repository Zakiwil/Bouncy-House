//alert("Have a nice day");
var howManyDots; 
var howManyMade = 0;
//alert(howManyDots);


var xlocs = new Array();
var ylocs = new Array();
var dXSpeed = new Array();
var dYSpeed = new Array();
var dotColor = new Array();

var moveTheDots = false;

var dotSize = 10;

var colors = ['#2EFEC8', '#8904B1', '#0040FF', 
'#DF3A01', '#40FF00', '#B45F04', 
'#FE2E9A', '#8A0829', '#58FAF4', 
'#3B0B17', '#0B4C5F'];


var totalColors = colors.length;
console.log("The total number of colors is " + totalColors);

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');

var rect = canvas.getBoundingClientRect();

//alert("rect.right is " + rect.right);
//alert("rect.left is " + rect.left);

var canvasW = rect.right -rect.left;
 
var canvasH = rect.bottom - rect.top;
//alert("canvas height is " + canvas);

function frame() {
		if(moveTheDots ===false){
			clearInterval(id);
		} else {
			for(var i = 0; i<xlocs.length; i++) 
			{
				var theDX = dXSpeed[i];
				var theDY = dYSpeed[i];
				//alert("DX DY  " + theDX + ", " + theDY);
				xlocs[i] += theDX;
				ylocs[i] += theDY;


				if(xlocs[i] <  dotSize/2) {
					xlocs[i] = dotSize/2 +1
					dXSpeed[i] *= -1;
				}

				if(xlocs[i] > canvasW - (dotSize/2)) {
					xlocs[i] = canvasW - (dotSize/2) -1
					dXSpeed[i] *= -1;
				}

				if(ylocs[i] <  dotSize/2) {
					ylocs[i] = dotSize/2 +1
					dYSpeed[i] *= -1;
				}

				if(ylocs[i] > canvasH - (dotSize/2)) {
					ylocs[i] = canvasH - (dotSize/2) -1
					dYSpeed[i] *= -1;
				}
			}
			redrawScene();
		
		}

}

function moveEverybody(){
	var id = setInterval(frame, 7);
}

function toggleDotMoving() {
	if(moveTheDots === false) {
		//alert("Time to move the dots");
		moveEverybody();
		moveTheDots = true;
	} 
	else{
		//alert("Stopping dot moves");
		moveTheDots = false;
	}


}


function doReset() {
	//alert("I'm going to do a  reset");
	howManyMade = 0;

	var xlocsLen = xlocs.length;
	var ylocsLen = ylocs.length;
	var dXSpeedLen = dXSpeed.Length;
	var dYSpeedLen = dYSpeed.Length;
	var dotColorLen = dotColor.Length;

	for(var i = 0; i < xlocsLen; i++) {
		xlocs.pop();
	}

	for(var i = 0; i < ylocsLen; i++) {
		ylocs.pop();
	}

	for(var i = 0; i < dYSpeedLen; i++) {
		dYSpeed.pop();
	}

	for(var i = 0; i < dXSpeedLen; i++) {
		dXSpeed.pop();
	}

	for(var i = 0; i < dotColorLen; i++) {
		dotColor.pop();
	}

	redrawScene();
}

function getMousePosition(canvas, event) {

	var rect = canvas.getBoundingClientRect();
	var xL = event.clientX - rect.left;
	var yL = event.clientY - rect.top;

	return {
		x: xL,
		y: yL

	};

}

function addClick(x,y) {
	//alert("Hi from addClick");
	xlocs.push(Math.floor(x- (dotSize/2.0)));
	ylocs.push(Math.floor(y- (dotSize/2.0)));
	var dColor = Math.floor( Math.random() * colors.length);
	dotColor.push(dColor);



	var randDX = 0;
	var randDY = 0;

	while(randDX === 0 && randDY === 0) {
	randDX = Math.floor( Math.random() * 9) -4;
	randDY = Math.floor( Math.random() * 9) -4;
	}


	dXSpeed.push(randDX);
	dYSpeed.push(randDY);

}

function redrawScene() {
	//alert("Hi from redrawScene ");
	context.clearRect(0,0, context.canvas.width, context.canvas.height);

	for(var i=0; i < xlocs.length; i++) {

		context.beginPath();
		context.ellipse(
			xlocs[i],
			ylocs[i],
			dotSize, 
			dotSize,
			0,0,
			Math.PI*2
			);
		var whichColorNum = dotColor[i];
		context.fillStyle = colors[whichColorNum];
		context.fill();
		context.closePath();

	}



}



function setup(){

	setTimeout(
		function(){
			howManyDots = prompt("How Many dots would you like");
		}, 1000);
}


canvas.addEventListener( 'mousedown', 
	function(event){
		var mousePos = getMousePosition(canvas, event);
		//alert("You clicked at " + mousePos.x + ", " + mousePos.y);

		if(howManyMade < howManyDots) {
			addClick(mousePos.x, mousePos.y);
			howManyMade++;
			redrawScene();
		}
	}

);