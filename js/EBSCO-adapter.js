/** adapter for the websites: EBSCOhost database */

var EBSCO_websites = [{
    name: "EBSCOhost",
    website: /http?:\/\/web\.\w\.ebscohost\.com\.ezproxy1\.library\.usyd\.edu\.au/
}];

// add listener for downloading the PDF files
window.addEventListener('keydown', e => {
    EBSCO_websites.forEach(p => {
        if (p.name == "EBSCOhost") {
            if (p.website.test(window.location.href)) {
                if (e.altKey && (e.keyCode === 67 /* c */ )) {
                    EBSCO_Quick_download();
                }
            }
        }
    });
}, true);

//quickly download 
function EBSCO_Quick_download() {
    var download_link = document.getElementById("downloadLink");
    // download the ebook
    if (download_link == null) {
        var fulltext = document.getElementsByClassName("record-type pdf-ft");
        var available_string = "Please enter the number as a command: \n";
        available_string = available_string + "0 | open the PDF full text. \n"
        var decision = prompt(available_string);
        if (decision === null) {
            return;
        }
        if (Number(decision) == 0) {
            fulltext[0].click();
        } else if (Number(decision) >= 0 || isNaN(decision)) {
            alert("Please enter the correct number.");
        }
    } else {
        // download the article
        download_link.click();
    }

};

//module.exports = { EBSCO_websites, EBSCO_Quick_download }