/** adapter for the websites: JSTOR database */

var JSTOR_websites = [{
    name: "JSTOR",
    website: /https?:\/\/www-jstor-org\.ezproxy1\.library\.usyd\.edu\.au/
}];


// add listener for downloading the PDF files
window.addEventListener('keydown', e => {
    JSTOR_websites.forEach(p => {

        if (p.website.test(window.location.href)) {
            if (e.altKey && (e.keyCode === 67 /* c */ )) {
                JSTOR_Ebook_download();
            }
        }
    });
}, true);

//quickly download the article
function JSTOR_Ebook_download() {
    var article_download = document.getElementsByClassName("pdfLink button white-color");
    // download the book
    if (article_download.length == 0) {
        var available_string = "Please enter a number to download the chapters \n";
        //available_string = available_string + "0: download the whole book (need Adobe Digital Editions) \n";
        var chapters = document.getElementsByClassName("small-heading inline");
        for (var i = 0; i < chapters.length; i++) {
            available_string = available_string + (i + 1) + " | " + chapters[i].innerText + "\n";
        }
        var download_link = document.getElementsByClassName("pdfLink tt-track-nolink");
        // open the prompt 
        var decision = prompt(available_string);
        if (decision === null) {
            return;
        }
        if (Number(decision) <= chapters.length && Number(decision) > 0) {
            download_link[Number(decision) - 1].click();
            acceptTC()
        } else if (Number(decision) > chapters.length || isNaN(decision)) {
            alert("Please enter the correct number.");
        }
    } else {
        //download the article
        article_download[0].click();
        acceptTC()
    }

}
//click the accept TC
function acceptTC() {
    if (document.getElementById("acceptTC") != null) {
        document.getElementById("acceptTC").click();
    }
}

//module.exports = { JSTOR_websites, JSTOR_Ebook_download }