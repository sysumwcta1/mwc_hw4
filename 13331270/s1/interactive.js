/*****************************************
*Flie name: interactive.js
*First edited by Jiarong Wu on 2014/11/20
*Last edited by Jiarong Wu on 2014/11/20
*Email:973430584@qq.com
*****************************************/

window.onload = function() {
	AddEvents();
}

var sum = [];    //Sum of the random digits
var active = true;  //Enable the current ring of A~E
var ToGetDigit = [true, true, true, true, true]; //Record the ring that whether have got random digit

function AddEvents() {
	var FiveLetters = document.getElementsByClassName("smallRing");
	var RandomDigit = document.getElementsByClassName("RandomDigit");

	//Add the "click" events for all rings using closure
	for (var i = 0; i < FiveLetters.length; i++) {
		FiveLetters[i].onclick = function() {
			var index = i;
			return function() {
				if (active && ToGetDigit[index]) {
					
					active = false;
					RandomDigit[index].style.visibility = "visible";
					FiveLetters[index].style.backgroundColor = "rgb(103, 103, 218)";
					for (var k = 0; k < 5; k++) {
						if (k != index && ToGetDigit[k]) {
							FiveLetters[k].style.backgroundColor = "gray";
						}
					}

					//make GET request, get the random digit and show it
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() {
						if (xmlhttp.readyState == 4 && xmlhttp.status==200) {
							RandomDigit[index].innerHTML = xmlhttp.responseText;
							sum.push(xmlhttp.response);
							FiveLetters[index].style.backgroundColor = "gray";
							for (var j = 0; j < 5; j++) {
								if (j != index && ToGetDigit[j]) {
									FiveLetters[j].style.backgroundColor = "rgb(103, 103, 218)";
								}
							}
							active = true;
							ToGetDigit[index] = false;
						}
					}
					xmlhttp.open("GET","/",true);
					xmlhttp.send();


				}
			};
		} ();
	}

	//Add "click" event for the infobar; When clicked and all rings have random digits,
	//sum all the random digits and show it in the infobar
	var infobar = document.getElementById("info-bar");
	infobar.addEventListener("click", function() {
		if (sum.length == 5) {
			var result = document.getElementsByClassName("sum");
			var sumOfDigit = 0;
			for (var i = 0; i < sum.length; i++) {
				sumOfDigit += parseInt(sum[i]);
			}
			result[0].innerHTML = sumOfDigit;
		}
	}, false);

	//Add "mouseleave" event to clear all data
	var bp = document.getElementById("bottom-positioner");
	bp.addEventListener("mouseleave", function() {
		sum = [];
		active = true;
		for (var i = 0; i < 5; i++) ToGetDigit[i] = true;

		var FiveLetters = document.getElementsByClassName("smallRing");
		var RandomDigit = document.getElementsByClassName("RandomDigit");

		for (var i = 0; i < 5; i++) {
			RandomDigit[i].innerHTML = "...";
			RandomDigit[i].style.visibility = "hidden";

			FiveLetters[i].style.backgroundColor = "rgb(103, 103, 218)";
		}

		var result = document.getElementsByClassName("sum");
		result[0].innerHTML = "";
	}, false)
}
