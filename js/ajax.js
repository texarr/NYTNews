$(document).ready(function() {
  var firstSectionContainer = $('.banner-sec').find('.container').find('.row');
  var cards = firstSectionContainer.find('.card');
  var card = $('<div>', {class: "card"});
  var url = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/arts/30.json';

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
  }).fail(function(error){
    console.log(error);
  })

  console.log(firstSectionContainer);
  console.log(cards);

  // filling first section
  function highlight(articles) {
    $.each(articles, function(indexArticle, article) {
      // preparing 4 cards for first section
      
    });
  }
});
