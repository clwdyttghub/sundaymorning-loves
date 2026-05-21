const wordTimestamps = [
    { time: 90, text: "but", line: 1 }, { time: 360, text: "things", line: 1 }, { time: 720, text: "just", line: 1 }, { time: 1090, text: "get", line: 1 }, { time: 1460, text: "so", line: 1 }, { time: 1800, text: "crazy", line: 1 },
    { time: 2450, text: "living", line: 2 }, { time: 2750, text: "life", line: 2 }, { time: 3290, text: "gets", line: 2 }, { time: 3700, text: "hard", line: 2 }, { time: 4040, text: "to", line: 2 }, { time: 4300, text: "do", line: 2 },
    { time: 5230, text: "and", line: 3 }, { time: 5460, text: "i would", line: 3 }, { time: 5790, text: "gladly", line: 3 }, { time: 6210, text: "hit", line: 3 }, { time: 6540, text: "the", line: 3 }, { time: 7000, text: "road,", line: 3 }, { time: 7510, text: "get", line: 3 }, { time: 7960, text: "up", line: 3 }, { time: 8280, text: "and", line: 3 }, { time: 8580, text: "go", line: 3 }, { time: 8950, text: "if", line: 3 }, { time: 9320, text: "i knew", line: 3 },
    { time: 11030, text: "that", line: 4 }, { time: 11330, text: "someday", line: 4 }, { time: 11660, text: "it", line: 4 }, { time: 11990, text: "would", line: 4 }, { time: 12310, text: "lead", line: 4 }, { time: 12600, text: "me", line: 4 }, { time: 13040, text: "back", line: 4 }, { time: 13660, text: "to", line: 4 }, { time: 13880, text: "you", line: 4 },
    { time: 16470, text: "that", line: 5 }, { time: 16810, text: "someday", line: 5 }, { time: 17120, text: "it", line: 5 }, { time: 17440, text: "would", line: 5 }, { time: 17770, text: "lead", line: 5 }, { time: 18090, text: "me", line: 5 }, { time: 18450, text: "back", line: 5 }, { time: 18750, text: "to", line: 5 }, { time: 19410, text: "you", line: 5 }, { time: 20470, text: "(oh, someday)", line: 5 },
    { time: 21320, text: "that", line: 6 }, { time: 21680, text: "may", line: 6 }, { time: 22000, text: "be", line: 6 }, { time: 22340, text: "all", line: 6 }, { time: 23590, text: "i need", line: 6 },
    { time: 26180, text: "in", line: 7 }, { time: 26610, text: "darkness,", line: 7 }, { time: 26970, text: "she", line: 7 }, { time: 27330, text: "is", line: 7 }, { time: 27780, text: "all", line: 7 }, { time: 28900, text: "i see", line: 7 }, { time: 30880, text: "(all i see)", line: 7 },
    { time: 31930, text: "come", line: 8 }, { time: 32240, text: "and", line: 8 }, { time: 32520, text: "rest", line: 8 }, { time: 32860, text: "your", line: 8 }, { time: 33220, text: "bones", line: 8 }, { time: 34410, text: "with", line: 8 }, { time: 35840, text: "me", line: 8 },
    { time: 36660, text: "driving", line: 9 }, { time: 37260, text: "slow", line: 9 }, { time: 37590, text: "on", line: 9 }, { time: 37930, text: "sunday", line: 9 }, { time: 38520, text: "morning", line: 9 },
    { time: 39730, text: "and", line: 10 }, { time: 40100, text: "i never", line: 10 }, { time: 40730, text: "want", line: 10 }, { time: 41680, text: "to", line: 10 }, { time: 41930, text: "leave", line: 10 }
];

const photos = [
    { time: 500, src: "sundaymorning-drawable1.jpeg", left: '20%' },
    { time: 3000, src: "sundaymorning-drawable2.jpeg", left: '60%' },
    { time: 6000, src: "sundaymorning-drawable3.jpeg", left: '25%' },
    { time: 9000, src: "sundaymorning-drawable4.jpeg", left: '55%' },
    { time: 12000, src: "sundaymorning-drawable5.jpeg", left: '22%' },
    { time: 15000, src: "sundaymorning-drawable6.jpeg", left: '58%' },
    { time: 18000, src: "sundaymorning-drawable7.jpeg", left: '28%' },
    { time: 24000, src: "sundaymorning-drawable8.jpeg", left: '52%' },
    { time: 30000, src: "sundaymorning-drawable9.jpeg", left: '20%' },
    { time: 36000, src: "sundaymorning-drawable10.jpeg", left: '55%' },
    { time: 40000, src: "sundaymorning-drawable11.jpeg", left: '35%' }
];

const container = document.getElementById('container');
const mainWrapper = document.getElementById('main-wrapper');
const startBtn = document.getElementById('start-button');
const signature = document.getElementById('signature');
const audio = document.getElementById('bg-music');
let currentLineContainers = {};

startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.play().then(() => {
        startBtn.style.display = 'none';
        mainWrapper.style.pointerEvents = 'auto';
        playSequence();
    }).catch(err => console.log("Audio play failed:", err));
});

function getOrCreateLineContainer(lineNum) {
    if (!currentLineContainers[lineNum]) {
        Object.keys(currentLineContainers).forEach(id => {
            const oldLine = currentLineContainers[id];
            oldLine.style.opacity = '0';
            setTimeout(() => { if (oldLine.parentNode) oldLine.remove(); }, 300);
            delete currentLineContainers[id];
        });

        const el = document.createElement('div');
        el.className = 'lyric-container';
        container.appendChild(el);
        currentLineContainers[lineNum] = el;
    }
    return currentLineContainers[lineNum];
}

function showWord(wordData) {
    if (wordData.line === 7 && wordData.text === "in") {
        document.body.classList.add('dark-mode');
    }
    if (wordData.line === 8 && wordData.text === "come") {
        document.body.classList.remove('dark-mode');
    }

    const lineEl = getOrCreateLineContainer(wordData.line);
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.innerText = wordData.text;
    lineEl.appendChild(wordSpan);
}

function createPhoto(pData) {
    const frame = document.createElement('div');
    frame.className = 'floating-photo';
    frame.style.left = pData.left;
    frame.innerHTML = `<img src="${pData.src}" alt="photo">`;
    container.appendChild(frame);
    frame.style.animation = 'floatUpPhoto 11s forwards linear';
    setTimeout(() => { if (frame.parentNode) frame.remove(); }, 11000);
}

function playSequence() {
    wordTimestamps.forEach(word => {
        setTimeout(() => showWord(word), word.time);
    });
    
    photos.forEach(p => {
        setTimeout(() => createPhoto(p), p.time);
    });

    setTimeout(() => {
        signature.style.opacity = '1';
    }, 42930);

    setTimeout(() => {
        mainWrapper.classList.add('fade-out');
    }, 43930);
}