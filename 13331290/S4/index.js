window.onload = function() {
    var buttons = document.getElementsByTagName("button");
    buttons[0].disabled = 1;

    var at_plus = document.getElementById("bottom-positioner");
    at_plus.onclick = function() {
        getRandomOrder(buttons);
    }

    ResetCalculator();
}

function connectServer(button, callback) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new XMLHttpRequest("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (typeof callback === "function") {
                callback(xmlhttp.responseText);
            }
        }
    }

    xmlhttp.open("GET", "/", true);
    xmlhttp.send();
}

function getRandomOrder(buttons) {
    var order = new Array;
    for (var i = 0; i < 5; i++) {
        order[i] = i + 1;
    }
    order.sort(function() {
        return Math.random() - 0.5;
    })

    for (var i = 0; i < 5; i++) {
        document.getElementById("bubble-order").innerHTML +=
        String.fromCharCode(order[i] - 1 + 65);
    }

    getRandomNumber(buttons, buttons[order[0]], function() {
        getRandomNumber(buttons, buttons[order[1]], function() {
            getRandomNumber(buttons, buttons[order[2]], function() {
                getRandomNumber(buttons, buttons[order[3]], function() {
                    getRandomNumber(buttons, buttons[order[4]], function() {

                    })
                })
            })
        })
    })
}

function getRandomNumber(buttons, button, callback) {
    button.childNodes[1].style.opacity = "1";
    button.childNodes[1].style.fontSize = "8px";
    button.childNodes[1].innerHTML = "...";

    disableButton(buttons, button);

    connectServer(button, function(number) {
        button.childNodes[1].innerHTML = number;
        button.childNodes[1].style.fontSize = "13px";
        button.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        button.disabled = 1;
        enableButton(buttons, button);
        calculateSum(buttons);
        if (typeof callback === "function") {
        callback();
        }
    })
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