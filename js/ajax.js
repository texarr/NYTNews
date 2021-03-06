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

  // sports section variables
  var sportsContainer = $('.sports');
  var sportsCards = sportsContainer.find('.card');

  // international section variables
  var internationalContainer = $('.international');
  var internationalCards = internationalContainer.find('.card');

  // loading content from API
  // section and response parameters is required
  loadAjax('all-sections', highlight, 1);
  loadAjax('sports', sports, 1);
  loadAjax('World', world, 1);

  // filter module
  var submitBtn = $('.dayfilter').find('.btn-success');
  var period = $('.period');
  var periodVal = 1;

  period.on('change', function() {
      periodVal = this.value;
  });

  submitBtn.on('click', function() {
      loadAjax('all-sections', highlight, periodVal);
      loadAjax('sports', sports, periodVal);
      loadAjax('World', world, periodVal);
  });
  // endof filter module

  // filling first section
  function highlight(articles) {
    var filledCards = 0;
    topCarousel.find('.carousel-inner').text('');
    $.each(articles, function(key, value) {
      // preparing cards for first section
      if (filledCards < cards.length) {
            // loading image if media exists
            if (articles[key].media["0"]) {
              $(cards[key]).find('img')["0"].src = articles[key].media["0"]["media-metadata"][value.media["0"]["media-metadata"].length-1].url;
            } else {
              $(cards[key]).find('img')["0"].src =  " ";
            }

            // loading news description
            $(cards[key]).find('.title-small').find('a').text(articles[key].title.substring(0, 45) + '...');
            $(cards[key]).find('.title-small').find('a').attr('href', articles[key].url);
            $(cards[key]).find('.text-time').find('em').text(articles[key].published_date);
            filledCards++;
      }

      // carousel fill
      if (filledCards >= cards.length) {
              articleSrc = articles[key].url;

              // saving image if media exists
              if (articles[key].media["0"]) {
                imageSrc = articles[key].media["0"]["media-metadata"][value.media["0"]["media-metadata"].length-1].url;
              } else {
                imageSrc = '../img/no-image-icon-23.jpg';
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
              filledCards++;
      }
    });
  }

  // filling sports section
  function sports(articles) {
    $.each(articles, function(key, value) {
        // preparing cards for first section
        if (key < sportsCards.length) {
            // loading image if media exists
            if (value.media["0"]) {
                $(sportsCards[key]).find('.img-fluid')["0"].src = value.media["0"]["media-metadata"][value.media["0"]["media-metadata"].length-1].url;
            }
            // loading title
            // link
            $(sportsCards[key]).find('.news-title').find('a').attr('href', value.url);
            // title
            $(sportsCards[key]).find('.news-title').find('.title-small').text(value.title);

            // loading description
            $(sportsCards[key]).find('.card-text').eq(0).text(value.abstract);
            // time
            $(sportsCards[key]).find('.card-text').find('em').text(value.published_date);
        }
    })
  }

  // filling world section
  function world(articles) {
        $.each(articles, function(key, value) {
            if (key < internationalCards.length) {
                // loading image if media exists
                if (value.media["0"]) {
                    $(internationalCards[key]).find('.img-fluid')["0"].src = value.media["0"]["media-metadata"][value.media["0"]["media-metadata"].length-1].url;
                }

                // loading title
                // link
                $(internationalCards[key]).find('.news-title').find('a').attr('href', value.url);
                // title
                $(internationalCards[key]).find('.news-title').find('.title-small').text(value.title);

                // loading description
                $(internationalCards[key]).find('.card-text').eq(0).text(value.abstract);
                // time
                $(internationalCards[key]).find('.card-text').find('em').text(value.published_date);
            }
        });
    }
});


function loadAjax(section, responseTo, timeperiod) {
    var baseurl = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/';
    var url = baseurl + section + '/' + timeperiod + '.json';
    url += '?' + $.param({
      'api-key': "24ba32e1f1f24277873ec82b93f8d3b2"
    });

    // reading NYTimes API
    $.ajax({
      url: url,
      method: 'GET'
    }).done(function(response){
      // insert results to DOM
      responseTo(response.results);
      // console.log(response.results);
    }).fail(function(error){
      console.log(error);
    })
}
