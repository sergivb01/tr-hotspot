const xml2js = require('xml2js-es6-promise')
const striptags = require('striptags')

const POST_LIMIT = process.env.WP_POST_LIMIT

const formatFeed = async (data) => {
  const json = await xml2js(data)
  const posts = json.rss.channel[0].item
    .slice(0, POST_LIMIT)
    .map(post => {
      return {
        title: post.title[0],
        link: post.link[0],
        date: post.pubDate[0],
        descriptionStripped: striptags(post.description[0])
          .replace('\n', '')
          .replace('&#8230;  Llegeix més»', ''),
        description: post.description[0]
        // content: post['content:encoded'][0]
      }
    })

  return posts
}

module.exports = {
  formatFeed
}
