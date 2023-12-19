const ctx = document.getElementById('expenditure-chart').getContext('2d');
let expenditureChart;

function calculateExpenditure() {
    const initialCapital = parseFloat(document.getElementById('initial-capital').value);
    const ricePrice = parseFloat(document.getElementById('rice-price').value);
    const numConsumers = parseInt(document.getElementById('num-consumers').value);

    if (isNaN(initialCapital) || isNaN(ricePrice) || isNaN(numConsumers)) {
        alert('Please enter valid values!');
        return;
    }

    const expenditureData = [];
    let capital = initialCapital;

    for (let i = 1; i <= numConsumers; i++) {
        const expenditure = ricePrice * i;
        expenditureData.push({ x: i, y: expenditure });
        capital -= expenditure;
        if (capital < 0) {
            alert('INSUFFICIENT CAPITAL, STOP INVESTING. (Data will be plotted for sufficient quantity)!');
            break;
        }
    }

    if (!expenditureChart) {
        // Create a gradient for the bars
        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(1, 'blue');
        gradient.addColorStop(0, 'aqua');

        expenditureChart = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'EXPENDITURE @TIME',
                    data: expenditureData,
                    backgroundColor: gradient,
                    borderColor: gradient, // Border color can also be set to the gradient
                    borderWidth: 0.5, // Set border width to 1 for better visibility
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'EXPENDITURE (Tsh)'
                        }
                    }
                }
            }
        });
    } else {
        expenditureChart.data.datasets[0].data = expenditureData;
        expenditureChart.update();
    }
}