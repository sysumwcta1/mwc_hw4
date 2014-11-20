function robot(index, aBubbles) {
	var oBar = document.getElementById('info-bar');
	if (index < aBubbles.length) {
		clickOnBubble(aBubbles[index], aBubbles);
		var that = aBubbles[index];
		ajax('http://localhost:3000', function(number) {
			showNumber(that, number);
			changeState(aBubbles);
			allNumbersGot(aBubbles);
			robot(index+1, aBubbles);
		});
	} else {
		addUp(oBar, aBubbles);
	}
}