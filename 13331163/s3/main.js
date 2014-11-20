//  used for changed the state of all "li" and "button"
//  all statues can be reset normally after all operator over

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


//  for ajax , learn online
var XMLHttp = { 
    _objPool: [], 

    _getInstance: function () 
    { 
        for (var i = 0; i < this._objPool.length; i ++) 
        { 
            if (this._objPool[i].readyState == 0 || this._objPool[i].readyState == 4) 
            { 
                return this._objPool[i]; 
            } 
        } 

        // IE5中不支持push方法 
        this._objPool[this._objPool.length] = this._createObj(); 

        return this._objPool[this._objPool.length - 1]; 
    }, 

    _createObj: function () 
    { 
        if (window.XMLHttpRequest) 
        { 
            var objXMLHttp = new XMLHttpRequest(); 

        } 
        else 
        { 
            var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP']; 
            for(var n = 0; n < MSXML.length; n ++) 
            { 
                try 
                { 
                    var objXMLHttp = new ActiveXObject(MSXML[n]); 
                    break; 
                } 
                catch(e) 
                { 
                } 
            } 
         }           

        // mozilla某些版本没有readyState属性 
        if (objXMLHttp.readyState == null) 
        { 
            objXMLHttp.readyState = 0; 

            objXMLHttp.addEventListener("load", function () 
                { 
                    objXMLHttp.readyState = 4; 

                    if (typeof objXMLHttp.onreadystatechange == "function") 
                    { 
                        objXMLHttp.onreadystatechange(); 
                    } 
                },  false); 
        } 

        return objXMLHttp; 
    }, 

    // 发送请求(方法[post,get], 地址, 数据, 回调函数) 
    sendReq: function (method, url, data, callback) 
    { 
        var objXMLHttp = this._getInstance(); 

        with(objXMLHttp) 
        { 
            try 
            { 
                // 加随机数防止缓存 
                if (url.indexOf("?") > 0) 
                { 
                    url += "&randnum=" + Math.random(); 
                } 
                else 
                { 
                    url += "?randnum=" + Math.random(); 
                } 

                open(method, url, true); 

                // 设定请求编码方式 
                setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 
                send(data); 
                onreadystatechange = function () 
                { 
                    if (objXMLHttp.readyState == 4 && (objXMLHttp.status == 200 || objXMLHttp.status == 304)) 
                    { 

                        callback(objXMLHttp.responseText); 
                    } 
                } 
            }
            catch(e) 
            {
                alert(e); 
            }
        }
    }
};

function ajax(url, successfunction, failfunction) {
	XMLHttp.sendReq('GET', url, '', successfunction);
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

	// for mouse out @+
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

	// initial
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

	// for click event
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].clicked = 0;
		aLi[i].onclick = function(i) {
			return function (ev) {
				var oEvent = ev || event;
				oEvent.cancelBubble = true;
				if (this.style.backgroundColor == "gray") return;

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
