document.getElementById("calculate-button").addEventListener("click", calculateInvestment);

function calculateInvestment() {
    let initialInvestment = parseFloat(document.getElementById("initial-investment").value);
    let annualContributions = parseFloat(document.getElementById("annual-contributions").value);
    let years = parseInt(document.getElementById("years").value);
    let interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
    let totalAmount = initialInvestment;
    let interestEarned = 0;

    for (let i = 1; i <= years; i++) {
        totalAmount += annualContributions;
        interestEarned += totalAmount * interestRate;
        totalAmount += interestEarned;
    }

    document.getElementById("total-amount").value = "Tsh " + totalAmount.toFixed(1);
    document.getElementById("interest-earned").value = "Tsh " + interestEarned.toFixed(1);
}