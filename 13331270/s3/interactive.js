/*****************************************
*Flie name: interactive.js
*First edited by Jiarong Wu on 2014/11/20
*Last edited by Jiarong Wu on 2014/11/20
*Email:973430584@qq.com
*****************************************/

window.onload = function() {
	startParallel();
}

var sum = [];	//Sum of the random digits
var count = 0;  //Times of the click event happen

function AddEvents(ring, random, index) {
	addClick();
	count++;

	//When click the A+ ring, get random digit
	var getRandomDigits = function () {
		if (count <= 5) {
			random.style.visibility = "visible";
			ring.style.backgroundColor = "gray";
			
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status==200) {
					random.innerHTML = xmlhttp.responseText;
					sum.push(xmlhttp.response);
					b();
				}
			}
			xmlhttp.open("GET","/",true);
			xmlhttp.send();
		}
	};

	//sum all the random digits and show it in the infobar
	var infobar = document.getElementById("info-bar");
	var b = function() {
		if (sum.length == 5) {
			var result = document.getElementsByClassName("sum");
			var sumOfDigit = 0;
			for (var i = 0; i < sum.length; i++) {
				sumOfDigit += parseInt(sum[i]);
			}
			result[0].innerHTML = sumOfDigit;
		}
	};

	getRandomDigits();
	
	//Add "mouseleave" event to clear all data
	var bp = document.getElementById("bottom-positioner");
	bp.addEventListener("mouseleave", function() {
		sum = [];
		var smallRing = document.getElementsByClassName("smallRing");
		var RandomDigit = document.getElementsByClassName("RandomDigit");

		for (var i = 0; i < 5; i++) {
			RandomDigit[i].innerHTML = "...";
			RandomDigit[i].style.visibility = "hidden";
			smallRing[i].style.backgroundColor = "rgb(103, 103, 218)";
		}

		var result = document.getElementsByClassName("sum");
		result[0].innerHTML = "";
		count = 0;
	}, false);

}

//Execute the parallel
var smallRing = document.getElementsByClassName("smallRing");
var RandomDigit = document.getElementsByClassName("RandomDigit");

function startParallel() {
	var apb = document.getElementsByClassName("apb");
	apb[0].onclick = function() {
		AddEvents(smallRing[0], RandomDigit[0], 0);
		AddEvents(smallRing[1], RandomDigit[1], 1);
		AddEvents(smallRing[2], RandomDigit[2], 2);
		AddEvents(smallRing[3], RandomDigit[3], 3);
		AddEvents(smallRing[4], RandomDigit[4], 4);
	};
}

//Simulate the click event
function addClick() {
	var apb = document.getElementsByClassName("apb");
	apb[0].click();
}
