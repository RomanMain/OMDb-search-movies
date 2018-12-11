(function () {

    $('button').on('click', function (e) {
        e.preventDefault();
        Search();
    });
    
})();

// Проверка высоты блока CONTENT
function checkHeigth() {
    var height = $('.content').height();
    if(height > 0){
        $('.content').css("padding", "40px 0")
    }
}


function Search(url) {
    $('.content').html('');

    var url = 'http://www.omdbapi.com/?' + $('form').serialize();
    
    // Проверка на пустое значение
    var search = $('#search').val();
    if (search === '') {
        let h1 = document.createElement('h1');
        $(h1).html('No results found');
        $('.content').append($(h1));
    }

    $.get(url, function (data) {
        // var total = Math.ceil(parseInt(data.totalResults));
        // $('.pages').html('');
        
        // for (i = 1; i < total / 10; i++) {
        //     var counter = document.createElement('a');
        //     $(counter).addClass('page').attr('data-page', i).html(i);
        //     $('.pages').append($(counter))
        // }
        for (i = 0; i <= data.Search.length; i++) {
            checkHeigth();
            
            // Создание элементов
            let row = document.createElement('div');
            let img = document.createElement('img');
            let overlay = document.createElement('div');
            let title = document.createElement('h4');
            let year = document.createElement('p');

            // Операции над элементами
            $(row).addClass('content-body');
            $(overlay).addClass('overlay');
            if(data.Search[i].Poster !== 'N/A'){
                $(img).attr('src', data.Search[i].Poster);
            } else {
                $(img).attr('src', './img/photo-available.png').addClass('available');
            }
            $(title).html(data.Search[i].Title);
            $(year).html(data.Search[i].Year);

            // Добавление элементов в DOM
            $('.content').append($(row));
            $(row).append($(img));
            $(row).append($(overlay));
            $(overlay).append($(title));
            $(overlay).append($(year));
        }

    }).fail(function () {
        console.log('Возникла ошибка');
    });
    
}



