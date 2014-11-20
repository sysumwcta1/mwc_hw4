function robot(aBubbles) {
	var oBar = document.getElementById('info-bar');
	for(var i = 0; i < aBubbles.length; i++) {
		removeClass(aBubbles[i], 'enable');
		addClass(aBubbles[i], 'disable');	
	
		clickOnBubble(aBubbles[i], aBubbles);
		var index = 0;

		//用ajax对象池来实现所有请求同时处理
		XMLHttp.sendReq('GET', 'http://localhost:3000', '', function(number) {
			showNumber(aBubbles[index], number);
			changeState(aBubbles);
			if (index == aBubbles.length-1) {
				allNumbersGot(aBubbles);
				addUp(oBar, aBubbles);
			}
			index++;
		}); 
	}
}