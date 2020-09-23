var budgetInput = document.getElementById("budget-input");
var expenseInput = document.getElementById("expense-input");
var amountInput = document.getElementById("amount-input");

var budgetAmount = document.getElementById("budget-amount");
var expenseAmount = document.getElementById("expense-amount");
var balanceAmount = document.getElementById("balance-amount");

var feedback = document.querySelector(".budget-feedback");
var expenseFeedback = document.querySelector(".expense-feedback");
var budgetForm = document.getElementById("budget-form");
var expenseForm = document.getElementById("expense-form");

// ADD BALANCE FORM
function addBalance(e) {
    e.preventDefault();
    if (budgetInput.value === "" || budgetInput.value < 0) {
        feedback.style.display = "block";
        feedback.innerHTML = "Value Cannot be empty";
    } else {
        budgetAmount.innerHTML = parseInt(budgetInput.value);
        balanceAmount.innerHTML = parseInt(budgetInput.value) - parseInt(expenseAmount.innerText);
    }
    budgetForm.reset();

};
budgetForm.addEventListener("submit", addBalance);






// ALERT VALUE HIDE ON CLICK
document.addEventListener("click", function () {
    feedback.style.display = "none";
    expenseFeedback.style.display = "none";
});

// CREATE TABLE
var list = document.querySelector(".list");
var table = document.createElement("table");
table.classList.add("table");
list.appendChild(table);
var tbody = document.createElement("tbody");
var tbody2 = document.createElement("tbody");
tbody.classList.add("w-100");
tbody.classList.add("pl-5");
table.appendChild(tbody);
tbody.innerHTML += `<tr><th> Expense Title</th>
<th class="pl-5 w-100">Expense Value</th><th></th></tr>`;
tbody.style.display = "none";

// ADD EXPENSE FORM
function addExpense(e) {
    e.preventDefault();
    if (expenseInput.value === "" || amountInput.value === "") {
        expenseFeedback.style.display = "block";
        expenseFeedback.innerHTML = "Value Cannot be empty";
    } else {
        expenseAmount.innerHTML = parseInt(amountInput.value) + parseInt(expenseAmount.innerText);
        balanceAmount.innerHTML = parseInt(budgetAmount.innerText) - parseInt(expenseAmount.innerText);
        tbody.innerHTML += `<tr class="text-danger font-weight-bold"><td>` + expenseInput.value + `</td> <td>` + amountInput.value + `</td>
        <td><i class="far fa-edit edit-icon"></i></td>
        <td><i class="far fa-trash-alt delete-icon"></i></td></tr>`;
        tbody.style.display = "block";
        expenseForm.reset();
        // DELETE BUTTON
        var deleteB = document.querySelectorAll('.delete-icon');
        function deleteIcon(e) {
            var deleteButton = e.currentTarget;
            var row = deleteButton.parentNode.parentNode;
            var value1 = row.getElementsByTagName('td')[1];
            var rowCount = table.rows.length;
            expenseAmount.innerHTML = parseInt(expenseAmount.innerText) - parseInt(value1.innerText);
            balanceAmount.innerHTML = parseInt(budgetAmount.innerText) - parseInt(expenseAmount.innerText);
            row.parentNode.removeChild(row);
            if (rowCount === 2) {
                console.log(e);
                tbody.style.display = "none";
            }
        }
        deleteB.forEach(function (element) {
            element.addEventListener('click', deleteIcon);
        });
        // EDIT BUTTON
        var edit = document.querySelectorAll('.edit-icon');
        function editIcon(e) {
            var editButton = e.currentTarget;
            var rowEdit = editButton.parentNode.parentNode;
            var value1 = rowEdit.getElementsByTagName('td')[0];
            var value2 = rowEdit.getElementsByTagName('td')[1];
            var rowCount = table.rows.length;
            amountInput.value = value2.innerText;
            expenseInput.value = value1.innerText;
            expenseAmount.innerHTML = parseInt(expenseAmount.innerText) - parseInt(value2.innerText);
            balanceAmount.innerHTML = parseInt(budgetAmount.innerText) - parseInt(expenseAmount.innerText);
            rowEdit.parentNode.removeChild(rowEdit);
            if (rowCount === 2) {
                console.log(e);
                tbody.style.display = "none";
            }
        }
        edit.forEach(function (element) {
            element.addEventListener('click', editIcon);
        });

    }
};

expenseForm.addEventListener("submit", addExpense);




