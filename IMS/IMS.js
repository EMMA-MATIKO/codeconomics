
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addItem").addEventListener("click", function () {
    var itemName = prompt("Enter the item name:");
    var quantity = parseInt(prompt("Enter the quantity:"), 10);

    if (itemName && !isNaN(quantity) && quantity >= 0) {
      var table = document.getElementById("inventory-table");
      var row = table.insertRow();
      row.insertCell().innerHTML = itemName;
      row.insertCell().innerHTML = quantity;
      var actionsCell = row.insertCell();

      var updateButton = document.createElement("button");
      updateButton.innerHTML = "Update Quantity";
      updateButton.onclick = function () {
        var newQuantity = parseInt(prompt("Enter the new quantity:"), 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
          row.cells[1].innerHTML = newQuantity;
        }
      };
      actionsCell.appendChild(updateButton);

      var removeButton = document.createElement("button");
      removeButton.innerHTML = "Remove Item";
      removeButton.onclick = function () {
        if (confirm("Are you sure you want to remove this item?")) {
          table.deleteRow(row.rowIndex);
          updateChart(); 
        }
      };
      actionsCell.appendChild(removeButton);

      updateChart();
    }
  });

  
  function updateChart() {
    var tableRows = document.getElementById("inventory-table").rows;
    var itemNames = [];
    var quantities = [];

    
    for (var i = 1; i < tableRows.length; i++) {
      itemNames.push(tableRows[i].cells[0].innerHTML);
      quantities.push(parseInt(tableRows[i].cells[1].innerHTML, 10));
    }

    
    var ctx = document.getElementById("inventoryChart").getContext("2d");
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: itemNames,
        datasets: [{
          label: 'Quantity',
          data: quantities,
          backgroundColor: '#03a9f4' 
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  updateChart();
});
