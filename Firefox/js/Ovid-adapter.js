/** adapter for the websites: Ovid database */

var Ovid_websites = [{
    name: "Ovid",
    website: /https?:\/\/ovidsp-dc2-ovid-com\.ezproxy1\.library\.usyd\.edu\.au/
}, {
    name: "Ovid-ebook",
    website: /http?:\/\/ovidsp\.dc2\.ovid\.com\.ezproxy1\.library\.usyd\.edu\.au/
}];



// add listener for downloading the PDF files
window.addEventListener('keydown', e => {
    Ovid_websites.forEach(p => {

        if (p.website.test(window.location.href)) {
            if (e.altKey && (e.keyCode === 67 /* c */ )) {
                Ovid_article_download();
            }
        }

    });
}, true);

//quickly download the article
function Ovid_article_download() {

    var iframe = document.getElementById("book-read-content");
    if (iframe == null) {
        var pdf_download = document.getElementById("pdf");
        pdf_download.click();
    } else {
        var iframe_html = iframe.contentDocument;
        var ebook_export = iframe_html.getElementsByClassName("ico_tools_sprite");
        ebook_export[0].click();
        var exportPDF = iframe_html.getElementsByClassName("exportPDF");
        exportPDF[0].click();
        /*// open the content table
        var click_content = iframe_html.document.getElementsByClassName("collapsed");
        if (click_content[1].getAttribute("data-active") == "active") {
            click_content[1].click();
        }*/



    }
}

/*
function ebook_download() {
    // record the chapter numbers
    if (iframe_html == null) {
        return;
    } else {
        flag = false;
    }
    var content = iframe_html.document.getElementsByClassName("ng-binding Link");
    var start = 0;
    var end = 0;
    for (var i = 0; i < content.length; i++) {
        if (content[i].innerText == "Table of Contents") {
            start = i + 1;
        }
        if (content[i].innerText == "Back of Book") {
            end = i;
        }
    }

    var chapters_list = [];
    for (var i = start; i < end; i++) {
        chapters_list.push(content[i]);
    }

    var available_string = "Available chapters are : \n";
    for (var i = 0; i < chapters_list.length; i++) {
        available_string = available_string + (i + 1) + ": " + chapters_list[i].innerText + "\n";
    }
    // open the prompt 
    var decision = prompt(available_string);
    if (decision === null) {
        return;
    }
    var ebook_export = iframe_html.document.getElementsByClassName("ico_tools_sprite");
    if (Number(decision) <= chapters_list.length && Number(decision) > 0) {
        chapters_list[Number(decision) - 1].click();
        ebook_export[0].click();
        var exportPDF = iframe_html.document.getElementsByClassName("exportPDF");
        exportPDF[0].click();
    } else if (Number(decision) > chapters_list.length || isNaN(decision)) {
        alert("Please enter the correct number.");
    }
}
*/

//module.exports = { Ovid_websites, Ovid_article_download, insert_CSS }