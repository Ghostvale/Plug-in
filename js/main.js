/** the main function of controling the CSS file
 *  clean the extra block and change the layout
 */

(function injectSeacherMode() {
    // list of supported websites
    var websites = [{
        name: "USYDLib",
        website: /https?:\/\/sydney\.primo\.exlibrisgroup\.com\/discovery\//
    }, {
        name: "Ovid",
        website: /https?:\/\/ovidsp-dc2-ovid-com\.ezproxy1\.library\.usyd\.edu\.au/
    }, {
        name: "Ovid-ebook",
        website: /http?:\/\/ovidsp\.dc2\.ovid\.com\.ezproxy1\.library\.usyd\.edu\.au/
    }, {
        name: "ProQuest",
        website: /https?:\/\/\w+-proquest-com\.ezproxy1\.library\.usyd\.edu\.au/
    }, {
        name: "JSTOR",
        website: /https?:\/\/www-jstor-org\.ezproxy1\.library\.usyd\.edu\.au/
    }];
    activate();


    /**
     * test the current websites whether can be supported
     *  send messgae to background if the page is supproted */
    websites.forEach(p => {
        if (p.website.test(window.location.href)) {
            chrome.runtime.sendMessage({ status: "Page Supported" });
        }
    });

    // add cheat sheet reminders
    cheat_sheet = /https?:\/\/sydney\.primo\.exlibrisgroup\.com\/discovery\/search/
    chrome.storage.sync.get(['CheatSheet'], e => {
        if (e.CheatSheet) {
            if (cheat_sheet.test(window.location.href)) {
                alert("Thanks for using Library download helper. there is a little cheat sheet \n" +
                    "alt+A is an on-off switch \n" +
                    "alt+S is to search available results or databases\n" +
                    "alt+C is to download button (only for databases)");
            }
        }
    })


    // listener for handle switch
    window.addEventListener('keydown', e => {
        if (e.altKey && (e.keyCode === 65 /* a */ )) {
            chrome.runtime.sendMessage({ status: "icon_switch" });
        }

    }, true);

    // listener for the searching websites
    window.addEventListener('keydown', e => {
        var result_content = document.getElementsByClassName("list-item-primary-content result-item-primary-content layout-row");

        websites.forEach(p => {
            if (p.website.test(window.location.href)) {
                if (p.name == "USYDLib") {
                    if (e.altKey && (e.keyCode === 83 /* s */ )) {
                        var search = /https?:\/\/sydney\.primo\.exlibrisgroup\.com\/discovery\/search/;
                        var fulldisplay = /https?:\/\/sydney\.primo\.exlibrisgroup\.com\/discovery\/fulldisplay/;
                        if (search.test(window.location.href)) {
                            window.onload = current_content();
                        }
                        if (fulldisplay.test(window.location.href)) {
                            if (Its_online()) {
                                window.onload = available_website();
                            } else {
                                var decision = prompt("There is no available online resourse \n You can enter 0 Go back to previous page.");
                                if (decision === null) {
                                    return;
                                }
                                if (Number(decision) == 0) {
                                    var back_button = document.getElementsByClassName("default-toolbar zero-padding _md md-primoExplore-theme");
                                    back_button[0].childNodes[0].childNodes[2].click();
                                } else if (Number(decision) != 0 || isNaN(decision)) {
                                    alert("Please enter the correct number.");
                                }

                            }
                        }
                    }
                }
            }
        });
    }, true);


    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg.status == "icon_switch" && msg.icon_switch) {
            activate();
            chrome.storage.sync.get(['On_Off_switch'], e => {
                if (e.On_Off_switch) {
                    sound_open();
                }
            });
        } else if (msg.status == "icon_switch" && !msg.icon_switch) {
            deactivate();
            chrome.storage.sync.get(['On_Off_switch'], e => {
                if (e.On_Off_switch) {
                    sound_close();
                }
            });
        }
    });


    function activate() {
        websites.forEach(p => {
            if (p.website.test(window.location.href)) {
                document.documentElement.classList.add(p.name + "-modify")
            }
        });
    }

    function deactivate() {
        websites.forEach(p => {
            if (p.website.test(window.location.href)) {
                document.documentElement.classList.remove(p.name + '-modify');
            }
        });
    }
    //show the avaliable websites.
    function available_website() {
        var tags = document.getElementsByClassName("item-title md-primoExplore-theme");
        var available_string = "Please enter the number of the available databases\n";
        available_string = available_string + "0 | Go back to previous page. \n"
        for (var i = 0; i < tags.length; i++) {
            available_string = available_string + (i + 1) + " | " + tags[i].innerText;
            var texts = available_string.split(" ");
            if (texts.includes("SpringerNature")) {
                available_string = available_string + "\n";
            } else if (texts.includes("ProQuest")) {
                available_string = available_string + "\n";
            } else if (texts.includes("Proquest")) {
                available_string = available_string + "\n";
            } else if (texts.includes("JSTOR")) {
                available_string = available_string + "\n";
            } else if (texts.includes("EBSCOhost")) {
                available_string = available_string + "\n";
            } else if (texts.includes("Springer")) {
                available_string = available_string + "\n";
            } else if (texts.includes("Ovid")) {
                available_string = available_string + "\n";
            } else {
                available_string = available_string + " (Not Supported)" + "\n"
            }
        }
        var decision = prompt(available_string);
        if (decision === null) {
            return;
        }
        if (Number(decision) <= tags.length && Number(decision) > 0) {
            window.open(tags[Number(decision) - 1]);
        } else if (Number(decision) == 0) {
            var back_button = document.getElementsByClassName("default-toolbar zero-padding _md md-primoExplore-theme");
            if (back_button.length == 1) {
                back_button[0].childNodes[0].childNodes[2].click();
            }
            document.getElementsByClassName("md-icon-button close-button full-view-navigation md-button md-primoExplore-theme md-ink-ripple")[0].click()

        } else if (Number(decision) > tags.length || isNaN(decision)) {
            alert("Please enter the correct number.");
        }
        tags = [];
    }
    // show the content of current result page
    function current_content() {
        var result_content = document.getElementsByClassName("list-item-primary-content result-item-primary-content layout-row");

        var available_string = "Please enter the number of the available links " + "\n";
        for (var i = 0; i < result_content.length; i++) {
            if (result_content[i].childNodes.length > 9) {
                var book_names = result_content[i].childNodes[10].childNodes[2].childNodes[5];
                if (book_names == null) {
                    book_names = result_content[i].childNodes[10].childNodes[4].childNodes[5].innerText;
                } else {
                    book_names = result_content[i].childNodes[10].childNodes[2].childNodes[5].innerText;
                }
            } else {
                var book_names = result_content[i].childNodes[8].childNodes[2].childNodes[5];
                if (book_names == null) {
                    book_names = result_content[i].childNodes[8].childNodes[4].childNodes[5].innerText;
                } else {
                    book_names = result_content[i].childNodes[8].childNodes[2].childNodes[5].innerText;
                }
            }


            available_string = available_string + (i + 1) + " | " + book_names + "\n";
        }
        var decision = prompt(available_string);
        if (decision === null) {
            return;
        }
        if (Number(decision) <= 11) {
            if (result_content[Number(decision) - 1].childNodes.length > 9) {
                window.location.href = result_content[Number(decision) - 1].childNodes[10].childNodes[2].childNodes[5].childNodes[1].href
            } else {
                window.location.href = result_content[Number(decision) - 1].childNodes[8].childNodes[2].childNodes[5].childNodes[1].href
            }
        } else if (Number(decision) > result_content.length || isNaN(decision)) {
            alert("Please enter the correct number.");
        }
    }

    //measure if there is the online resource
    function Its_online() {
        var online_available_tags = document.getElementsByClassName("section-title md-title light-text");
        var test_online_availbale = false;
        for (var i = 0; i < online_available_tags.length; i++) {
            if (online_available_tags[i].innerText == "View it") {
                test_online_availbale = true;
                break;
            }
        }
        return test_online_availbale;
    }

    function sound_open() {
        var audio = document.createElement("audio");
        audio.src = "https://freesound.org/data/previews/75/75344_708954-lq.mp3";
        audio.play();
    }

    function sound_close() {
        var audio = document.createElement("audio");
        audio.src = "https://freesound.org/data/previews/177/177494_33044-lq.mp3";
        audio.play();
    }
})();