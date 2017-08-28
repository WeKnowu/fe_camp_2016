import Recorder from './record.js';



var test = new Recorder();
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