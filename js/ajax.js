$(document).ready(function() {
  var articleSrc = '#';
  var imageSrc = '#';
  var firstSectionContainer = $('.banner-sec').find('.container').find('.row');
  var cards = firstSectionContainer.find('.card');
  var topCarousel = $('#carousel-example-generic');
  var carouselItem = $('<div>', {class: "carousel-item"});

  // news container
  var newsBlock = $('<div>', {class: "news-block"});

  // news elements
  var newsMedia = $('<div>', {class: "news-media"});
  var newsTitle = $('<div>', {class: "news-title"});
  var newsDescription = $('<div>', {class: "news-des"});
  var timeText = $('<div>', {class: "time-text"}).append($('<strong>'));


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
        articleSrc = articles[key].url;

        // saving image if media exists
        if (articles[key].media["0"]) {
          imageSrc = articles[key].media["0"]["media-metadata"]["0"].url;
        } else {
          imageSrc = ' ';
        }

        // make new instance of carousel item
        if (key === cards.length + 1) {
          carouselItem = $('<div>', {class: "carousel-item active"});
        } else {
          carouselItem = $('<div>', {class: "carousel-item"});
        }

        newsBlock = $('<div>', {class: "news-block"});
        newsMedia = $('<div>', {class: "news-media"});
        newsMedia.append($('<img>', {class: "img-fluid", src: imageSrc}));
        newsTitle = $('<div>', {class: "news-title"});
        newsTitle.append($('<h2>', {class: "title-large"})).append($('<a>', {href: articleSrc}));
        newsTitle.find('a').text(articles[key].title);
        newsDescription = $('<div>', {class: "news-des"}).text(articles[key].abstract);
        timeText = $('<div>', {class: "time-text"}).append($('<strong>'));
        timeText.children().text(articles[key].published_date);

        newsBlock.append(newsMedia);
        newsBlock.append(newsTitle);
        newsBlock.append(newsDescription);
        newsBlock.append(timeText);
        carouselItem.append(newsBlock);

        topCarousel.find('.carousel-inner').append(carouselItem);
      }

    });
  }

  function politics(articles) {
    
  }
});