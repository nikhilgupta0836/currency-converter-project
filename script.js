const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

// Load currencies dynamically
async function loadCurrencies() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach((currency) => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = currency;
      option1.textContent = option2.textContent = currency;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (err) {
    result.innerText = "Failed to load currencies 😞";
  }
}

// Convert currency
async function convertCurrency() {
  const amountVal = amount.value;
  if (amountVal === "" || amountVal <= 0) {
    result.innerText = "⚠️ Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`
    );
    const data = await res.json();

    const rate = data.rates[toCurrency.value];
    const converted = (amountVal * rate).toFixed(2);

    result.innerHTML = `
      ${amountVal} ${fromCurrency.value} = 
      <br><strong>${converted} ${toCurrency.value}</strong>
    `;
  } catch (err) {
    result.innerText = "Error fetching conversion rates 😔";
  }
}

convertBtn.addEventListener("click", convertCurrency);
loadCurrencies();
