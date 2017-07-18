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
	ctx.closePath();
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
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.moveTo(xFrom, yFrom);
	ctx.lineTo(xTo, yTo);
	ctx.stroke();
	ctx.closePath();
	return ctx;
}
/**
 * @description Add a function which will be executing when the window is onload.
 * @param func The function that is to add.
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
/**
 * @description getLocation is a function that get X-coordinate and Y-coordinate on canvas.
 * @param  canvas The rectangular coordinate system.
 * @param x, y The coordinates in the window.
 * @return the coordinate.
 */
function getLocation(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect(); //获取canvas相对于视窗的位置集合
	return {
		x: (x - bbox.left) * (canvas.width / bbox.width),
		y: (y - bbox.top) * (canvas.height / bbox.height)
	}
}
/**
 * getDistance is a function that calculate the distance of two points.
 * @return the distance.
 */
function getDistance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}
/**
 * whichCircle is a function that find which circle the mouse is near.
 * @param  location X or Y coordinate.
 * @param  len The value of width or height.
 * @return the number of circle.
 */
function whichCircle(location, len) {
	if (location <= 3 * len / 8) {
		return 0;
	} else if ((3 * len / 8 < location) && (location <= 5 * len / 8)) {
		return 1;
	} else {
		return 2;
	}
}
/**
 * clearCanvas is a function that clear the given canvas.
 */
function clearCanvas(c) {
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
}
/**
 * beforeClock is a functio that draw 9 small circles.
 * @param  c The canvas.
 */
function beforeClock(c) {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			drawCircle(c, w * (i + 1) / 4, h * (j + 1) / 4, 10, 0, 2 * Math.PI, false, "#969696", 1);
		}
	}
}
/* set the width of canvas */
var canvas = document.getElementsByTagName("canvas");
var handlock = document.getElementById("handlock");
for (var i = 0; i < canvas.length; i++) {
	canvas[i].setAttribute("width", handlock.offsetWidth);
	canvas[i].setAttribute("height", handlock.offsetWidth);
}
/* draw the canvas in the beginning */
var w = canvas[0].getAttribute("width");
var h = canvas[0].getAttribute("height");
beforeClock(canvas[2]);
/* draw the canvas while mousedown */
var clicked = new Array(9); //clicked数组元素表示9个点是否已被连接
clicked.fill(false);
var flag = false; //flag为false，表示未开始进行连接；flag为true，表示已开始连接点
var startPoint = [0, 0];
var endPoint = [0, 0];
canvas[2].addEventListener("mousedown", function(e) {
	var location = getLocation(canvas[2], e.clientX, e.clientY);
	var i = whichCircle(location.x, w);
	var j = whichCircle(location.y, h);
	if (!clicked[i * 3 + j]) {
		var distance = getDistance(location.x, location.y, w * (i + 1) / 4, h * (j + 1) / 4);
		if (distance < 30) {
			drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 30, 0, 2 * Math.PI, false, "#fff", true);
			drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 10, 0, 2 * Math.PI, false, "red", true);
			drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 30, 0, 2 * Math.PI, false, "red", false);
			clicked[i * 3 + j] = true;
			flag = true;
			startPoint = [w * (i + 1) / 4, h * (j + 1) / 4];
		}
	}
});
/* draw the canvas while mousemove */
canvas[2].addEventListener("mousemove", function(e) {
	if (flag) {
		var location = getLocation(canvas[2], e.clientX, e.clientY);
		var i = whichCircle(location.x, w);
		var j = whichCircle(location.y, h);
		if (!clicked[i * 3 + j]) {
			var distance = getDistance(location.x, location.y, w * (i + 1) / 4, h * (j + 1) / 4);
			if (distance < 30) {
				drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 30, 0, 2 * Math.PI, false, "#fff", true);
				drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 10, 0, 2 * Math.PI, false, "red", true);
				drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 30, 0, 2 * Math.PI, false, "red", false);
				clicked[i * 3 + j] = true;
				endPoint = [w * (i + 1) / 4, h * (j + 1) / 4];
				clearCanvas(canvas[1]);
				drawLine(canvas[0], startPoint[0], startPoint[1], endPoint[0], endPoint[1], "red");
				startPoint = endPoint;
			}
		}
		clearCanvas(canvas[1]);
		drawLine(canvas[1], startPoint[0], startPoint[1], location.x, location.y, "red");
	}
});
/* clear the canvas while mouseup */
document.addEventListener("mouseup", function() {
	clearCanvas(canvas[0]);
	clearCanvas(canvas[1]);
	clearCanvas(canvas[2]);
	beforeClock(canvas[2]);
	clicked.fill(false);
	flag = false;
	startPoint = [0, 0];
	endPoint = [0, 0];
});