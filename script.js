const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '4f1e71d847mshd34a1ad6ccd41d1p1087adjsnb1b12e15aaad',
        'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
    }
};

const btn = document.getElementById('btn');
const moneyAmount = document.getElementById('moneyAmount');
const err = document.getElementById('err');
const resultH2 = document.getElementById('result');
const form = document.getElementById('from');
const to = document.getElementById('to');

btn.addEventListener('click', () => {
    const amount = parseFloat(moneyAmount.value);

    if (isNaN(amount) || amount <= 0 || form.value === '' || to.value === '') {
        err.style.display = 'block';
        err.textContent = 'Iltimos miqdorni togri kiriting!';
    } else {
        err.style.display = 'none';
        const url = `https://currency-converter-pro1.p.rapidapi.com/latest-rates?base=${form.value}`;

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => calc(json))
            .catch((error) => console.error('Error fetching data:', error));
    }
});

function calc(data) {
    const rate = data.rates[to.value];

    if (rate) {
        resultH2.style.display = 'block';
        resultH2.textContent = `Natija: ${rate * parseFloat(moneyAmount.value)} so'm ✅`;
    } else {
        err.style.display = 'block';
        err.textContent = 'Konversiya kursini olishda xatolik.';
    }
}
