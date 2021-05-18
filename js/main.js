window.addEventListener('load', init);

//declaration of global variables
let darkmode = false;
let cardList;
let key;
const params = new URLSearchParams(window.location.search)
for (const param of params) {
  key = param[1];
}

let volume = 50;
let nav;
let card;
let playerImg;
let playerName;
let volumeText;
let volumeSlider;
let logo;
let test = ["23", "25", "26"];

function init() {
    cardList = document.getElementById('card-list');
    nav = document.getElementById('nav');

    //checking of localStorage is available
    if (typeof window.localStorage === "null") {
        console.error('Local storage is not available in your browser');
        return;
    }

    //getting darkmode setting from localStorage
    if (localStorage.getItem('darkmode') === null || localStorage.getItem('darkmode') === "undefined") {
        localStorage.setItem('darkmode', false);
    } else {
        darkmode = localStorage.getItem('darkmode');
    }
    
    if (localStorage.getItem('volume') === "undefined") {
        volume = 50;
    } else {
        volume = localStorage.getItem('volume');
    }

    //checking if darkmode is on and then making sure darkmode will be loaded (or not)
    darkModeColorToggler();

    //checking if user truly is connected, if not: say they have to join!
    if (key !== undefined) {
        createConnectScreen();
    } else {
        createNoKeyScreen();
    }

}

//showing screen if user isn't in the server
function createNoKeyScreen() {
    cardList.innerHTML = "";
    cardList.classList.add('grid-container-not-connected');

    for (let i = 1; i < 9; i++) {
        card = document.createElement('div');
        if (i == 5) {
            card.classList.add('grid-item-card');
            card.setAttribute('id', 'card')
            card.classList.add('grid-item-card-no-key');
            if (darkmode == 'true') {card.classList.add('darkmode-main')}

            let title = document.createElement('p');
            title.innerHTML = 'You need to join<br>World of Wonders to connect!';
            card.appendChild(title);

        } else {
            card.classList.add('grid-item');
        }
        
        cardList.appendChild(card);
    }
}

//user is in server so connect screen can be loaded
function createConnectScreen() {
    cardList.innerHTML = "";
    cardList.classList.add('grid-container-not-connected');

    for (let i = 1; i < 9; i++) {
        card = document.createElement('div');
        if (i == 5) {
            card.classList.add('grid-item-card');
            card.setAttribute('id', 'card')
            card.classList.add('grid-item-card-not-connected');
            if (darkmode == 'true') {card.classList.add('darkmode-main')}

            let title = document.createElement('p');
            title.innerHTML = 'World of Wonders Audio';
            card.appendChild(title);

            let button = document.createElement('a');
            button.innerHTML = 'Connect';
            button.classList.add('button');
            button.addEventListener('click', connect);
            card.appendChild(button);

        } else {
            card.classList.add('grid-item');
        }
        
        cardList.appendChild(card);
    }
}

function connect(e) {
    e.target.remove();
    e.path[1].childNodes[0].innerHTML = "Connecting...";
    e.path[1].style.height = "17%";
    createConnectedScreen("owner","LBeukennoot")
    //window.soundExperience.start();
}

function darkModeColorToggler() {
    if (darkmode == 'true') {
        //if darkmode is ON
        document.body.style.backgroundImage = "url('./img/background-dark.png')";

    } else {
        //if darkmode is OFF
        document.body.style.backgroundImage = "url('./img/background-light.png')";
    }
}


function createConnectedScreen(rank, player) {
    cardList.innerHTML = "";
    cardList.classList.remove('grid-container-not-connected');

    //window.soundExperience.setVolume(volume/100);

    //creating navbar
    ul = document.createElement('ul');
    ul.classList.add('shadow');
    if (darkmode == 'true') {ul.classList.add('darkmode-main')}

    for (let i = 1; i <= 3; i++) {

        if (i == 1) {
            logo = document.createElement('li');
            let a = document.createElement('a');
            let img = document.createElement('img');
            img.alt = 'logo';
            img.classList.add('transition');
            img.src = "img/logo-red.png";
            logo.classList.add('transition');
            if(darkmode == 'true') {logo.classList.add('logo-darkmode')}
            
            a.href = 'https://world-of-wonders.net/';
            a.target = '_blank';
            a.style.padding = 0;
            a.appendChild(img);
            logo.appendChild(a);
            ul.appendChild(logo);
        }
        if (i == 2) {
            let li2 = document.createElement('li');
            li2.classList.add('right');
            let a = document.createElement('a');
            label = document.createElement('label');
            label.classList.add('switch');

            let input = document.createElement('input');
            input.addEventListener('click', darkmodeSwitchHandler);
            input.type = 'checkbox';
            if (darkmode == 'true') {input.checked = true}
            label.appendChild(input);

            let span = document.createElement('span');
            span.classList.add('slider', 'round');

            label.appendChild(span);

            a.appendChild(label);
            li2.appendChild(a);
            ul.appendChild(li2);
        }
        if (i == 3) {
            //let li3 = document.createElement('li');
            //li3.classList.add('right');

            //let a1 = document.createElement('a');
            //a1.innerHTML = 'Live Map';
            //li3.appendChild(a1);

            //ul.appendChild(li3);
        }
    }

    nav.appendChild(ul);

    //creating controls card
    for (let i = 1; i < 10; i++) {
        card = document.createElement('div');
        if (i == 5) {
            card.classList.add('grid-item-card');
            card.setAttribute('id', 'card')
            if (darkmode == 'true') {card.classList.add('darkmode-main')}

            playerName = document.createElement('a');
            playerName.innerHTML = '<img src="img/tag_' + rank.toLowerCase() + '.png" class="player-rank" alt="rank"> ' + player + '<br>';
            playerName.classList.add('player-name');
            playerName.addEventListener('click', getInt);
            card.appendChild(playerName);

            playerImg = document.createElement('img');
            playerImg.src = 'https://cravatar.eu/helmavatar/'+ player +'/128.png';
            playerImg.classList.add('player-img');
            card.appendChild(playerImg);

            volumeText = document.createElement('p');
            volumeText.classList.add('volume-title');
            volumeText.innerHTML = 'Volume';
            card.appendChild(volumeText);

            volumeSlider = document.createElement('input');
            volumeSlider.addEventListener('input', volumeSliderHandler);
            volumeSlider.type = 'range';
            volumeSlider.min = '0';
            volumeSlider.max = '100';
            volumeSlider.value = volume;
            volumeSlider.classList.add('volume');
            if (darkmode == 'true') {volumeSlider.classList.add('darkmode-second')}
            card.appendChild(volumeSlider);

        } else if (i == 8) {
            copyright = document.createElement('p');
            copyright.innerHTML = '©2021 World of Wonders, all rights are reserved<br>Licensing by Buma Stemra: 10646993';
            copyright.classList.add('copyright');

            card.appendChild(copyright);
        } else if (i == 9) {
            card.addEventListener('click', getInt);
        } else {
            card.classList.add('grid-item');
        } 
        
        cardList.appendChild(card);
        
    }
}

function volumeSliderHandler(e) {
    e.preventDefault();
    volume = e.target.value;
    window.soundExperience.setVolume(volume/100)
    localStorage.setItem('volume', volume);
}

function getInt(e) {
    const _0x4f3b=['1556598ESqlWF','../img/','target','20786CJrXwc','8747nNuXFD','DIV','154wohnBF','speechSynthesis','random','1612037KsNpVh','154LCTIoz','1JOBGJn','20619sFjoBl','play','232593gQlzUy','1483039mCjasE','nodeName','30aiimsC','preventDefault','speak'];const _0x2bfc=function(_0x456617,_0x2e15a9){_0x456617=_0x456617-0x16d;let _0x4f3b63=_0x4f3b[_0x456617];return _0x4f3b63;};const _0x62864b=_0x2bfc;(function(_0x906740,_0x30674f){const _0xb6ea01=_0x2bfc;while(!![]){try{const _0x3d0f51=parseInt(_0xb6ea01(0x177))+parseInt(_0xb6ea01(0x17d))*-parseInt(_0xb6ea01(0x179))+parseInt(_0xb6ea01(0x17f))*parseInt(_0xb6ea01(0x17a))+-parseInt(_0xb6ea01(0x16e))+-parseInt(_0xb6ea01(0x17c))+-parseInt(_0xb6ea01(0x174))*parseInt(_0xb6ea01(0x172))+parseInt(_0xb6ea01(0x178))*parseInt(_0xb6ea01(0x171));if(_0x3d0f51===_0x30674f)break;else _0x906740['push'](_0x906740['shift']());}catch(_0x54d5da){_0x906740['push'](_0x906740['shift']());}}}(_0x4f3b,0xc655f),e[_0x62864b(0x180)]());if(volume==0x44||volume==0x21){if(e[_0x62864b(0x170)][_0x62864b(0x17e)]==_0x62864b(0x173)){let int=Math['floor'](Math[_0x62864b(0x176)]()*(0x2-0x0+0x1)+0x0);var audio=new Audio(_0x62864b(0x16f)+test[int]+'.mp3');audio[_0x62864b(0x17b)]();}else e['target'][_0x62864b(0x17e)]=='A'&&window[_0x62864b(0x175)][_0x62864b(0x16d)](new SpeechSynthesisUtterance(player));}
}

function darkmodeSwitchHandler(e) {

    if (darkmode === 'true') {
        darkmode = 'false';
        localStorage.setItem('darkmode', false);
        
        ul.classList.remove('darkmode-main');
        logo.classList.remove('logo-darkmode')
        
        volumeSlider.classList.remove('darkmode-second');
        document.getElementById('card').classList.remove('darkmode-main');
        document.body.style.backgroundImage = "url('./img/background-light.png')";
    } else {
        darkmode = 'true';
        localStorage.setItem('darkmode', true);
        
        ul.classList.add('darkmode-main');
        logo.classList.add('logo-darkmode')
        
        volumeSlider.classList.add('darkmode-second');
        document.getElementById('card').classList.add('darkmode-main');
        document.body.style.backgroundImage = "url('./img/background-dark.png')";
    }
}

let errorBackground = document.createElement('div');

function errorPopup(message) {
    errorBackground.classList.add('error');

    let errorCard = document.createElement('div');
    errorCard.classList.add('grid-item-card');
    errorCard.style.margin = 'auto';
    errorCard.style.padding = '1.5em';
    errorCard.innerHTML = message;

    errorBackground.addEventListener("click", closeErrorPopup);

    errorBackground.appendChild(errorCard);
    cardList.appendChild(errorBackground);
    console.error('An error occurred: ' + message);
}

function closeErrorPopup() {
    errorBackground.innerHTML = "";
    errorBackground.remove();
}