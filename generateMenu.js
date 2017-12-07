function generateMenu(divID){

    document.getElementById(divID).insertAdjacentHTML('afterbegin',  
    '<ul id="nav"> ' + 
    '<li> <a href="index.html" title="Вернуться на главную страницу">Главная</a></li>' +
    '<li> <a href="bs_index.html" title="Bootstrap site">BS site</a></li>' +
    '<li> <a href="#" title="О погоде">Погода</a> ' +
        '<ul><li><a href="#">Евпатория</a></li>'+
            '<li><a href="#">Симферополь</a></li></ul>'+
    '<li><a href="#" title="Астро">Астрономия</a>' +	        
		'<ul><li><a href="julian.html">JDays</a></li>'+ 
            '<li><a href="star_time.html">Star time</a></li>'+
            '<li><a href="source.html">Source</a></li>'+
            '<li><a href="filereader.html">File Reader</a></li></ul></li>'+
    '<li><a href="#" title="Ссылки">Ссылки</a></li>'+
    '<li><a href="#" title="Контакты">Контакты</a></li>'+
    '</ul>'	);
}