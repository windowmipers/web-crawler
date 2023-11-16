function printReport(pages) {
    console.log('Report is starting...')
    const pagesList = Object.entries(pages)
    const sortedPages = reportSort(pagesList)
    for (const page of sortedPages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
}

function reportSort(pagesList) {
    function pagesMergeSort(pList) {
        if (pList.length < 2){
            return pList
        }
        const first = pagesMergeSort(pList.slice(0, (Math.floor(pList.length / 2))))
        const second = pagesMergeSort(pList.slice((Math.floor(pList.length / 2))))
        return pagesMerge(first, second)
    }
    function pagesMerge(first, second) {
        const final = []
        let i = 0
        let j = 0
        while (i < first.length && j < second.length) {
            if (first[i][1] >= second[j][1]) {
                final.push(first[i])
                i++
            } else {
                final.push(second[j])
                j++
            }
        }
        while (i < first.length) {
            final.push(first[i])
            i++
        }
        while (j < second.length) {
            final.push(second[j])
            j++
        }
        return final
    }
    return pagesMergeSort(pagesList)

}


module.exports = {
    printReport
  }