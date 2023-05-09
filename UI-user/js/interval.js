let init = 7;
let total = init * 60;
const totalTime = document.querySelector('#total__time');

const interval = setInterval(() => {
    if (total % 60 === 0) {
        init--;
        totalTime.innerHTML = init;
    }
    total--;
    if (total === 0) {
        clearInterval(interval);
        window.location.href = './index.html';
    }
}, 30);