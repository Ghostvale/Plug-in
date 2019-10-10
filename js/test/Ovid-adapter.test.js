let { Ovid_websites, Ovid_article_download, insert_CSS } = require('../Ovid-adapter');

test('websites contains Ovid article pages', () => {
    expect(Ovid_websites[0].name).toBe("Ovid");
    expect(Ovid_websites[0].website.test("https://ovidsp-dc2-ovid-com.ezproxy1.library.usyd.edu.au")).toBeTruthy;
});
test('Ovid can match article pages (1)', () => {
    expect(Ovid_websites[0].website.test("https://ovidsp-dc2-ovid-com.ezproxy1.library.usyd.edu.au/asdfadsf")).toBeTruthy;
});
test('Ovid can match article pages (2)', () => {
    expect(Ovid_websites[0].website.test("https://ovidsp-dc2-ovid-com.ezproxy1.library.usyd.edu.au/asdoinfsad.png")).toBeTruthy;
});
test('Ovid can match article pages (3)', () => {
    expect(Ovid_websites[0].website.test("https://ovidsp-dc2-ovid-com.ezproxy1.library.usyd.edu.au/oimvne/asdf/sadfadh.html")).toBeTruthy;
});

test('Download the article', () => {
    document.body.innerHTML =
        '<div>' +
        '  <span id="username" />' +
        '  <button id="book-read-content" />' +
        '</div>';
    document.getElementById("book-read-content").click();
    expect(Ovid_article_download).toBeDefined();
});

test('Test insert CSS function', () => {
    document.body.innerHTML =
        '<div>' +
        '  <span class = "a"/>' +
        '  <button id="book-read-content" />' +
        '</div>';
    expect(document.getElementsByClassName("modify").length).toBe(0);
    document.documentElement.classList.add("modify")
    expect(document.getElementsByClassName("modify").length).toBe(1);
});