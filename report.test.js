const { test, expect } = require('@jest/globals')
const { printReport, reportSort } = require('./report.js')

test('reportSort 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = reportSort(Object.entries(input))
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
});

test('reportSort 6 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path2': 7,
        'https://wagslane.dev/path3': 18,
        'https://wagslane.dev/path4': 12,
        'https://wagslane.dev/path5': 10
    }
    const actual = reportSort(Object.entries(input))
    const expected = [
        ['https://wagslane.dev/path3', 18],
        ['https://wagslane.dev/path4', 12],
        ['https://wagslane.dev/path5', 10],
        ['https://wagslane.dev/path2', 7],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
});