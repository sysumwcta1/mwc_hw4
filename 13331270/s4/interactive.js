/*****************************************
*Flie name: interactive.js
*First edited by Jiarong Wu on 2014/11/20
*Last edited by Jiarong Wu on 2014/11/20
*Email:973430584@qq.com
*****************************************/

window.onload = function() {
	startRandomRobot();
}

var sum = [];	//Sum of the random digits
var active = true;    //Enable the current ring of A~E
var ToGetDigit = [true, true, true, true, true];  //Record the ring that whether have got random digit

function AddEvents(ring, random, index) {

	//When click the A+ ring, get random digit
	var getRandomDigits = function () {
		if (active && ToGetDigit[index]) {
			active = false;
			random.style.visibility = "visible";
			ring.style.backgroundColor = "gray";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status==200) {
					random.innerHTML = xmlhttp.responseText;
					sum.push(xmlhttp.response);
					active = true;
					ToGetDigit[index] = false;
					addClick();
				}
			}
			xmlhttp.open("GET","/",true);
			xmlhttp.send();
		}
	};

	//sum all the random digits and show it in the infobar
	var infobar = document.getElementById("info-bar");
	var sumAlldigits = function() {
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
	sumAlldigits();

	//Add "mouseleave" event to clear all data
	var bp = document.getElementById("bottom-positioner");
	bp.addEventListener("mouseleave", function() {
		sum = [];
		active = true;
		for (var i = 0; i < 5; i++) ToGetDigit[i] = true;

		var smallRing = document.getElementsByClassName("smallRing");
		var RandomDigit = document.getElementsByClassName("RandomDigit");

		for (var i = 0; i < 5; i++) {
			RandomDigit[i].innerHTML = "...";
			RandomDigit[i].style.visibility = "hidden";

			smallRing[i].style.backgroundColor = "rgb(103, 103, 218)";
		}

		var result = document.getElementsByClassName("sum");
		result[0].innerHTML = "";
		randoms = randArr(randoms);
	}, false);

}

//Creat the array that contain the random digits in different index
function randArr(arr) {
    var ret = [],
    i = arr.length,
    n;
    arr = arr.slice(0);
    
    while (--i >= 0) {
        n = Math.floor( Math.random() * i);
        ret[ret.length] = arr[n];
        arr[n] = arr[i];
    }
    return ret;
}

//Execute the random robot
var randoms = [1, 2, 3, 4, 5];
var smallRing = document.getElementsByClassName("smallRing");
var RandomDigit = document.getElementsByClassName("RandomDigit");

function startRandomRobot() {
	var apb = document.getElementsByClassName("apb");
	randoms = randArr(randoms);

	//Get random digit according to the order of the random array
	apb[0].onclick = function() {
		for (var i = 0; i < 5; i++) {
			switch (randoms[i]) {
				case 1: AddEvents(smallRing[0], RandomDigit[0], 0); break;
				case 2: AddEvents(smallRing[1], RandomDigit[1], 1); break;
				case 3: AddEvents(smallRing[2], RandomDigit[2], 2); break;
				case 4: AddEvents(smallRing[3], RandomDigit[3], 3); break;
				case 5: AddEvents(smallRing[4], RandomDigit[4], 4); break;
			}
		}
	};
}

//Simulate the click event
function addClick() {
	var apb = document.getElementsByClassName("apb");
	apb[0].click();
}
