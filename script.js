function buyDonkey(donkeyType) {
    // Получение текущего баланса wDON из LocalStorage
    let wdonBalance = localStorage.getItem('wdonBalance') || 0;

    // Получение цены осла из HTML
    let donkeyPrice = parseInt(document.getElementById(`donkey-${donkeyType}-price`).textContent);

    // Проверка достаточного баланса
    if (wdonBalance >= donkeyPrice) {
        // Вычитание цены из баланса
        wdonBalance -= donkeyPrice;

        // Обновление баланса в HTML и LocalStorage
        document.getElementById('wdon-balance').textContent = wdonBalance;
        localStorage.setItem('wdonBalance', wdonBalance);

        // Увеличить количество ослов определенного типа
        let donkeyCount = parseInt(localStorage.getItem(`donkeyCount-${donkeyType}`) || 0);
        donkeyCount++;
        localStorage.setItem(`donkeyCount-${donkeyType}`, donkeyCount);

        // Обновление количества ослов в HTML
        document.getElementById(`donkey-${donkeyType}-count`).textContent = donkeyCount;

        // Обновление общего количества ослов
        updateTotalDonkeyCount();

        // Обновление общего дохода
        updateTotalIncome();
    } else {
        alert('Недостаточно средств!');
    }
}

function updateTotalIncome() {
    let totalIncome = 0;

    // Подсчет общего дохода от всех ослов
    for (let i = 0; i < 8; i++) {
        let donkeyType = ['normal', 'fast', 'iron', 'silver', 'gold', 'diamond', 'holy', 'divine'][i];
        let donkeyCount = parseInt(localStorage.getItem(`donkeyCount-${donkeyType}`) || 0);
        let donkeyIncome = parseInt(document.getElementById(`donkey-${donkeyType}-income`).textContent);
        totalIncome += donkeyCount * donkeyIncome;
    }

    // Обновление общего дохода в HTML
    document.getElementById('total-income').textContent = totalIncome;
}

function updateTotalDonkeyCount() {
    let totalDonkeyCount = 0;

    // Подсчет общего количества ослов
    for (let i = 0; i < 8; i++) {
        let donkeyType = ['normal', 'fast', 'iron', 'silver', 'gold', 'diamond', 'holy', 'divine'][i];
        let donkeyCount = parseInt(localStorage.getItem(`donkeyCount-${donkeyType}`) || 0);
        totalDonkeyCount += donkeyCount;
    }

    // Обновление общего количества ослов в HTML
    document.getElementById('total-donkey-count').textContent = totalDonkeyCount;
}

// Загрузка начального баланса и количества ослов из LocalStorage
window.onload = () => {
    document.getElementById('wdon-balance').textContent = localStorage.getItem('wdonBalance') || 0;

    // Проверка, является ли пользователь новичком
    let isNewbie = localStorage.getItem('isNewbie') === null; // Исправлено!

    if (isNewbie) {
        // Получение текущего количества обычных ослов
        let donkeyCount = parseInt(localStorage.getItem('donkeyCount-normal') || 0);

        // Добавление 10 обычных ослов
        donkeyCount += 10;

        // Сохранение обновленного количества ослов в LocalStorage
        localStorage.setItem('donkeyCount-normal', donkeyCount);

        // Обновление количества ослов в HTML
        document.getElementById('donkey-normal-count').textContent = donkeyCount;

        // Отметка, что пользователь уже не новичок
        localStorage.setItem('isNewbie', 'false');
    }

    // Обновление общего количества ослов
    updateTotalDonkeyCount();
    updateTotalIncome();

    var myInterval = setInterval(function() {
      updateTotalDonkeyCount();
      updateTotalIncome();
}, 2000);
};
