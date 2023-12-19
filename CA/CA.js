function checkBalance() {
    var debitInputs = document.querySelectorAll("#debinput input");
    var creditInputs = document.querySelectorAll("#credinput input");
    var debitTotal = 0;
    var creditTotal = 0;
    var balance;
  
    for (var i = 0; i < debitInputs.length; i++) {
        debitTotal += parseInt(debitInputs[i].value) || 0;
    }
  
    for (var i = 0; i < creditInputs.length; i++) {
        creditTotal += parseInt(creditInputs[i].value) || 0;
    }
  
    document.getElementById("debit-total").innerHTML = "DEBIT = " + debitTotal;
    document.getElementById("credit-total").innerHTML = "CREDIT = " + creditTotal;
    balance = debitTotal - creditTotal;
    document.getElementById("balance").innerHTML = "BALANCE = " + balance;
  }
  
  function ADD_ROW() {
    var tableBody = document.getElementById("table-body");
  
    var newRow = tableBody.insertRow();
  
    for (var i = 0; i < 8; i++) {
        var newCell = newRow.insertCell(i);
        newCell.innerHTML = "<input type='text'>";
    }
  }
  