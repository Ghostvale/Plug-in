let { EBSCO_websites, EBSCO_Quick_download } = require('../EBSCO-adapter');

test('websites contains EBSCO result pages', () => {
    expect(EBSCO_websites[0].name).toBe("EBSCOhost");
    expect(EBSCO_websites[0].website.test("http://web.a.ebscohost.com.ezproxy1.library.usyd.edu.au")).toBeTruthy;
});

test('EBSCO can match result pages (1)', () => {
    expect(EBSCO_websites[0].website.test("http://web.a.ebscohost.com.ezproxy1.library.usyd.edu.au/asdfasdf/adsf")).toBeTruthy;
});
test('EBSCO can match result pages (2)', () => {
    expect(EBSCO_websites[0].website.test("http://web.a.ebscohost.com.ezproxy1.library.usyd.edu.au/asdf/asd/fadsf/")).toBeTruthy;
});
test('EBSCO can match result pages (3)', () => {
    expect(EBSCO_websites[0].website.test("http://web.b.ebscohost.com.ezproxy1.library.usyd.edu.au/f/hjfghfgh/j/fghj/")).toBeTruthy;
});
test('EBSCO can match result pages (4)', () => {
    expect(EBSCO_websites[0].website.test("http://web.b.ebscohost.com.ezproxy1.library.usyd.edu.au/fghjwersdfg")).toBeTruthy;
});

test('Download the article', () => {
    document.body.innerHTML =
        '<div>' +
        '  <span id="username" />' +
        '  <button id="downloadLink" />' +
        '</div>';
    document.getElementById("downloadLink").click();
    expect(EBSCO_Quick_download).toBeDefined();
});