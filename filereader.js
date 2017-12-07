function readFile(object) {
    var file = object.files[0]
    var reader = new FileReader()
    reader.onload = function() {
      document.getElementById('out').innerHTML = '<pre>' + reader.result + '</pre>';
    }
    reader.readAsText(file)
}

function checkFileAPISupport(){
    var fileAPISupport = "Браузер не поддерживает FileAPI";
    if(window.File && window.FileReader && window.FileList && window.Blob) {
        fileAPISupport = "Браузер поддерживает FileAPI";
    }
}