window.onload = function() {
	var circles = [] // 存放A,B,C,D,E五个小气泡

	var ev=document.createEvent('HTMLEvents');
	ev.initEvent('sum_circle_active', true, true); // 创建判断求和大气泡是否应该激活的事件

	for (var i = 0; i < 5; i++) {
		circles.push(document.getElementById('circle' + i.toString()));
		circles[i].flag = 1; // 判断气泡是否已被点击
		circles[i].onclick = get_number(circles, i, ev);
	}

	var sum_circle = document.getElementById('circle5'); // 获得求和大气泡

	document.getElementById('part2').onmouseout = circle_reset(circles, sum_circle); // 鼠标离开@+时，重置计算器

	sum_circle.addEventListener('sum_circle_active', sum_active, false);

	sum_circle.onclick = get_sum;
}

function get_number(circles, i, ev) {
	return function() {
		// 若气泡已被点击或未激活，则终止
		if (circles[i].flag == 0 || circles[i].className.indexOf('inactive') != -1) return;

		circles[i].flag = 0;

		for (var j = 0; j < 5; j++) {
			if (circles[j].flag == 1) circles[j].className = 'inactive';
		}

		var small_circle = document.createElement('span'); // 创建红色小气泡
		small_circle.id = 'text' + i.toString();
		small_circle.innerHTML = '...';
		circles[i].appendChild(small_circle);
		ajax_get_number(small_circle, circles, ev, i);
	};
}


function ajax_get_number(small_circle, circles, ev, i) {
	var xmlhttp;

	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
 	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if (circles[i].flag == 1) return; // 若计算器已被重置，则结束
			small_circle.innerHTML = xmlhttp.responseText;
			circles[i].className = 'inactive'; 
			if (all_inactive())  document.getElementById('circle5').dispatchEvent(ev); // 触发激活求和大气泡的事件

			for (var j = 0; j < 5; j++) { // 将未被点击的气泡重新激活
				if (circles[j].flag == 1) circles[j].className = 'active';
			}
		}
	};

	xmlhttp.open("GET", "http://localhost:3000/", true);
	xmlhttp.send();
}

function circle_reset(circles, sum_circle) { // 重置计算器
	return function() {
		for (var i = 0; i < circles.length; i++) {
			if (document.getElementById('text' + i.toString()) != null)
				circles[i].removeChild(document.getElementById('text' + i.toString()));
			circles[i].className = 'active';
			circles[i].flag = 1;
		}

		sum_circle.innerHTML = '';
		sum_circle.className = 'inactive';
	};
}

function get_sum() { // 求和
	if (document.getElementById('circle5').className == 'inactive') return;

	var sum = 0;

	for (var i = 0; i < 5; i++) {
		sum += parseInt(document.getElementById('text' + i.toString()).innerHTML);
	}

	document.getElementById('circle5').innerHTML = sum.toString();

}

function all_inactive() { // 判断小气泡是否全部灭活
	for (var i = 0; i < 5; i++) {
		if (document.getElementById('circle' + i.toString()).flag == 1)
			return false;
	}
	return true;
}

function sum_active() { // 激活求和大气泡
	document.getElementById('circle5').className = 'active';
}