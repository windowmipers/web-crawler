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
    for(let tag of tags){
        const tagObj = new URL(tag)
        if (tagObj.protocol) {
            
        }
    }
    dom.window.document.querySelector('a').textContent

}




module.exports = {
    normalizeURL
  }