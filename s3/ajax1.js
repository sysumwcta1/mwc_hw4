window.onload = function() {
	response(); //response to the click
}

function response() {
	var isMouseLeave = document.getElementById("ison");
	var count = 0; // count the number of the click
	var isFirstClick = [0, 0, 0, 0, 0]; //is the firsttime click
	var hasClick = [0, 0, 0, 0, 0];
	var littleCircus = document.getElementsByClassName("button");
	var bigCircus = document.getElementById("user1");
	var sum = 0;
	var isActive = 0;
	bigCircus.style.background = "grey";

	isMouseLeave.onmouseout = function() {
		for (var i = 0; i < 5; i++) {
			littleCircus[i].style.background = " blue";
			littleCircus[i].innerHTML = "";
		}

		isFirstClick = [0, 0, 0, 0, 0];
		hasClick = [0, 0, 0, 0, 0];
		sum = 0; //reset the value when the mouse is out
		isActive = 0;
		count = 0;

		bigCircus.style.background = "grey";
		bigCircus.innerHTML = "";
	}

	isMouseLeave.onclick = function() {
		littleCircus0(function() {
			littleCircus1(function() {
				littleCircus2(function() {
					littleCircus3(function() {
						littleCircus4(function() {
						bigCircus0();
						});
					});
				});
			});
		});
	}


	littleCircus0 = function(callback) {
		setTimeout(function() {
			if (!isFirstClick[0]) {
				if (typeof callback === 'function') {
				callback();
			}
				hasClick[0] = 1;
				for (var i = 0; i < 5; i++) {
					if (i != 0)
						littleCircus[i].style.background = "grey";
				}
				isFirstClick[0] = 1; //isvisited
				count++;
				ajax(function(num) {
					sum += parseInt(num);
					littleCircus[0].innerHTML = "<span class='unread'>" + num + "</span>";
					littleCircus[0].style.background = "grey"; //change the background
					for (var i = 0; i < 5; i++) {
						if (hasClick[i] != 1)
							littleCircus[i].style.background = "blue";
					}
				}, function() {
					littleCircus[0].innerHTML = "<span class='unread'>...</span>"
				});
				if (count == 5)
					bigCircus.style.background = "blue";
			}
		}, Math.random * 1000);
	}


	littleCircus1 = function(callback) {
		setTimeout(function() {
			if (!isFirstClick[1]) {
				hasClick[1] = 1;
				for (var i = 0; i < 5; i++) {
					if (i != 1)
						littleCircus[i].style.background = "grey";
				}
				isFirstClick[1] = 1;
				count++;
				ajax(function(num) {
					sum += parseInt(num);
					littleCircus[1].innerHTML = "<span class='unread'>" + num + "</span>";
					littleCircus[1].style.background = "grey";
					for (var i = 0; i < 5; i++) {
						if (hasClick[i] != 1)
							littleCircus[i].style.background = "blue";
					}
				}, function() {
					littleCircus[1].innerHTML = "<span class='unread'>...</span>"
				});
				if (count == 5)
					bigCircus.style.background = "blue";
			}
			if (typeof callback === 'function') {
				callback();
			}
		}, Math.random * 1000);
	}


	littleCircus2 = function(callback) {
		setTimeout(function() {
			if (!isFirstClick[2]) {
				hasClick[2] = 1;
				for (var i = 0; i < 5; i++) {
					if (i != 2)
						littleCircus[i].style.background = "grey";
				}
				isFirstClick[2] = 1; //isvisited
				count++;
				ajax(function(num) {
					sum += parseInt(num);
					littleCircus[2].innerHTML = "<span class='unread'>" + num + "</span>";
					littleCircus[2].style.background = "grey"; //change the background
					for (var i = 0; i < 5; i++) {
						if (hasClick[i] != 1)
							littleCircus[i].style.background = "blue";
					}
				}, function() {
					littleCircus[2].innerHTML = "<span class='unread'>...</span>"
				});
				if (count == 5)
					bigCircus.style.background = "blue";
			}
			if (typeof callback === 'function') {
				callback();
			}
		}, Math.random * 1000);
	}


	littleCircus3 = function(callback) {
		setTimeout(function() {
			if (!isFirstClick[3]) {
				hasClick[3] = 1;
				for (var i = 0; i < 5; i++) {
					if (i != 3)
						littleCircus[i].style.background = "grey";
				}
				isFirstClick[3] = 1;
				count++;
				ajax(function(num) {
					sum += parseInt(num);
					littleCircus[3].innerHTML = "<span class='unread'>" + num + "</span>";
					littleCircus[3].style.background = "grey";
					for (var i = 0; i < 5; i++) {
						if (hasClick[i] != 1)
							littleCircus[i].style.background = "blue";
					}
				}, function() {
					littleCircus[3].innerHTML = "<span class='unread'>...</span>"
				});
				if (count == 5)
					bigCircus.style.background = "blue";
			}
			if (typeof callback === 'function') {
				callback();
			}
		}, Math.random * 1000);

	}


	littleCircus4 = function(callback) {
		setTimeout(function() {
			if (!isFirstClick[4]) {
				hasClick[4] = 1;
				for (var i = 0; i < 5; i++) {
					if (i != 4)
						littleCircus[i].style.background = "grey";
				}
				isFirstClick[4] = 1; //isvisited
				count++;
				ajax(function(num) {
					sum += parseInt(num);
					littleCircus[4].innerHTML = "<span class='unread'>" + num + "</span>";
					littleCircus[4].style.background = "grey"; //change the background
					for (var i = 0; i < 5; i++) {
						if (hasClick[i] != 1)
							littleCircus[i].style.background = "blue";
					}
				}, function() {
					littleCircus[4].innerHTML = "<span class='unread'>...</span>"
				});
				if (count == 5)
					bigCircus.style.background = "blue";
			}
			if (typeof callback === 'function') {
				callback();
			}
		}, Math.random * 1000);
	}


	bigCircus0 = function() { //caculate the sum of the littleCircus
		if (count == 5) { //if the other five is all clicked, then excute this
		count++;	
			ajax(function(num) {
				sum += "";
				bigCircus.innerHTML = "<span>" + sum + "</span>";
				bigCircus.style.background = "grey";
			}, function() {});
		}
	}

}


function ajax(fnSuccess, beforeGetResult, url) {
	beforeGetResult();

	if (window.XMLHttpRequest) {
		//build the Ajax object
		var iAjax = new XMLHttpRequest();
	} else {
		var iAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//connect to the server
	iAjax.open('GET', url, true);
	//send the request
	iAjax.send();
	//recieve the return result
	iAjax.onreadystatechange = function() {
		if (iAjax.readyState == 4) {
			if (iAjax.status == 200)
				fnSuccess(iAjax.responseText);
		}
	}
}