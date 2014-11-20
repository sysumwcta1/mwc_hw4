window.onload = function(){
	setbubble();
	makeclear();

}

function setbubble() {

	$("li[title = active]").click(function (){
		$(this).css('background-color','rgba(0, 0, 0, 0.6)');
		$(this).off('click');
		$(this).children("span").addClass("unread");
		var that = this;
		addtitle(that);
		deactive(that);
		$(that).children().text('...');

		getrandomnum(that,function(random_num){
			$(that).children().text(random_num);
			reactive(that);
			setbigbubble(that,function() {});
		});
		

})
}

function resetbubble() {
	$("li").attr("title",'active');
	$("li").children("span").empty();
	$("li").children("span").removeClass('unread');
	$("li").css('background-color', 'rgba(48, 63, 159, 1)');
	setbubble();
}

function makeclear() {
	$('body').first().mouseleave(function() {
		resetbubble();
		resetbigbubble();
	});
}

function getrandomnum(that,callback) {
	var random_num;

		setTimeout(function(){

	    if (typeof callback === 'function') {
	    	random_num = Math.floor(Math.random()*9+1);
	      callback(random_num);	         
	      return random_num;
	    }
	  }, Math.floor(Math.random()*3+1)*1000);	 
}

function deactive(that) {
	console.log(that);
	$(that).first().siblings().off('click');
	$(that).first().siblings().css('background-color','rgba(0, 0, 0, 0.6)');
}

function reactive(that) {
	$(that).first().siblings('[title = active]').add(setbubble());
	$(that).first().siblings('[title = active]').css('background-color', 'rgba(48, 63, 159, 1)');
}

function addtitle(that) {
	$(that).attr("title",'inactive');
}
function setbigbubble(that,callback) {

	setTimeout(function() {
		if(typeof callback === 'function') {
			callback();

	if($('li[title = inactive]').length == 5) {
		$('#info-bar').css('background-color', 'rgba(48, 63, 159, 1)');
		$('#info-bar').click(function() {
		$('#info-bar').css('background-color','rgba(0, 0, 0, 0.6)');
		var str = $('li[title = inactive]').children().text();
		console.log("hello nope "+$('li[title = inactive]').children().text());
		for(var i=0,sum=0;i < str.length;i++) {
			sum += parseInt(str[i]);
		}
		$('#info-bar li').children().text(sum);
				});
			}
		}
	},0);

}
function resetbigbubble() {
	$('#info-bar').css('background-color','rgba(0, 0, 0, 0.6)');
	$('#info-bar').off('click');
}

