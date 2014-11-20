window.onload = function() {
	var circles = [] // 存放A,B,C,D,E五个小气泡

	var ev=document.createEvent('HTMLEvents');
	ev.initEvent('sum_circle_active', true, true); // 创建判断求和大气泡是否应该激活的事件

	for (var i = 0; i < 5; i++) {
		circles.push(document.getElementById('circle' + i.toString()));
		circles[i].flag = 1; // 判断气泡是否已被点击
		circles[i].onclick = get_number(circles, i, ev, function() {});
	}

	var sum_circle = document.getElementById('circle5'); // 获得求和大气泡

	document.getElementById('part2').onmouseout = circle_reset(circles, sum_circle); // 鼠标离开@+时，重置计算器

	sum_circle.addEventListener('sum_circle_active', sum_active, false);

	sum_circle.onclick = get_sum;

	document.getElementById('image2').onclick = auto1(circles, ev);
}

function get_number(circles, i, ev, callback) {
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
		ajax_get_number(small_circle, circles, ev, i, callback);
	};
}


function ajax_get_number(small_circle, circles, ev, i, callback) {
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

			callback(circles, i, ev);
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
		document.getElementById('random_list').innerHTML = '';
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

function auto1(circles, ev) { // 仿真机器人
	return function() {
		var number_list = [4, 3, 2, 1, 0];
		for (var i = 0; i < 5; i++) { // 生成随机数列
			number_randomize(number_list);
		}

		for (var i = 0; i < 5; i++) { // 显示随机数列
			document.getElementById('random_list').innerHTML += number_list[i].toString() + ' ';
		}

		get_number(circles, number_list[0], ev, function() {
			get_number(circles, number_list[1], ev, function() {
				get_number(circles, number_list[2], ev, function() {
					get_number(circles, number_list[3], ev, function() {
						get_number(circles, number_list[4], ev, get_sum			
						)();
					})();
				})();
			})();
		})();
	};
}

function number_randomize(number_list) { // 随机排序
	for (var i = 0; i < 5; i++) {
		var random_num = Math.floor(Math.random()*4), temp;
		temp = number_list[i];
		number_list[i] = number_list[random_num];
		number_list[random_num] = temp;
	}
}