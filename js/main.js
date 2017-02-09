const newsAPIKey = "3621f07715db4ebd953601ca8d943af2"
const baseEndpoint =  "https://newsapi.org/v1/articles"

var currentSource = "google-news"

$(function() {

  const sendRequest = function(source) {
    const endpoint = `${baseEndpoint}?source=${source}&apiKey=${newsAPIKey}`

    return fetch(endpoint)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        return
      }
      return response.json()
    })
    .then(function(data) {
      $("#root").empty()
      const $articles = data.articles.map(createArticle)
      $("#root").append(null, $articles)
    })
  }

  sendRequest(currentSource)

  $(".js-source-selection").change(function(e) {
    sendRequest(e.target.value)
  })

  const createArticle = function(article) {
    const articleWrapper = $('<div class="article clearfix">')
    const articleMedia = $('<div class="article-media">')
    const articleImg =
      $(`<img width='100'
              height='100'
              onerror="if (this.src != 'images/default-image.png') this.src = 'images/default-image.png';"
              src='${article.urlToImage}'
              title='${article.title}'
              alt='${article.title}'
        />`)
    articleMedia.append(articleImg)

    const articleContent = $('<div class="article-content">')
    const articleTitle = `<h2><a href='${article.url}'>${article.title}</a></h2>`
    const articleText = `<p class="article-text">${article.description}</p>`
    articleContent.append(articleTitle, [articleText])

    articleWrapper.append(articleMedia, [articleContent])
    return articleWrapper
  }
})
