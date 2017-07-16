/**
 * @description drawCircle is a function that, given some parameters, return a circle or an arc.
 * @param  canvas Where to draw.
 * @param  x,y The address of the circle.
 * @param  mode Which to draw: a circle or an arc.
 * @return the drawed object.
 */
function drawCircle(canvas, x, y, radius, startAngle, endAngle, anticlockwise, color, mode) {
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
	if (mode) {
		ctx.fillStyle = color;
		ctx.fill();
	} else {
		ctx.strokeStyle = color;
		ctx.stroke();
	}
	return ctx;
}
/**
 * @description drawLine is a function that, given some parameters, return a line.
 * @param  canvas Where to draw.
 * @param  xFrom, yFrom The begin of the line.
 * @param  xTo, yTo The end of the line.
 * @return the drawed object.
 */
function drawLine(canvas, xFrom, yFrom, xTo, yTo, color) {
	var ctx = canvas.getContext("2d");
	ctx.lineTo(xFrom, yFrom);
	ctx.moveTo(xTo, yTo);
	ctx.strokeStyle = color;
	ctx.stroke();
	return ctx;
}
/**
 * @description Add a function which will be executing when the window is onload.
 * @param func The function that is added.
 */
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload;
			func();
		}
	}
}

var canvas = document.getElementsByTagName("canvas");
var handlock = document.getElementById("handlock");
for (var i = 0; i < canvas.length; i++) {
	canvas[i].setAttribute("width", handlock.offsetWidth);
	canvas[i].setAttribute("height", handlock.offsetWidth);
}
var c = document.getElementsByTagName("canvas")[2];
var w = c.getAttribute("width");
var h = c.getAttribute("height");
for (var i = 0; i < 3; i++) {
	for (var j = 0; j < 3; j++) {
		drawCircle(canvas[0], w * (i + 1) / 4, h * (j + 1) / 4, 10, 0, 2 * Math.PI, false, "#969696", 1);
	}
}