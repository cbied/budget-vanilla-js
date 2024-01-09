let cashflowTotal = document.getElementById('cashflowTotal');

const addExpenseForm = document.getElementById('addExpenseForm');
const expenseTotal = document.getElementById('expenseTotal');
const expenseDropdown = document.getElementById('expenseDropdown');
expenseDropdown.length = 0;
const expenseList = document.getElementById('expenseList');

const addIncomeForm = document.getElementById('addIncomeForm');
const incomeTotal = document.getElementById('incomeTotal');
const incomeDropdown = document.getElementById('incomeDropdown');
incomeDropdown.length = 0;
const incomeList = document.getElementById('incomeList');


function updateCashflow(value) {
    let total = +cashflowTotal.innerText
    let newTotal  = total += +value ;
    cashflowTotal.innerText = newTotal 
}

function updateList(category, amount, isIncome) {
    var div = document.createElement('div');
    var h4one = document.createElement('h4');
    var h4two = document.createElement('h4');
    console.log(category)
    h4one.innerText = category + ': $' + amount
    h4two.innerText = 'X'
    div.classList.add('categoryList')
    div.setAttribute('id', (expenseList.children.length).toString())
    div.appendChild(h4one)
    div.appendChild(h4two)
    if(isIncome) {
        incomeList.appendChild(div)
    } else {
        expenseList.appendChild(div);
    }
}

function addExpense(event) {
    event.preventDefault();
    let expenseValue = +event.target[1].value;
    let total = +expenseTotal.innerText

    if(expenseValue > 0) {
        const newTotal = total += expenseValue;
        expenseTotal.innerText = +newTotal;
        updateCashflow(-+expenseValue)
        updateList(expenseDropdown.value, expenseValue, false)
    }
    
}

function removeExpense(event) {
    event.preventDefault();
    console.log(event.target.parentElement.id)
    console.log((expenseList.children))
    expenseList.children.filter(elements => {
        console.log(elements)
    })
}

function addIncome(event) {
    event.preventDefault()
    let incomeValue = +event.target[1].value;
    let total = +incomeTotal.innerText

    if(incomeValue > 0) {
        const newTotal = total + incomeValue;
        incomeTotal.innerText = newTotal;
        updateCashflow(+incomeValue)
        updateList(incomeDropdown.value, incomeValue, true)
    }
    
}

function addCategories() {
    fetch('./assets/expensesCategories.json')
    .then(response => response.json())
    .then(data => {
            var expenese = Object.values(data.monthlyExpenses)
            for (var i = 0; i < expenese.length; i++) {
            option = document.createElement('option');
            var item = expenese[i];
            option.text = item
            option.value = item
            expenseDropdown.add(option)
        }
    })
    .catch(err => console.log(err));

    fetch('./assets/incomeCategories.json')
    .then(response => response.json())
    .then(data => {
            var income = Object.values(data.monthlyIncome)
            for (var i = 0; i < income.length; i++) {
            option = document.createElement('option');
            var item = income[i];
            option.text = item
            option.value = item
            incomeDropdown.add(option)
        }
    })
    .catch(err => console.log(err));
}


window.addEventListener("DOMContentLoaded", addCategories)
addExpenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", removeExpense);
addIncomeForm.addEventListener("submit", addIncome);
