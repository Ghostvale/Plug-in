/** adapter for the websites: ProQuest database */
var ProQ_websites = [{
    name: "ProQuest",
    website: /https?:\/\/\w+-proquest-com\.ezproxy1\.library\.usyd\.edu\.au/
}];

// listener for the download the PDF files
window.addEventListener('keydown', e => {
    ProQ_websites.forEach(p => {
        if (p.website.test(window.location.href)) {
            if (e.altKey && (e.keyCode === 67 /* c */ )) {
                ProQ_Quick_download();
            }
        }
    });
}, true);

//quickly download the article
function ProQ_Quick_download() {
    var download_button = document.getElementById("downloadPDFLink");
    if (download_button == null) {
        if (document.getElementById("toolDownload") == null) {
            ProQ_ebook_download();
        } else {
            document.getElementById("toolDownload").click();
            setTimeout("Readbook_online()", 3000);

        }
    } else {
        download_button.click();
        alert("The article is downloading, Please wait a second");
    }
};


// quickly download the ebook
function ProQ_ebook_download() {

    var available_string = "Please enter a number to download the chapters\n";
    available_string = available_string + "0 | Read book online \n";
    //available_string = available_string + "0: download the whole book (need Adobe Digital Editions) \n";

    // download the different chapters 
    var chapters = document.getElementsByClassName("toc toc-l-1");
    for (var i = 0; i < chapters.length; i++) {
        available_string = available_string + (i + 1) + " | " + chapters[i].childNodes[1].childNodes[1].childNodes[1].innerText + "\n"
    }
    // open the prompt 
    var decision = prompt(available_string);
    if (decision === null) {
        return;
    }

    if (Number(decision) <= chapters.length && Number(decision) > 0) {
        //window.open(tags[Number(decision)]);
        chapters[Number(decision) - 1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].click()
        setTimeout("chapter_download()", 2000);
        alert("The article is downloading, Please wait a second");
    } else if (Number(decision) == 0) {
        document.getElementById("availableOnlineReadId").click();
    } else if (Number(decision) > chapters.length || isNaN(decision)) {
        alert("Please enter the correct number.");
    }
}

function chapter_download() {
    var chapter_download = document.getElementById("chapterOpenPDF");
    chapter_download.click();
}

function Readbook_online() {
    if (document.getElementById("downloadPeriodFull") != null) {
        document.getElementById("downloadPeriodFull").value = 21;
    }
    var decision = prompt("the file you are downloading may need Adobe Digital Editions to open: \n 0.download\n 1.Cancel");
    if (decision === null) {
        return;
    }
    if (Number(decision) == 0) {
        document.getElementById("downloadBookButton").click();
    } else if (Number(decision) == 1) {
        return;
    } else {
        alert("Please enter the correct number.");
    }


}

//module.exports = { ProQ_websites, ProQ_Quick_download, ProQ_ebook_download };