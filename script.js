let ac;
let bc;
let bm;
let newbie;

const updateBal = () => {
    document.getElementById("bal").innerHTML = "У вас " + ac + " AntonioCoin";
};

const updateBost = () => {
    document.getElementById("bost").innerHTML = "Купить улучшение (Цена: " + bc + "), Текущий множитель: " + bm;
};

const button = document.querySelector('#but');
const byb = document.querySelector('#bost');

const click = () => {
    ac += 1 * bm;
    updateBal();
    localStorage.setItem('bal', ac);
};

const bb = () => {
    if (ac >= bc) {
        ac -= bc;
        bc *= 2.5;
        bm *= 2;
        localStorage.setItem('bc', bc);
        localStorage.setItem('bm', bm);
        updateBost();
    }
};

const makeGrey = () => {
    document.getElementById("bost").classList.add("grey");
}

if (localStorage.getItem('newbie') === null) {
    bm = 1.5;
    bc = 100;
    ac = 0;
    localStorage.setItem('newbie', '1');
} else {
    ac = +localStorage.getItem('bal');
    bc = +localStorage.getItem('bc');
    bm = +localStorage.getItem('bm');
    updateBal();
    updateBost();
}

makeGrey();

byb.addEventListener('click', bb);
button.addEventListener('click', click);