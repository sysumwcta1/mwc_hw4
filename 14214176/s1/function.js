$(document).ready(function() {
	$('#info-bar').addClass('disable');
	$('#control-ring li').addClass('able').click(cycleClick);
	$('#at-plus-container').mouseleave(atplusMouseLeave);
});

function atplusMouseLeave(event) {
	var lis = $('#control-ring li');
	lis.addClass('able').removeClass('disable').click(cycleClick);
	lis.children().remove();
	$('#info-bar').addClass('disable').removeClass('able');
	$('.info').empty();
}

function cycleClick(event) {
	//加载中...
	var span = $('<span class="unread">..</span>');
	var target = $(event.target);
	var brothers = target.siblings();
	target.append(span);

	//灭活样式、取消点击事件
	brothers.addClass('disable');
	brothers.unbind('click');
	target.unbind('click');

	//模拟向服务器请求
	$.ajax({
		url: '127.0.0.1:3000',
		success: function(data) {
			//去掉灭活样式、恢复点击事件
			target.addClass('disable');
			brothers.filter(':not(:empty)').addClass('disable');
			brothers.filter(':empty').removeClass('disable').click(cycleClick);

			//显示服务器的结果
			$(span).text(data);

			//判断是否激活大圆圈
			var lis = $('#control-ring li');
			var not_empty_lis = lis.filter(':not(:empty)');

			if (lis.length == not_empty_lis.length) {
				$('#info-bar').removeClass('disable').addClass('able').click(bigCycleClick);
			}
		}
	});
}

function bigCycleClick(event) {
	//计算和
	var sum = 0;
	var spans = $('#control-ring li span');

	for (var i = 0; i < spans.length; i++) {
		sum += parseInt(spans[i].innerText);
	}
	$('.info').text(sum);

	//灭活和解除事件
	$(event.target).removeClass('able').addClass('disable').unbind('click');
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