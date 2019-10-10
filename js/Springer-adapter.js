/** adapter for the websites: Springer Link database */

var Springer_websites = [{
    name: "Springer",
    website: /https?:\/\/link-springer-com\.ezproxy1\.library\.usyd\.edu\.au/
}];



// add listener for downloading the PDF files
window.addEventListener('keydown', e => {
    Springer_websites.forEach(p => {
        if (p.name == "Springer") {
            if (p.website.test(window.location.href)) {
                if (e.altKey && (e.keyCode === 67 /* c */ )) {
                    Springer_article_download();
                }
            }
        }
    });
}, true);

//quickly download the article
function Springer_article_download() {
    var book_download = document.getElementsByClassName("c-button c-button--blue c-button__icon-right");
    book_download[0].click();
}

//module.exports = { Springer_websites, Springer_article_download };