document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "c0c7b5f65bb7a2a588221a03"; // ExchangeRate API key
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amountInput = document.getElementById("amount");
    const resultDiv = document.getElementById("result");

    // function to convert currency
    function convertCurrency() {
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amount = amountInput.value;

        if (amount === "" || isNaN(amount) || amount <= 0) {
            resultDiv.style.display = "none";
            return;
        }

        // fetching data from api
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromValue}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    const conversionRate = data.conversion_rates[toValue];
                    const convertedAmount = (amount * conversionRate).toFixed(2);

                    resultDiv.textContent = `${amount} ${fromValue} = ${convertedAmount} ${toValue}`;
                    resultDiv.style.display = "block";
                } else {
                    resultDiv.textContent = "Failed to fetch conversion rates.";
                    resultDiv.style.display = "block";
                }
            })
            .catch(error => {
                resultDiv.textContent = "Error fetching conversion rates.";
                resultDiv.style.display = "block";
            });
    }

    amountInput.addEventListener("input", convertCurrency);
    fromCurrency.addEventListener("change", convertCurrency);
    toCurrency.addEventListener("change", convertCurrency);
});
