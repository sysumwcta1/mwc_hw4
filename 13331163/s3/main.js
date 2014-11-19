function changeBackground(aLi, index, status) {
	if (status == 0) {
		for (var i = 0; i < aLi.length; i++) {
			if (i == index) {
				aLi[i].style.backgroundColor = "blue";
			} else {
				aLi[i].style.backgroundColor = "gray";
			}
		}
	} else if (status == 1) {
		for (var i = 0; i < aLi.length; i++) {
			if (i == index) {
				aLi[i].style.backgroundColor = "gray";
			} else {
				aLi[i].style.backgroundColor = "blue";
			}
		}
	}
}

function ajax(url, successfunction, failfunction) {
	var oAjax;
	// 创建Ajax对象
	if (window.XMLHttpRequest) {
		oAjax = new XMLHttpRequest();
	} else {
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// 连接服务器
	oAjax.open("GET", url, true);
	// 发送请求
	oAjax.send();
	// 接受返回
	oAjax.onreadystatechange = function () {
		if (oAjax.readyState == 4 && oAjax.status == 200) {
			successfunction(oAjax.responseText);
		} else {
			// failfunction();
		}
	}
}

window.onload = function () {
	var aLi      = document.getElementById("control-ring").getElementsByTagName("li");
	var aSpan    = document.getElementById("control-ring").getElementsByTagName("span");
	var oSum     = document.getElementById("info-bar").getElementsByTagName("div")[0];
	var totalNum = 0;

	var ButtonModel = 0;
	var oExtend = document.getElementById("extend");
	var oButton = document.getElementById("button");
	var flag;
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].onmouseover = function () {
			flag = 1;
		}

		aLi[i].onmouseout = function () {
			flag = 0;
		}
	}
	oSum.onmouseover = function () {
		flag = 1;
	}
	oSum.onmouseout = function () {
		flag = 0;
	}
	oButton.onmouseover = function () {
		flag = 1;
	}
	oButton.onmouseout = function () {
		flag = 0;
	}

	oExtend.onmouseout = function() {
		setTimeout(function () {
			if (flag == 1) return;
			// reset
			for (var i = 0; i < aSpan.length; i++) {
				aSpan[i].style.display = "none";
			}
			changeBackground(aLi, aLi.length+1, 1);
			oSum.style.backgroundColor = "gray";
			oSum.innerHTML = "";
			totalNum = 0;
		}, 0);
	}

	changeBackground(aLi, aLi.length+1, 1);


	oSum.onclick = function (ev) {
		var oEvent = ev || event;
		oEvent.cancelBubble = true;
		if (oSum.style.backgroundColor != "blue") return;
		var sum = 0;
		for (var i = 0; i < aSpan.length; i++) {
			sum = sum + Number(aSpan[i].innerHTML);
		}
		oSum.innerHTML = sum;
		oSum.style.backgroundColor = "gray";
		changeBackground(aLi, aLi.length+1, 1);
	};

	oButton.onclick = function () {
		ButtonModel = 1;
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].onclick();
		}
	}

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].clicked = 0;
		aLi[i].onclick = function(i) {
			return function (ev) {
				var oEvent = ev || event;
				oEvent.cancelBubble = true;
				if (this.style.backgroundColor == "gray") return;
				// 改变背景颜色和span的内容
				// if (aSpan[i].innerHTML == "") totalNum++;
				var that = this;
				aSpan[i].style.display = "block";
				aSpan[i].innerHTML = "...";

				// 
				ajax("http://localhost:3000", function(returnNum) {
					aSpan[i].innerHTML = returnNum;
					aLi[i].style.backgroundColor = "gray";
					if (that.clicked == 0) totalNum++;
					if (totalNum == aLi.length) {
						oSum.style.backgroundColor = "blue";
						if (ButtonModel == 1) {
							oSum.onclick();
							ButtonModel = 0;
						}
					}
				}, function () {
					// function for fail state
				});
			}
		}(i);
	}

	
}
