class Example {
    constructor(className, text) {
        this.className = className;
        this.text = text;
    }

    pushText() {
        document.querySelector(`.${this.className}`).textContent = this.text;
    }
}

const example1Text = `
function highAndLow (numbers) {
    return \`$\{Math.max(...numbers.split(" "))\} $\{Math.min(...numbers.split(" "))\}\`;
}

// Решение задачи, требующей найти максимальное и минимальное число из строки.
`;

const example2Text = `
function topThreeWords(text) {
    const clearText = text.replace(/ +/g, " ").replace(/${/\*|%|#|&|\$|\/|\.|\,/g.source}/, "");
    const array = clearText.split(" ").filter(el => el).filter(el => el !== "'").map(el => el.toLowerCase());
    const stats = {};

    for (let el of array) el in stats ? stats[el] += 1 : stats[el] = 1;

    const result = Object.values(stats).sort();
    const answer = [];

    const getKey = index => {
        for (let key in stats) {
            if (stats[key] === result[result.length - index]) {
                answer.push(key);
            }
        }
    }

    if (result.length >= 3) {
        getKey(1);
        getKey(2);
        getKey(3);
    } else if (result.length === 2) {
        getKey(1);
        getKey(2);
    } else if (result.length === 1) {
        getKey(1);
    }

    return [...(new Set(answer))].slice(0, 3);
}

// Пример решения на редкость лёгкой задачи четвёртого уровня, требующей найти самые часто используемые 
// слова в тексте, игнорируя прочие символы. Тем не менее даже её не вышло решить за малое количество строк 
// кода — у многих пользователей получилось гораздо короче.
`;

const example3Text = `
let reverse = (a) => [...a].map(a.pop, a);

// Пример решения (из интернет-ресурса) задачи третьего уровня сложности. Несмотря на то что код кажется лёгким, 
// не стоит забывать об ограничении на использование памяти — 30 байтов исключают все остальные длинные и сложные 
// решения, оставляя только это.
`;

const examples = {
    example1: new Example("example1-js", example1Text),
    example2: new Example("example2-js", example2Text),
    example3: new Example("example3-js", example3Text)
}

for (let key in examples) {
    examples[key].pushText();
}

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 45), -60);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);