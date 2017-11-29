
let items = ['Joe', 'Runner', 'Chand', 'Maple', 'Lyn', 'River', 'Abel', 'Stone'];
let selected = [];
let timer;
let rollBtn = document.querySelector('.roll');
let label = document.querySelector('.roulette');
let selectedLabel = document.querySelector('.selected');


Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

function pick() {
    return items.sample();
}

function getRandomIntInclusive(min, max) {
    //The maximum is inclusive and the minimum is inclusive 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function play() {
    var i = 0;
    var times = getRandomIntInclusive(2, 3);

    function playLoop() {
        timer = setTimeout(() => {
            label.textContent = items[i];
            i++;
            if (i < items.length) {
                playLoop();
            } else {
                --times;
                if (times > 0) {
                    i = 0;
                    playLoop();
                } else {
                    var select = pick();
                    selected.push(select);
                    items.splice(items.indexOf(select), 1);
                    label.textContent = select;
                    selectedLabel.innerHTML = selected.join('<br/>');
                    rollBtn.textContent = 'ROLL!';
                    rollBtn.disabled = items.length === 0;
                    if (rollBtn.disabled) {
                        rollBtn.textContent = 'Good Luck!';
                        label.textContent = '';
                    }
                }
            }
        }, 100);
    }

    playLoop();
}

rollBtn.addEventListener('click', (e) => {
    rollBtn.disabled = true;
    rollBtn.textContent = 'Rolling...';
    play();
});