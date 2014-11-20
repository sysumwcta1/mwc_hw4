var queue = ['A', 'B', 'C', 'D', 'E']; //执行顺序

$(document).ready(function() {
	//给小圆圈增加顺序属性
	var lis = $('#control-ring li');
	for (var i = 0; i < queue.length; i++) {
		$(lis[i]).attr('queue', queue[i]);
	}

	//初始化顺序
	initQueue();

	//初始化样式和事件
	lis.addClass('able');
	$('#info-bar').addClass('disable');
	$('#at-plus-container').mouseenter(atplusMouseEnter).mouseleave(atplusMouseLeave);


});

function atplusMouseEnter(event) {
	cycleClick(cycleClick);
}

function atplusMouseLeave(event) {
	//恢复到初始样式
	var lis = $('#control-ring li');
	lis.addClass('able').removeClass('disable');
	lis.children().remove();
	$('#info-bar').addClass('disable').removeClass('able');
	$('.info').empty();
}

function cycleClick(callback) {
	var target = $('[queue="' + queue.shift() + '"]');
	if (target.length == 0) {
		initQueue();
		return;
	}
	//加载中...
	var span = $('<span class="unread">..</span>');
	var brothers = target.siblings();
	target.append(span);

	//灭活样式
	brothers.addClass('disable');

	//向服务器请求
	$.ajax({
		url: '127.0.0.1:3000',
		success: function(data) {
			//去掉灭活样式、恢复点击事件
			target.addClass('disable');
			brothers.filter(CheckNotEmpty).addClass('disable');
			brothers.filter(CheckEmpty).removeClass('disable');

			//显示服务器的结果
			$(span).text(data);

			//判断是否激活大圆圈
			var lis = $('#control-ring li');
			//var not_empty_lis = lis.filter(':not(:empty)');
			var not_empty_lis = lis.filter(CheckNotEmpty);

			if (lis.length == not_empty_lis.length) {
				var info_bar = $('#info-bar');
				info_bar.removeClass('disable').addClass('able');
				bigCycleClick(info_bar);
			}

			//callback
			if (callback) {
				callback(callback);
			}
		}
	});
}

function bigCycleClick(target) {
	//计算和
	var sum = 0;
	var spans = $('#control-ring li span');

	for (var i = 0; i < spans.length; i++) {
		sum += parseInt(spans[i].innerText);
	}
	$('.info').text(sum);

	//灭活和解除事件
	target.removeClass('able').addClass('disable');
}


function initQueue() {
	queue = ['A', 'B', 'C', 'D', 'E']
	queue.sort(function(a, b) {
		return Math.random() > .5 ? -1 : 1;
	});
}

function CheckEmpty(index, el) {
	return checkEmptyByFlag(index, el, true);
}

function CheckNotEmpty(index, el) {
	return checkEmptyByFlag(index, el, false);
}

function checkEmptyByFlag(index, el, flag) {
	flag = (flag != undefined) ? flag : true;
	var unread = $(el).children('.unread');
	if (unread.length == 0) {
		return flag;
	}
	if (isNaN(unread.text())) {
		return flag;
	}
	return !flag;
}


function server(callback) {
	var random_time = 1000 + getRandomNumber(2000);
	var random_num = 1 + getRandomNumber(9);
	setTimeout(function() {
		callback(random_num);
	}, random_time);

}

function getRandomNumber(limit) {
	return Math.round(Math.random() * limit);
}