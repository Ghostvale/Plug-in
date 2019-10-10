let { Springer_websites, Springer_article_download } = require('../Springer-adapter');


test('websites contains Springer and matches it', () => {
    expect(Springer_websites[0].name).toBe("Springer");
    expect(Springer_websites[0].website.test("https:link-springer-com.ezproxy1.library.usyd.edu.au")).toBeTruthy;
});
test('websites matches Springer Link (1)', () => {
    expect(Springer_websites[0].website.test("https:link-springer-com.ezproxy1.library.usyd.edu.au/asdfaewfaswef")).toBeTruthy;

});
test('websites matches Springer Link (2)', () => {
    expect(Springer_websites[0].website.test("https:link-springer-com.ezproxy1.library.usyd.edu.au/afasdfas.asdfwef")).toBeTruthy;

});
test('websites matches Springer Link (3)', () => {
    expect(Springer_websites[0].website.test("https:link-springer-com.ezproxy1.library.usyd.edu.au/asdfaewfasdfas.asdfwef/adsflxzm1/2")).toBeTruthy;

});
test('websites matches Springer Link (4)', () => {
    expect(Springer_websites[0].website.test("https:link-springer-com.ezproxy1.library.usyd.edu.au/asdfaewfasdfas.asdfwef/adsflxzmsadfasfasdfas")).toBeTruthy;

});


test('Find the link and download the file', () => {
    document.body.innerHTML =
        '<div>' +
        '  <span id="username" />' +
        '  <button id="button" class="c-button c-button--blue c-button__icon-right" />' +
        '</div>';
    document.getElementById("button").click();
    expect(Springer_article_download).toBeDefined();
});