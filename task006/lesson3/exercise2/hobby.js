function checkHobby(){
	var hobby = document.getElementsByTagName("input")[0];
	var str = hobby.value;
	str = str.split(',');
	var newStr = "";
	for(var i=0;i<str.length;i++){
		if(newStr.indexOf(str[i])==-1){
			if(i!=0){
				newStr = newStr + "," + str[i];
			}else{
				newStr += str[i];
			}
		}
	}
	return newStr;
}
var btn = document.getElementById("btn");
btn.onclick = function(){
	alert(checkHobby());
}