(function () {

    $('#button').on('click', function (e) {
        e.preventDefault();
        Search();
    });

    $('#prev').hide();
    $('#next').hide();

    let numberPage = parseInt($('#page').val());

    $('#prev').on('click', function(){
        $('#page').val(numberPage -= 1);
        Search();
    });
    
    $('#next').on('click', function(){
        $('#page').val(numberPage += 1);
        Search();
    });
    
})();

function Search(url) {
    $('.content').html('');

    var url = 'http://www.omdbapi.com/?' + $('form').serialize();
    
    let search = $('#search').val();

    if (search === '') {
        let h1 = document.createElement('h1');
        $(h1).html('No results found');
        $('.content').show();
        $('.content').append($(h1));
        $('.pages').hide();
    }
    
    $.get(url, function (data) {
        let page = parseInt($('#page').val());
        let total = Math.ceil(parseInt(data.totalResults) / 10);

        if (page === 1) {
            $('#prev').prop('disabled', true);
            $('#prev').css('opacity', '0.5');
        } else if (page > total - 1) {
            $('#next').prop('disabled', true);
            $('#next').css('opacity', '0.5');
        } else {
            $('#prev').prop('disabled', false);
            $('#prev').css('opacity', '1');
            $('#next').prop('disabled', false);
            $('#next').css('opacity', '1');
        }

        if(data.totalResults > 0){
            $('.content').css('display', 'flex');
            $('.content').show();
            $('.pages').show();
            $('#prev').show();
            $('#next').show();
            for (i = 0; i < data.Search.length; i++) {
                let row = document.createElement('div');
                let img = document.createElement('img');
                let overlay = document.createElement('div');
                let title = document.createElement('h4');
                let year = document.createElement('p');
    
                $(row).addClass('content-body');
                $(overlay).addClass('overlay');
                if(data.Search[i].Poster !== 'N/A'){
                    $(img).attr('src', data.Search[i].Poster);
                } else {
                    $(img).attr('src', './img/photo-available.png').addClass('available');
                }
                $(title).html(data.Search[i].Title);
                $(year).html(data.Search[i].Year);
                $('.content').append($(row));
                $(row).append($(img));
                $(row).append($(overlay));
                $(overlay).append($(title));
                $(overlay).append($(year));
            }
           
        }
    }).fail(function () {
        console.log('Возникла ошибка');
    });
}



