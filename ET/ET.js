const addExpenseBtn = document.getElementById("addExpense");
const calculateTotalBtn = document.getElementById("calculateTotal");
const clearTableBtn = document.getElementById("clearTable");
const expenseForm = document.getElementById("expense-form");
const table = document.getElementById("expense-table");

addExpenseBtn.addEventListener("click", function() {
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (description && date && !isNaN(amount)) {
    const row = table.insertRow();
    row.insertCell().innerHTML = description;
    row.insertCell().innerHTML = date;
    row.insertCell().innerHTML = amount.toFixed(2);

    const deleteCell = row.insertCell();
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function() {
      table.deleteRow(row.rowIndex);
    });
    deleteCell.appendChild(deleteBtn);

    expenseForm.reset();
  } else {
    alert("PLEASE ENTER VALID VALUES FOR ALL INPUT FIELDS!");
  }
});

calculateTotalBtn.addEventListener("click", function() {
  let total = 0;
  for (let i = 0; i < table.rows.length; i++) {
    total += parseFloat(table.rows[i].cells[2].innerHTML);
  }
  document.getElementById("total").innerHTML = "Total: Tsh" + total.toFixed(2);
});

clearTableBtn.addEventListener("click", function() {
  if (confirm("Are you sure you want to clear the table?")) {
    table.innerHTML = "";
    document.getElementById("total").innerHTML = "";
  }
});