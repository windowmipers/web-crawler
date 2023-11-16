function printReport(pages) {
    console.log('Report is starting...')
    const pagesList = Object.entries(pages)
    const sortedPages = reportSort(pagesList)
    for (const page of sortedPages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
}

function reportSort(pagesList) {
    pagesList.sort((a, b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1]
    })
    return pagesList
}


module.exports = {
    printReport,
    reportSort
  }