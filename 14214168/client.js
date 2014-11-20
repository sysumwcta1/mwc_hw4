var  url = "http://localhost:3000";
window.onload = function(){
    eventDeal();
    infoBarDeal();
}

//按钮事件处理
function eventDeal(){
    var buttons = document.getElementsByTagName("li");
    for(var i = 0 ; i < buttons.length ; i++)
    {
        //闭包添加事件处理
        (function(num){
            buttons[num].onclick = function(event){
                var target = event.target;
                getRandNum(function(responText){
                    var rspan = document.createElement("span");
                    rspan.innerHTML = responText;
                    rspan.className = "unread";
                    target.appendChild(rspan);
                });
            }
        })(i);
    }
}

//向数据库请求随机数
function getRandNum(callback)
{
    var numRequest = new XMLHttpRequest();
    numRequest.open("GET",url,true);
    numRequest.onreadystatechange = function()
    {
        if(numRequest.readyState === 4 && numRequest.status === 200)
        {
            callback(numRequest.responseText);
        }
    }
    numRequest.send(null);
}

//大气泡求加
function infoBarDeal(){
    var infoBar = document.getElementById('info-bar');
    infoBar.onclick = function(){infoBar.innerText = sum();}
}

function sum(){
    var spans = document.getElementsByTagName("span");
    var total = 0;
    for(var i = 0 ; i < spans.length ; i++){
        total += Number(spans[i].innerText);
    }
    return total;
}
