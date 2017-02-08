const newsAPIKey = "3621f07715db4ebd953601ca8d943af2"
const endpoint =  "https://newsapi.org/v1/articles?source=techcrunch&apiKey=" + newsAPIKey





$(function() {

  const sendRequest = function() {
    fetch(endpoint)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        return
      }
      // Examine the text in the response
      response.json()
      .then(function(data) {
        const $articles = data.articles.map(createArticle)
        $("#root").append(null, $articles)
      })
    })
  }

  sendRequest()

  $(".refresh-click").click(function() {
    $(".refresh-click").addClass("fa-spin")
    sendRequest()
      .then(function() {
        $(".refresh-click").removeClass("fa-spin")
      })
      .catch(function(err) {
        alert("Could not update at this time. Please try again.")
      })
  })

  const createArticle = function(article) {
    const articleWrapper = $('<div class="article clearfix">')
    const articleMedia = $('<div class="article-media">')
    const articleImg = $(`<img width='100' height='100' src='${article.urlToImage} title='${article.title}' alt='${article.title}'/>`)
    articleMedia.append(articleImg)

    const articleContent = $('<div class="article-content">')
    const articleTitle = `<h2><a href='${article.url}'>${article.title}</a></h2>`
    const articleText = `<p class="article-text">${article.description}</p>`

    articleContent.append(articleTitle, [articleText])

    articleWrapper.append(articleMedia, [articleContent])
    return articleWrapper
  }
})
