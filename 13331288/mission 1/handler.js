button = ['A', 'B', 'C', 'D', 'E']
data = new Array;
index = 0;

document.onclick = function() {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	if (target.nodeName.toLowerCase() == 'li' && index < 5) {

		loadXMLDoc(target);

		target.children[0].className = 'unread';
		target.children[0].textContent = '..';
		list = document.getElementsByTagName('li');
		for (var i = 0; i < list.length; i++) {
			if (list[i].className.indexOf('  active') > 0)
			list[i].className = list[i].className.substring(0, list[i].className.indexOf('  active'));
		}

	} else if (target.id == 'info-bar' && index == 5) {
		var sum = 0;
		for (var i = 0; i < data.length; i++)
			sum += parseInt(data[i]);
		target.children[0].textContent = sum.toString();
		target.className = "";
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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    	data[index] = xmlhttp.responseText;
	    	target.children[0].innerText = xmlhttp.responseText;
	    	if (index < 4) {
	    		list = document.getElementsByTagName('li');
				for (var i = 0; i < list.length; i++) {
					if (list[i].children[0].innerText == '')
						list[i].className += '  active';
				}
	    	} else if (index == 4)
				document.getElementById('info-bar').className = 'active';
			index++;
		}
	}
	xmlhttp.open("GET","/",true);
	xmlhttp.send();
}
