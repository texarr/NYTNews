$(document).ready(function() {
  var firstSectionContainer = $('.banner-sec').find('.container').find('.row');
  var cards = firstSectionContainer.find('.card');
  var topCarousel = $('#carousel-example-generic');
  var carouselItem = $('<div>', {class: "carousel-item"});
  var articleSrc = '#';

  // news container
  var newsBlock = $('<div>', {class: "news-block"});

  // news elements
  var newsMedia = $('<div>', {class: "news-media"});
  newsMedia.append($('<img>', {class: "img-fluid", src: articleSrc}));

  // var newsTitle = $('<div>', {class: "news-title"})


  var card = $('<div>', {class: "card"});
  var url = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json';

  url += '?' + $.param({
    'api-key': "24ba32e1f1f24277873ec82b93f8d3b2"
  });

  // reading NYTimes API
  $.ajax({
    url: url,
    method: 'GET'
  }).done(function(response){
    // insert results to DOM
    highlight(response.results);
    // console.log(response.results);
  }).fail(function(error){
    console.log(error);
  })

  // filling first section
  function highlight(articles) {
    $.each(articles, function(key, value) {
      // preparing cards for first section
      if (key < cards.length) {

        // loading image if media exists
        if (articles[key].media["0"]) {
          $(cards[key]).find('img')["0"].src = articles[key].media["0"]["media-metadata"]["0"].url;
        } else {
          $(cards[key]).find('img')["0"].src =  " ";
        }

        // loading news description
        $(cards[key]).find('.title-small').find('a').text(articles[key].title.substring(0, 45) + '...');
        $(cards[key]).find('.title-small').find('a').attr('href', articles[key].url);
        $(cards[key]).find('.text-time').find('em').text(articles[key].published_date);
      }

      // carousel fill
      if (key >= cards.length) {
        // console.log(topCarousel.find('.carousel-inner'));
      }

    });
  }
});
