let { ProQ_websites, ProQ_Quick_download, ProQ_ebook_download } = require('../ProQ-adapter');


test('websites contains ProQuest ebook pages and article pages', () => {
    expect(ProQ_websites[0].name).toBe("ProQuest");
    expect(ProQ_websites[0].website.test("https?://asdfsdf-proquest-com.ezproxy1.library.usyd.edu.au/sadfasdf")).toBeTruthy;
});

test('It can match ProQuest ebook pages and article pages (1)', () => {
    expect(ProQ_websites[0].website.test("https?://a-proquest-com.ezproxy1.library.usyd.edu.au/sdfadsxzcv")).toBeTruthy;
});

test('It can match ProQuest ebook pages and article pages (2)', () => {
    expect(ProQ_websites[0].website.test("https?://a-proquest-com.ezproxy1.library.usyd.edu.au/esad")).toBeTruthy;
});
test('It can match ProQuest ebook pages and article pages (3)', () => {
    expect(ProQ_websites[0].website.test("https?://c-proquest-com.ezproxy1.library.usyd.edu.au/zxcv")).toBeTruthy;
});
test('It can match ProQuest ebook pages and article pages(4)', () => {
    expect(ProQ_websites[0].website.test("https?://d-proquest-com.ezproxy1.library.usyd.edu.au/oinl")).toBeTruthy;
});

test('Download the article', () => {
    document.body.innerHTML =
        '<div>' +
        '  <span id="username" />' +
        '  <button id="downloadPDFLink" />' +
        '</div>';
    document.getElementById("downloadPDFLink").click();
    expect(ProQ_Quick_download).toBeDefined();
});

test('Download the ebook', () => {
    document.body.innerHTML =
        '<div>' +
        '  <span id="username" />' +
        '  <button id="downloadPDFLink" />' +
        '</div>';
    document.getElementById("downloadPDFLink").click();
    expect(ProQ_ebook_download).toBeDefined();
});