document.getElementById("mggForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calculatePayment();
});

function calculatePayment() {
    var principal = parseFloat(document.getElementById("principal").value);
    var interest = parseFloat(document.getElementById("interest").value) / 100 / 12;
    var term = parseFloat(document.getElementById("term").value) * 12;

    var monthlyPayment = (principal * interest * Math.pow(1 + interest, term)) / (Math.pow(1 + interest, term) - 1);
    monthlyPayment = monthlyPayment.toFixed(2);

    alert("Your estimated monthly mgg payment is: Tsh " + monthlyPayment);
}