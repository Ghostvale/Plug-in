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
    }];
    activate();
    /**
     * test the current websites whether can be supported
     *  send messgae to background if the page is supproted */
    websites.forEach(p => {
        if (p.website.test(window.location.href)) {
            chrome.runtime.sendMessage({ status: "Page Supported" });
        }
        if (p.website.test(window.location.href)) {
            if (p.name == "USYDLib") {
                alert("Thanks for using Library download helper. there is a little cheat sheet \n" +
                    "alt+A is an on-off switch \n" +
                    "alt+S is to search available results or databases\n" +
                    "alt+C is to download button (only for databases)");
            }
        }
    });

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

                        if (result_content.length == 10) {
                            current_content();
                        } else {
                            if (Its_online()) {
                                available_website();
                            } else {
                                var decision = prompt("There is no available online resourse \n 0. Come back to previous page.");
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
        } else if (msg.status == "icon_switch" && !msg.icon_switch) {
            deactivate();
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
        var available_string = "The number of the available websites is " + tags.length + " : \n";
        available_string = available_string + "0. Come back to previous page. \n"
        for (var i = 0; i < tags.length; i++) {
            available_string = available_string + (i + 1) + ". " + tags[i].innerText;
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
                available_string = available_string + " (Not Support)" + "\n"
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

        var available_string = "The first 4 books are" + "\n";
        for (var i = 0; i < 4; i++) {
            var book_names = result_content[i].childNodes[8].childNodes[2].childNodes[5].innerText;
            available_string = available_string + (i + 1) + ". " + book_names + "\n";
        }
        var decision = prompt(available_string);
        if (decision === null) {
            return;
        }
        if (Number(decision) <= result_content.length - 5) {
            window.location.href = result_content[Number(decision) - 1].childNodes[8].childNodes[2].childNodes[5].childNodes[1].href
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
})();