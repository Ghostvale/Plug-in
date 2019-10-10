let { JSTOR_websites, JSTOR_Ebook_download } = require('../JSTOR-adapter');

test('websites contains JSTOR pages', () => {
    expect(JSTOR_websites[0].name).toBe("JSTOR");
    expect(JSTOR_websites[0].website.test("https://www-jstor-org.ezproxy1.library.usyd.edu.au")).toBeTruthy;
});
test('JSTOR websites can match target pages (1)', () => {
    expect(JSTOR_websites[0].website.test("https://www-jstor-org.ezproxy1.library.usyd.edu.au/asdfasdfads/asdf/ads/f/asdf")).toBeTruthy;
});
test('JSTOR websites can match target pages (2)', () => {
    expect(JSTOR_websites[0].website.test("https://www-jstor-org.ezproxy1.library.usyd.edu.au/a/a/a/a/a")).toBeTruthy;
});
test('JSTOR websites can match target pages (3)', () => {
    expect(JSTOR_websites[0].website.test("https://www-jstor-org.ezproxy1.library.usyd.edu.au/1234hgasdflqewb/asdfh.html/.index.html/")).toBeTruthy;
});

test('Download the article', () => {
    document.body.innerHTML =
        '<div>' +
        '  <span id="username" />' +
        '  <button id="pdfLink tt-track-nolink" />' +
        '</div>';
    document.getElementById("pdfLink tt-track-nolink").click();
    expect(JSTOR_Ebook_download).toBeDefined();
});