window.onload = function() {
    var buttons = document.getElementsByTagName("button");
    buttons[0].disabled = 1;

    var at_plus = document.getElementById("bottom-positioner");
    at_plus.onclick = function() {
        getRandomNumber(buttons);
    }

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
            if (typeof callback === "function") {
                number = new Array(5);
                for (var i = 0; i < 5; i++) {
                    number[i] = xmlhttp.responseText.split(",")[i];
                }
                console.log(xmlhttp.responseText);
                callback(number);
            }
        }
    }

    xmlhttp.open("GET", "/", true);
    xmlhttp.send();
}

function getRandomNumber(buttons) {
    for (var i = 1; i < buttons.length; i++) {
        buttons[i].childNodes[1].style.opacity = "1";
        buttons[i].childNodes[1].style.fontSize = "8px";
        buttons[i].childNodes[1].innerHTML = "...";
    }

    connectServer(function(number) {
        for (var i = 1; i < buttons.length; i++) {
            buttons[i].childNodes[1].innerHTML = number[i - 1];
            buttons[i].childNodes[1].style.fontSize = "13px";
            buttons[i].style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            buttons[i].disabled = 1;
        }
        calculateSum(buttons);
    })
}

function calculateSum(buttons) {
    for (var i = 1; i < buttons.length; i++) {
        if (buttons[i].childNodes[1].style.opacity != "1") {
            return;
        }
    }

    buttons[0].disabled = 0;
    var sum = 0;
    for (var i = 1; i < buttons.length; i++) {
        sum += parseInt(buttons[i].childNodes[1].innerHTML);
    }
    buttons[0].innerHTML = sum;
    buttons[0].disabled = 1;
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