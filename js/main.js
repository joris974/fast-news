const newsAPIKey = "3621f07715db4ebd953601ca8d943af2"
// https://newsapi.org/v1/sources?language=en&country=us

const endpoint =  "https://newsapi.org/v1/articles?source=techcrunch&apiKey=" + newsAPIKey

$(function() {

  $(".refresh-click").click(function() {
    $(".refresh-click").addClass("fa-spin")

    $.get(endpoint, function(data) {
      const $articles = data.articles.map(createArticle)
      $("#root").append(null, $articles)
    })
    .fail(function() {
      alert("Could not update at this time. Please try again.");
    })
    .always(function() {
      $(".refresh-click").removeClass("fa-spin")
    });
  })

  const createArticle = function(article) {
    const articleWrapper = $('<div class="article clearfix">')
    const articleMedia = $('<div class="article-media">')
    const articleImg = $(`<img width='100' height='100' src='${article.urlToImage} title='${article.title}' alt='${article.title}'/>`)
    articleMedia.append(articleImg)

    const articleContent = $('<div class="article-content">')
    const articleTitle = `<h2><a href='${article.url}'>${article.title}</a></h2>`
    articleContent.append(articleTitle)

    articleWrapper.append(articleMedia, [articleContent])
    return articleWrapper
  }
})
