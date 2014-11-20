window.onload = function() {
	var circles = [] // 存放A,B,C,D,E五个小气泡

	var ev=document.createEvent('HTMLEvents');
	ev.initEvent('sum_circle_active', true, true); // 创建判断求和大气泡是否应该激活的事件

	for (var i = 0; i < 5; i++) {
		circles.push(document.getElementById('circle' + i.toString()));
		circles[i].flag = 1; // 判断气泡是否已被点击
		circles[i].onclick = get_number("http://localhost:3000/", false, circles, i, ev, function() {});
	}

	var sum_circle = document.getElementById('circle5'); // 获得求和大气泡

	document.getElementById('part2').onmouseout = circle_reset(circles, sum_circle); // 鼠标离开@+时，重置计算器

	sum_circle.addEventListener('sum_circle_active', sum_active, false);

	sum_circle.onclick = get_sum;

	document.getElementById('image2').onclick = auto1(circles, ev);
}

function get_number(host, flag, circles, i, ev, callback) {
	return function() {
		// flag用于判断是否允许同时点击多个气泡
		if (flag == true) {
			get_num(host, flag, circles, i, ev, callback);
			return;
		}

		// 若气泡已被点击或未激活，则终止
		if (circles[i].flag == 0 || circles[i].className.indexOf('inactive') != -1) return;

		get_num(host, flag, circles, i, ev, callback);	
		for (var j = 0; j < 5; j++) { // 灭活其他未被点击的小气泡
			if (circles[j].flag == 1) circles[j].className = 'inactive';
		}	
	};
}

function get_num(host, flag, circles, i, ev, callback) {
	circles[i].flag = 0;

	var small_circle = document.createElement('span'); // 创建红色小气泡
	small_circle.id = 'text' + i.toString();
	small_circle.innerHTML = '...';
	circles[i].appendChild(small_circle);
	ajax_get_number(host, flag, small_circle, circles, ev, i, callback);
}


function ajax_get_number(host, flag, small_circle, circles, ev, i, callback) {
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

			if (flag == true && document.getElementById('circle5').className == 'active') get_sum();

			callback(flag, circles, i, ev);
		}
	};

	xmlhttp.open("GET", host, true);
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
		var text = document.getElementById('text' + i.toString())
		if (text == null || text.innerHTML == '...') return false;
	}
	return true;
}

function sum_active() { // 激活求和大气泡
	document.getElementById('circle5').className = 'active';
}

function auto1(circles, ev) { // 仿真机器人，从多个服务器获取数据，真正达到并行的效果
	return function() {
		get_number("http://localhost:3000/", true, circles, 4, ev, function() {})();
		get_number("http://localhost:4000/", true, circles, 3, ev, function() {})();
		get_number("http://localhost:5000/", true, circles, 2, ev, function() {})();
		get_number("http://localhost:8000/", true, circles, 1, ev, function() {})();
		get_number("http://localhost:7000/", true, circles, 0, ev, function() {})();
	};
}