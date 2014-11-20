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
	var sequence = document.getElementById("sequence");
	var totalNum = 0;
	
	var oExtend = document.getElementById("extend");
	var oButton = document.getElementById("button");
	var flag;
	var ButtonModel = 0;

	// 生成随机序列
	var list = new Array();
	var hadused = new Array();
	var reflect = new Array("A", "B", "C", "D", "E");

	// 初始状态
	changeBackground(aLi, aLi.length+1, 1);

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
			sequence.style.display = "none";
			sequence.innerHTML = '';
		}, 0);
	}

	oSum.onclick = function (ev) {
		var oEvent = ev || event;
		if (oSum.style.backgroundColor != "blue") {
			oEvent.cancelBubble = true;
			return;
		}
		var sum = 0;
		for (var i = 0; i < aSpan.length; i++) {
			sum = sum + Number(aSpan[i].innerHTML);
		}
		oSum.innerHTML = sum;
		oSum.style.backgroundColor = "gray";
		changeBackground(aLi, aLi.length+1, 1);
		oEvent.cancelBubble = true;
	};


	for (var i = 0; i < aLi.length; i++) {
		aLi[i].clicked = 0;
		aLi[i].onclick = function(i) {
			return function (ev) {
				sequence.innerHTML += " " + reflect[i];
				var oEvent = ev || event;

				if (this.style.backgroundColor == "gray") return;

				if (this.clicked == 0) totalNum++;
				// if (aSpan[i].innerHTML == "") totalNum++;
				// alert(totalNum);
				
				changeBackground(aLi, i, 0);
				aSpan[i].style.display = "block";
				aSpan[i].innerHTML = "...";

				// 
				ajax("http://localhost:3000", function(returnNum) {
					changeBackground(aLi, i, 1);
					aSpan[i].innerHTML = returnNum;
					if (totalNum == aLi.length)
						oSum.style.backgroundColor = "blue";
					if (ButtonModel == 1) {

						list.hasclick++;
						// alert(list.hasclick);
						if (list.hasclick != list.length) {
							setTimeout(function() {
								aLi[list[list.hasclick]].onclick();
							},0);
						} else {
							setTimeout(function() {
								oSum.onclick();
							},0);
							ButtonModel = 0;
						}
					}
				}, function () {
					// function for fail state
				});
				oEvent.cancelBubble = true;
			}
		}(i);
	}

	
	oButton.onclick = function () {
		var temp;
		ButtonModel = 1;
		list.hasclick = 0;
		totalNum = 0;
		oSum.innerHTML = "";
		for (var i = 0; i < aLi.length; i++) {
			hadused[i] = false;
		}
		for (var i = 0; i < aLi.length; i++) {
			while (true) {
				temp = Math.floor(Math.random() * 100) % aLi.length;
				if (!!hadused[temp]) continue;
				else {
					hadused[temp] = true;
					list[i] = temp;
					console.log(temp);
					break;
				}
			}
		}
		sequence.style.display = "block";
		sequence.innerHTML = "";

		setTimeout(function() {
			aLi[list[0]].onclick();
		},0);

	};
}
