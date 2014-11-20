data = new Array;
index = 0;

document.onclick = function() {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	if (target.id == 'bottom-positioner') {
		var list = document.getElementsByTagName('li');
			loadXMLDoc(list[0])
		}
}

document.onmouseout = function ResetAll() {
	var e = e || window.event;
	var target = e.target || e.srcElement;

	if (target.id == 'info-bar') {
		var list = document.getElementsByTagName('li');
		for (var i = 0; i < list.length; i++) {
			list[i].children[0].className = '';
			list[i].children[0].textContent = '';
			if (list[i].className.indexOf('  active') <= 0)
				list[i].className += '  active';
		}
		document.getElementById('info-bar').children[0].textContent = '';
		index = 0;
	}
}

function loadXMLDoc(target) {
	var xmlhttp;
	if (window.XMLHttpRequest)
	    xmlhttp=new XMLHttpRequest();
	else
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	tar = target;
	xmlhttp.onreadystatechange=function(tar) {
		if (xmlhttp.readyState == 1 || xmlhttp.readyState == 0) {
			target.children[0].className = 'unread';
			target.children[0].textContent = '..';
			var list = document.getElementsByTagName('li');
			for (var i = 0; i < list.length; i++)
				if (list[i].className.indexOf('  active') > 0)
					list[i].className = list[i].className.substring(0, list[i].className.indexOf('  active'));
		}
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    	data[index] = xmlhttp.responseText;
	    	target.children[0].innerText = xmlhttp.responseText;
	    	if (index < 4) {
	    		var list = document.getElementsByTagName('li');
				for (var i = 0; i < list.length; i++) {
					if (list[i].children[0].innerText == '')
						list[i].className += '  active';
				}
				loadXMLDoc(target.nextElementSibling)
	    	} else if (index == 4) {
	    		var info_bar = document.getElementById('info-bar');
				info_bar.className = 'active';
				var sum = 0;
				for (var i = 0; i < data.length; i++)
					sum += parseInt(data[i]);
				info_bar.children[0].textContent = sum.toString();
				info_bar.className = "";
	    	}
			index++;
		}
	}
	xmlhttp.open("GET","/",true);
	xmlhttp.send();
}
