const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const btn = document.querySelector("button");

const exchange = document.querySelector(".exchange");

const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for(const country_code in countries) {
        // console.log(countries[country_code]);

        // selcting English by default as From language and Hindi as To language
        let selected;
        if(id == 0 && country_code == "en-GB") {
            selected = "selected";
        }
        else if(id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag
    }
});



// change the value of Exchange icon on Click
exchange.addEventListener('click', () => {
    let tempText = fromText.value;
    let tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});



// translate text on Click
btn.addEventListener("click", () => {
    let text = fromText.value;
    let translateFrom = selectTag[0].value; // getting the value of fromSelect
    let translateTo = selectTag[1].value; // getting the value of toSelect
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    // fetching the api response and returning it with parsing into js obj
    // and in another then method receiving that obj
    fetch(apiUrl).then(res => res.json()).then(data => {
        // console.log(data);
        toText.value = data.responseData.translatedText;
    });
});


// Mic and Copy functionality
icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
       if(target.classList.contains("fa-copy")) {
            // if the clicked icon has "from" id, copy the fromTextarea value else copy the toTextarea value
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
                console.log("text copied");
            } else {
                // console.log("click on copy icon to copy");
                navigator.clipboard.writeText(toText.value);
            }
       } else {
            // console.log("mic icon clicked");
            let utterance;
            // if the clicked icon has "from" id, speak the fromTextarea value , else speak the toTextarea value
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; // setting utterance language to fromSelect tag value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value; // setting utterance language to toSelect tag value
            }
            speechSynthesis.speak(utterance); // speak the passed utterance
       }
    });
})
