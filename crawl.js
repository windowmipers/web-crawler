const url = require('node:url');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function normalizeURL(urlString) {
    const urlObject = new URL(urlString)
    let normalized = `${urlObject.host}${urlObject.pathname}`
    if (normalized.length > 0 && normalized.slice(-1) === '/'){
        normalized = normalized.slice(0, -1)
    }
    return normalized
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const tags = dom.window.document.querySelectorAll('a')
    for (const tag of tags) {
        if (tag.href.slice(0, 1) === '/'){
            try {
                const urlObj = new URL(`${baseURL}${tag.href}`)
                urls.push(`${baseURL}${tag.href}`)
            } catch (err){
                console.log(`error with relative url: ${err.message}`)
            }            
        } else {
            try {
                const urlObj = new URL(tag.href)
                urls.push(tag.href)
            } catch (err){
                console.log(`error with absolute url: ${err.message}`)
            }
        }

    }
    return urls

}




module.exports = {
    normalizeURL,
    getURLsFromHTML
  }