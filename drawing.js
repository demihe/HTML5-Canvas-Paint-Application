//Create canvas
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//Set background
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 500);

//Lines is default
lines();

var removeRectangleInLine = 0;

function lines() {
	//painting = false;
	//Remove event listeners so line won't draw rectangle
	if (removeRectangleInLine == 1) {
		canvas.removeEventListener('mousedown', rectMouseDown);
		canvas.removeEventListener('mouseup', rectMouseUp);
		canvas.removeEventListener('mousemove', rectMouseMove);
		canvas.removeEventListener('mouseout', rectMouseout);
	};

	//Initialize mouse coordinates to 0,0
	var mouse = { x: 0, y: 0};

	//Paint includes line width, line cap, and color
	paint = function() {
		ctx.lineTo(mouse.x, mouse.y);
		ctx.lineWidth = lineWidthRange();
		ctx.lineJoin = 'round';
		ctx.lineCap = brushstyle;
		ctx.strokeStyle = colors;
		ctx.stroke();
	};

	//Find mouse coordinates relative to canvas
	linesMousemove = function(e){
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	};

	//User clicks down on canvas to trigger paint
	linesMousedown = function(){
		ctx.beginPath();
		ctx.moveTo(mouse.x, mouse.y);
		canvas.addEventListener('mousemove', paint, false);
	};

	//When mouse lifts up, line stops painting
	linesMouseup = function(){
		canvas.removeEventListener('mousemove', paint, false);
	};

	//When mouse leaves canvas, line stops painting
	linesMouseout = function() {
		canvas.removeEventListener('mousemove', paint, false);
	};

	//Event listeners that will trigger the paint functions when
	//mousedown, mousemove, mouseup, mouseout
	canvas.addEventListener('mousedown', linesMousedown, false);
	canvas.addEventListener('mousemove', linesMousemove, false);
	canvas.addEventListener('mouseup', linesMouseup, false);
	canvas.addEventListener('mouseout', linesMouseout, false);

};

//Color palette
var colors;
function changeColors(palette) {
	switch(palette.id) {
		case "red":
			colors = "red";
			break;
		case "red1":
			colors = "#F16161";
			break;
		case "red2":
			colors = "#F69FA0";
			break;
		case "orange":
			colors = "orange";
			break;
		case "orange1":
			colors = "#F99F62";
			break;
		case "orange2":
			colors = "#FBB57B";
			break;
		case "blue":
			colors = "#09C2DB";
			break;
		case "blue1":
			colors = "#8BD3DC";
			break;
		case "blue2":
			colors = "#B9E3E8";
			break;
		case "indigo":
			colors = "#0E38AD";
			break;
		case "indigo1":
			colors = "#546AB2";
			break;
		case "indigo2":
			colors = "#9C96C9";
			break;
		case "green":
			colors = "green";
			break;
		case "green1":
			colors = "#97CD7E";
			break;
		case "green2":
			colors = "#C6E2BB";
			break;
		case "black":
			colors = "black";
			break;
		case "black1":
			colors = "#545454";
			break;
		case "black2":
			colors = "#B2B2B2";
			break;
		case "yellow":
			colors = "yellow";
			break;
		case "yellow1":
			colors = "#F7F754";
			break;
		case "yellow2":
			colors ="#F7F4B1";
			break;
		case "purple":
			colors = "#B9509E";
			break;
		case "purple1":
			colors = "#D178B1";
			break;
		case "purple2":
			colors = "#E3ABCE";
			break;
		case "erase":
			colors = "white";
			break;
	}
};

//Change brush style
var brushstyle;
function changeBrushStyle(obj) {
	switch(obj.id) {
		case "round":
			brushstyle = "round";
			break;
		case "square":
			brushstyle = "butt";
			break;
		case "rough":
			brushstyle = "square";
			break;
	}
};

//Change line width
function lineWidthRange() {
    var widthLine = document.getElementById("myRange").value;
    return widthLine;
};

//Clear canvas
function erase() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

//Save image
var button = document.getElementById('dwnld');
button.addEventListener('click', function (e) {
var dataURL = canvas.toDataURL('image/png');
button.href = dataURL;

});

//Rectangle shape
function rectangle() {
	removeRectangleInLine = 1;

	canvas.removeEventListener('mousedown', linesMousedown, false);
	canvas.removeEventListener('mousemove', linesMousemove, false);
	canvas.removeEventListener('mouseup', linesMouseup, false);
	canvas.removeEventListener('mouseout', linesMouseout, false);
	
	//Initialize mouse coordinates to 0,0
	var mouse = {x: 0, y: 0};

	//Draw rectangle
	draw = function() {
		ctx.fillStyle = "black";
		ctx.fillStyle = colors;
		ctx.fillRect(mouse.x, mouse.y, mouse.w, mouse.h);
	};

	//Find mouse coordinates relative to canvas
	rectMouseMove = function(e) {
	    mouse.w = (e.pageX - this.offsetLeft) - mouse.x;
	    mouse.h = (e.pageY - this.offsetTop) - mouse.y ;
	};

	//User clicks down on canvas to trigger draw
	rectMouseDown = function(e) {
		ctx.beginPath();
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		canvas.addEventListener('mousemove', draw, false);		  
	};

	//When mouse lifts up, line stops drawing
	rectMouseUp = function() {
		canvas.removeEventListener('mousemove', draw, false);
	};

	//When mouse leaves canvas, line stops drawing
	rectMouseout = function() {
		canvas.removeEventListener('mousemove', draw, false);
	};

	//Event listeners that will trigger the draw functions when
	//mousedown, mousemove, mouseup, mouseout
	canvas.addEventListener('mousedown', rectMouseDown, false);
	canvas.addEventListener('mouseup', rectMouseUp, false);
	canvas.addEventListener('mousemove', rectMouseMove, false);
	canvas.addEventListener('mouseout', rectMouseout, false);
};

//Triangle shape
function triangle() {
	removeRectangleInLine = 1;

	canvas.removeEventListener('mousedown', linesMousedown, false);
	canvas.removeEventListener('mousemove', linesMousemove, false);
	canvas.removeEventListener('mouseup', linesMouseup, false);
	canvas.removeEventListener('mouseout', linesMouseout, false);
	
	//Initialize mouse coordinates to 0,0
	var mouse = {x: 0, y: 0};

	//Draw triangle
	draw = function() {
		//Top of triangle
		ctx.moveTo(mouse.x,mouse.y);
		ctx.lineTo(mouse.y, mouse.x);
		ctx.lineTo(mouse.x, mouse.x);
		ctx.closePath();

		ctx.strokeStyle = colors;
		ctx.stroke();

		ctx.fillStyle = "black";
		ctx.fillStyle = colors;
		ctx.fill();

	};

	//Find mouse coordinates relative to canvas
	rectMouseMove = function(e) {
	    mouse.w = (e.pageX - this.offsetLeft) - mouse.x;
	    mouse.h = (e.pageY - this.offsetTop) - mouse.y ;
	};

	//User clicks down on canvas to trigger draw
	rectMouseDown = function(e) {
		ctx.beginPath();
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		canvas.addEventListener('mousemove', draw, false);		  
	};

	//When mouse lifts up, line stops drawing
	rectMouseUp = function() {
		canvas.removeEventListener('mousemove', draw, false);
	};

	//When mouse leaves canvas, line stops drawing
	rectMouseout = function() {
		canvas.removeEventListener('mousemove', draw, false);
	};

	//Event listeners that will trigger the draw functions when
	//mousedown, mousemove, mouseup, mouseout
	canvas.addEventListener('mousedown', rectMouseDown, false);
	canvas.addEventListener('mouseup', rectMouseUp, false);
	canvas.addEventListener('mousemove', rectMouseMove, false);
	canvas.addEventListener('mouseout', rectMouseout, false);
};


