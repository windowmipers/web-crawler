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

async function crawlPage(baseURL, currentURL, pages) {
    const currentObj = new URL(currentURL)
    const baseObj = new URL(baseURL)
    if (currentObj.hostname !== baseObj.hostname){
        return pages
    }
    const normCurrent = normalizeURL(currentURL)
    if (pages[normCurrent] > 0){
        pages[normCurrent]++
        return pages
    }
    pages[normCurrent] = 1
        
    console.log(`actively crawling: ${currentURL}`) 
    try {
        const response = await fetch(currentURL)
        if (response.status >= 400){
            console.log(`error in fetch with status code: ${response.status} on page: ${currentURL}`)
            return pages
        }
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')){
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return pages
        }
        const htmlBody = await response.text()
        const urls = getURLsFromHTML(htmlBody, baseURL)
        for (const url of urls){
            pages = await crawlPage(baseURL, url, pages)
        }
        
    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page ${currentURL}`)
    }
    return pages
}
    
    
    





module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }