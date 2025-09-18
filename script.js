$(document).ready(function () {
    const $currencyOne = $('#currency-one');
    const $currencyTwo = $('#currency-two');
    const $amountOne = $('#amount-one');
    const $amountTwo = $('#amount-two');
    const $rate = $('#rate');
    const $swap = $('#swap');

    // Fetch exchange rates and update DOM
    function calculate() {
        const currencyOne = $currencyOne.val();
        const currencyTwo = $currencyTwo.val();

        $.getJSON(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`, function(data) {
            const rate = data.rates[currencyTwo];
            $rate.text(`1 ${currencyOne} = ${rate} ${currencyTwo}`);
            $amountTwo.val(($amountOne.val() * rate).toFixed(2));
        });
    }

    // Event listeners
    $currencyOne.on('change', calculate);
    $amountOne.on('input', calculate);
    $currencyTwo.on('change', calculate);
    $amountTwo.on('input', calculate);

    $swap.on('click', function() {
        const temp = $currencyOne.val();
        $currencyOne.val($currencyTwo.val());
        $currencyTwo.val(temp);
        calculate();
    });

    calculate();
});
