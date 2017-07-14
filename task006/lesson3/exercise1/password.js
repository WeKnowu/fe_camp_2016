function checkPassword(){
	var password = document.getElementsByTagName('input')[0];
	var str = password.value;
	str = str.split("-").join(""); //去除连字符
	str = str.toUpperCase();
	if(str.length != 20){
    	return "异常：无效的密码格式";
    }else{
    	return str;
    }
}
var btn = document.getElementById("btn");
btn.onclick = function(){
	alert(checkPassword());
}