/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__record_js__ = __webpack_require__(1);




var test = new __WEBPACK_IMPORTED_MODULE_0__record_js__["a" /* default */]();
test.res();
var password = localStorage.getItem("handlock_password") || defaultPassword;
var selectMode = document.querySelector("#select");
var hint = document.querySelector("#description");
var tip = document.querySelector("#tip");
var value = "check";
var locker = {
	check: function() {
		password = localStorage.getItem("handlock_password") || defaultPassword;
		if (record === password) {
			hint.innerHTML = "密码正确！";
		} else {
			hint.innerHTML = "密码错误，请重新绘制！";
		}
		record = "";
	},
	update: function() {
		if (repeat.length) {
			if (record === repeat) {
				localStorage.setItem("handlock_password", record);
				record = "";
				repeat = "";
				document.querySelector("#checkMode").checked = true;
				value = "check";
				hint.innerHTML = "验证密码，请绘制密码图案";
			} else {
				record = "";
				repeat = "";
				hint.innerHTML = "两次的图形绘制不一致";
			}
		} else {
			hint.innerHTML = "请再次绘制相同图案";
		}
	}
}

selectMode.addEventListener("change", function(e) {
	value = e.target.value;
	if (value === "update") {
		clearPath();
		hint.innerHTML = "设置密码，请绘制密码图案";

	} else if (value === "check") {
		clearPath();
		record = "";
		repeat = "";
		hint.innerHTML = "验证密码，请绘制密码图案";
	}
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const touchRadius = 40;
const defaultPassword = "0124678";
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
function beforeLock(c) {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			drawCircle(c, w * (i + 1) / 4, h * (j + 1) / 4, 10, 0, 2 * Math.PI, false, "#969696", 1);
		}
	}
}
/**
 * draw the canvas while touchstart
 * @param e event
 */
function touchstartHandle(e) {
	var {
		clientX,
		clientY
	} = e.changedTouches[0];
	var location = getLocation(canvas[2], clientX, clientY);
	var i = whichCircle(location.x, w);
	var j = whichCircle(location.y, h);

	if (!clicked[j * 3 + i]) {
		var distance = getDistance(location.x, location.y, w * (i + 1) / 4, h * (j + 1) / 4);
		if (distance < touchRadius) {
			drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 30, 0, 2 * Math.PI, false, "#fff", true);
			drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 10, 0, 2 * Math.PI, false, "red", true);
			drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 30, 0, 2 * Math.PI, false, "red", false);
			clicked[j * 3 + i] = true;
			touchPoint.push(j * 3 + i);
			flag = true;
			startPoint = [w * (i + 1) / 4, h * (j + 1) / 4];
		}
	}
}
/**
 * draw the canvas while touchmove
 * @param e event
 */
function touchmoveHandle(e) {
	var {
		clientX,
		clientY
	} = e.changedTouches[0];
	var location = getLocation(canvas[2], clientX, clientY);
	var i = whichCircle(location.x, w);
	var j = whichCircle(location.y, h);
	if (!clicked[j * 3 + i]) {
		var distance = getDistance(location.x, location.y, w * (i + 1) / 4, h * (j + 1) / 4);
		if (distance < touchRadius) {
			drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 30, 0, 2 * Math.PI, false, "#fff", true);
			drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 10, 0, 2 * Math.PI, false, "red", true);
			drawCircle(canvas[2], w * (i + 1) / 4, h * (j + 1) / 4, 30, 0, 2 * Math.PI, false, "red", false);
			clicked[j * 3 + i] = true;
			touchPoint.push(j * 3 + i);
			endPoint = [w * (i + 1) / 4, h * (j + 1) / 4];
			if (flag) {
				clearCanvas(canvas[1]);
				drawLine(canvas[0], startPoint[0], startPoint[1], endPoint[0], endPoint[1], "red");
			}
			startPoint = endPoint;
			flag = true;
		}
	}
	if (flag) {
		clearCanvas(canvas[1]);
		drawLine(canvas[1], startPoint[0], startPoint[1], location.x, location.y, "red");
	}
}
/**
 * @decription clearPath is a function that clear the path which has been drew.
 */
function clearPath() {
	clearCanvas(canvas[0]);
	clearCanvas(canvas[1]);
	clearCanvas(canvas[2]);
	beforeLock(canvas[2]);
	clicked.fill(false);
	flag = false;
	startPoint = [0, 0];
	endPoint = [0, 0];
}
/**
 * draw the canvas while touchend
 */
function touchendHandle() {
	if (flag) {
		if (touchPoint.length < 4) {
			tip.className = "show";
			setTimeout(function() {
				tip.className = "hide";
			}, 1000);
		} else {
			record = touchPoint.join("");
			touchPoint.splice(0, touchPoint.length);
			clearPath();
			return record;
		}
		touchPoint.splice(0, touchPoint.length);
		clearPath();
		return null;
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
		beforeLock(canvas[2]);

		var clicked = new Array(9); //clicked数组元素表示9个点是否已被连接
		clicked.fill(false);
		var flag = false; //flag为false，表示未开始进行连接；flag为true，表示已开始连接点
		var startPoint = [0, 0];
		var endPoint = [0, 0];
		var touchPoint = []; //连接点编号数组
		var record = ""; //记录重复前图案的字符串
		var repeat = ""; //记录重复后图案的字符串
class Recorder {
	// constructor() {
		
	// }
	res() {
		canvas[2].addEventListener("touchstart", touchstartHandle);
		canvas[2].addEventListener("touchmove", touchmoveHandle);
		document.addEventListener("touchend", touchendHandle);
		console.log('hello');
		return record;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Recorder;


/***/ })
/******/ ]);