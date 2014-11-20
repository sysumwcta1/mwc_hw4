window.onload = function() {
    var buttons = document.getElementsByTagName("button");
    buttons[0].disabled = 1;
    getRandomNumber(buttons);

    ResetCalculator();
}

function connectServer(callback) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new XMLHttpRequest("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (typeof callback === 'function') {
                callback(xmlhttp.responseText);
            }
        }
    }

    xmlhttp.open("GET", "/", true);
    xmlhttp.send();
}

function getRandomNumber(buttons) {
    for (var i = 1; i < buttons.length; i++) {
        buttons[i].onclick = function(i) {
            return function() {
                buttons[i].childNodes[1].style.opacity = "1";
                buttons[i].childNodes[1].style.fontSize = "8px";
                buttons[i].childNodes[1].innerHTML = "...";

                disableButton(buttons, buttons[i]);

                connectServer(function(number) {
                    buttons[i].childNodes[1].innerHTML = number;
                    buttons[i].childNodes[1].style.fontSize = "13px";
                    buttons[i].style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                    buttons[i].disabled = 1;
                    enableButton(buttons, buttons[i]);
                    calculateSum(buttons);
                })
            }
        }(i)
    }
}

function disableButton(buttons, abled) {
    for (var i = 1; i < buttons.length; i++) {
        if (abled != buttons[i]) {
            buttons[i].style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            buttons[i].disabled = 1;
        }
    }
}

function enableButton(buttons, disabled) {
    for (var i = 1; i < buttons.length; i++) {
        if (disabled != buttons[i] &&
            buttons[i].childNodes[1].style.opacity != "1") {
            buttons[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
            buttons[i].disabled = 0;
        }
    }
}

function calculateSum(buttons) {
    for (var i = 1; i < buttons.length; i++) {
        if (buttons[i].childNodes[1].style.opacity != "1") {
            return;
        }
    }
    buttons[0].disabled = 0;
    buttons[0].onclick = function() {
        var sum = 0;
        for (var i = 1; i < buttons.length; i++) {
            sum += parseInt(buttons[i].childNodes[1].innerHTML);
        }
        buttons[0].style.color = "#079E6E";
        buttons[0].style.fontSize = "32px";
        buttons[0].innerHTML = sum;
        buttons[0].disabled = 1;
    }
}

function ResetCalculator() {
    document.getElementById("bottom-positioner").onmouseout = function(e) {
        if (!e) {
            e = window.event;
        }
        var target = e.relatedTarget ? e.relatedTarget : e.toElement;
        while (target && target != this) {
            target = target.parentNode;
        }
        if (target != this) {
            window.location.href = window.location.href;
        }
    }
}