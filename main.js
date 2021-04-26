// variables

const currency_select = document.querySelector('#currency-select');
const currency_symbol = document.querySelector('#currency-symbol');
const bitcoin_amount = document.querySelector('#bitcoin-amount');
const amount = document.querySelector('#amount');
const full_price = document.querySelector('#full-price')

// event listeners

document.querySelector('.wrapper').addEventListener('click', function() {
    wholeBitcoinPrice();
});

bitcoin_amount.addEventListener('keyup', function() {
    coinToMoney();
})

amount.addEventListener('keyup', function() {
    moneyToCoin();
})

currency_select.addEventListener('change', function() {
    updateCurrency();
})

function getCurrency(){
    return {
        "currency": currency_select.options[currency_select.selectedIndex].value,
        "symbol" : currency_select.options[currency_select.selectedIndex].text
    }
}
  
async function coinToMoney(){
    whole = await wholeBitcoinPrice();
    amount.value = (parseFloat(bitcoin_amount.value) * parseFloat(whole)).toFixed(2);
}

async function moneyToCoin(){
    wholeBitcoinPrice();
    const currency = getCurrency();
    let response = await fetch(`https://blockchain.info/tobtc?currency=${currency['currency']}&value=${amount.value}`);
    let result = await response.text();
    bitcoin_amount.value = result;
}

async function wholeBitcoinPrice(){
    const response = await fetch('https://blockchain.info/ticker');
    const json = await response.json();
    const currency = getCurrency()
    
    const price = json[currency['currency']]['last'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    full_price.innerHTML = `${currency['symbol']} ${price}`
    return json[currency['currency']]['last']
}

function updateCurrency(){
    wholeBitcoinPrice();
    moneyToCoin();
    currency_symbol.innerHTML = getCurrency()['symbol'];
}