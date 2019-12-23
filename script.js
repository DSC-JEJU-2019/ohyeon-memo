var loadButton = document.getElementById('load');
var fileInput = document.getElementById('input-file');
var saveButton = document.getElementById('save');
var memoTextArea = document.getElementById('memo');
var infoSpan = document.getElementById('info');

var waitTime = 2000;
var saveInfoTime = 3000;
var interval;

function autosave() {
    infoSpan.className="fade";
    console.log('hi');
    if(interval) {
        clearTimeout(interval);
    }
    interval = setTimeout(function() {
        localStorage.setItem('data', memoTextArea.value);
        infoSpan.className="";
        console.log("저장 완료!")
    }, waitTime);
}

function load() {
    fileInput.click();
}

function save() {
    var text = memoTextArea.value;
    var fileName = prompt("저장할 파일 이름을 입력하세요!");
    var file = new Blob([text], {type: 'text/plain'});
    var url = URL.createObjectURL(file);
    
    var virtualA = document.createElement('a');
    virtualA.href = url;
    virtualA.download = fileName + ".txt";
    virtualA.click()
}

function input() {
    var file = fileInput.files[0];
    var fileReader = new FileReader();

    // 파일이 읽고나서 이벤트 발생하는거 
    fileReader.onload = function (event) {
        var text = event.target.result;
        memoTextArea.value = text;
    }
    fileReader.readAsText(file, "UTF-8")
}

loadButton.addEventListener('click', load);
saveButton.addEventListener('click', save);
fileInput.addEventListener('input', input);
memoTextArea.addEventListener('input', autosave);


var data = localStorage.getItem('data');
if(!!data) memoTextArea.value = data;