
// request

function httpRequest(callback) {

    var word = localStorage.newWord || 'empty';
    var url = 'http://api.tianapi.com/txapi/enwords/index?key=ba0c9541df1391ab37670f0f86417be1&word=' + word;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    document.getElementById('result').innerHTML = 'Loading...';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

// render

function showResult(result) { // result is a string
    err = '{"code":250,"msg":"数据返回为空"}';
    if(result != err){
        var itemArr = result.split('[{')[1].split('"'),
	        eng = itemArr[3];
	        ch = itemArr[7];
	    var txt = eng + ' : ' + ch + '<br>';
	    localStorage.setItem(eng, ch);
    } else {
        var txt = '词库中没有该词汇' + '<br>';
    }
	document.getElementById('result').innerHTML = txt;
}

// search

document.getElementById('sBtn').onclick = function() {
    var word = document.getElementById('word').value;
    localStorage.newWord = word;
    httpRequest(showResult);
    document.getElementById('word').value = '';
    // test
    // document.getElementById('test').innerHTML = localStorage.length;
}

document.addEventListener("keydown", function (event) {
    if(event.keyCode == 13) {
        var word = document.getElementById('word').value;
        localStorage.newWord = word;
        httpRequest(showResult);
        document.getElementById('word').value = '';
    }
});

// show history

var table = '<table>';

for(i=0;i<localStorage.length;i++) {
    var key = localStorage.key(i);
    if(key != 'newWord') {
        table += '<tr id="' + key + '">';
        table += '<td>' + key + '</td>';
        table += '<td>' + localStorage[key] + '</td>';
        table += '</tr>';
    }
}

table += '</table>';

document.getElementById('history').innerHTML = table;

// clear

document.getElementById('clear').onclick = function() {
    localStorage.clear();
    alert("记录已清除");
    location.reload();
}