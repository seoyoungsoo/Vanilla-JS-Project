const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Hard coding
// const dummyTransactions = [
//   {id: 1, text: 'Flower', amount: -20},
//   {id: 2, text: 'Salary', amount: 300},
//   {id: 3, text: 'Book', amount: -10},
//   {id: 4, text: 'Camera', amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: parseInt(amount.value)
    }

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
const generateID = () => {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
const addTransactionDOM = (transaction) => {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on Value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expencs
const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, cur) => acc += cur, 0).toFixed(2);

  const income = amounts.filter(amount => amount > 0).reduce((acc, cur) => acc += cur, 0).toFixed(2);

  const expense = (amounts.filter(amount => amount < 0).reduce((acc, cur) => acc += cur, 0) * -1).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
const removeTransaction = (id) => {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

// Event listeners
form.addEventListener('submit', addTransaction);