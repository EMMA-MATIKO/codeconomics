
var ppfData = [
    { x: 0, y: 850 },
    { x: 850, y: 0 },
  ];

  var svg = document.getElementById('ppf');

  var axes = document.createElementNS('http://www.w3.org/2000/svg', 'g');


  var xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  xAxis.setAttribute('x1', '50');
  xAxis.setAttribute('y1', '550');
  xAxis.setAttribute('x2', '750');
  xAxis.setAttribute('y2', '550');
  xAxis.setAttribute('stroke', 'aqua');
  axes.appendChild(xAxis);

  
  var yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  yAxis.setAttribute('x1', '50');
  yAxis.setAttribute('y1', '550');
  yAxis.setAttribute('x2', '50');
  yAxis.setAttribute('y2', '20');
  yAxis.setAttribute('stroke', 'aqua');
  axes.appendChild(yAxis);


  var goodALabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  goodALabel.setAttribute('class', 'label');
  goodALabel.setAttribute('x', '780');
  goodALabel.setAttribute('y', '600');
  goodALabel.setAttribute('text-anchor', 'end');
  goodALabel.textContent = 'GOOD A';
  axes.appendChild(goodALabel);


  var goodBLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  goodBLabel.setAttribute('class', 'label');
  goodBLabel.setAttribute('x', '80');
  goodBLabel.setAttribute('y', '10');
  goodBLabel.setAttribute('text-anchor', 'end');
  goodBLabel.textContent = 'GOOD B';
  axes.appendChild(goodBLabel);

  svg.appendChild(axes);

  function drawCurve() {
    var quantityA = parseInt(document.getElementById('quantity-a').value);
    var quantityB = parseInt(document.getElementById('quantity-b').value);

    if (isNaN(quantityA) || isNaN(quantityB)) {
      alert('PLEASE ENTER VALID QUANTITIES!');
      return;
    }

    if (quantityA > 1000 || quantityB > 1000) {
      alert('VALUES CANNOT EXCEED 1000.');
      return;
    }

    var scaleFactorX = (750 - 50) / 1000;
    var scaleFactorY = (550 - 20) / 1000;

    
    axes.appendChild(xAxis);
    axes.appendChild(yAxis);
    axes.appendChild(goodALabel);
    axes.appendChild(goodBLabel);

    
    var gridLinesX = document.querySelectorAll('.grid-line-x');
    var gridLinesY = document.querySelectorAll('.grid-line-y');

    gridLinesX.forEach(function (line) {
      line.style.display = 'block';
    });

    gridLinesY.forEach(function (line) {
      line.style.display = 'block';
    });

    
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var pathPoints = [];

    for (var i = 0; i < ppfData.length; i++) {
      var x = 50 + (ppfData[i].x * scaleFactorX);
      var y = 550 - (ppfData[i].y * scaleFactorY);
      pathPoints.push(x + ',' + y);
    }

    var curve = 'M' + pathPoints.join(' L');

    path.setAttribute('d', curve);
    path.setAttribute('stroke', 'aqua');
    path.setAttribute('fill', 'none');
    axes.appendChild(path);

    
    for (var j = 0; j <= 1000; j += 50) {
      var tickX = 50 + (j * scaleFactorX);
      var tickY = 550 - (j * scaleFactorY);

      var tickMarkX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tickMarkX.setAttribute('x1', tickX);
      tickMarkX.setAttribute('y1', '550');
      tickMarkX.setAttribute('x2', tickX);
      tickMarkX.setAttribute('y2', '560');
      tickMarkX.setAttribute('stroke', 'aqua');
      axes.appendChild(tickMarkX);

      var tickMarkY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tickMarkY.setAttribute('x1', '50');
      tickMarkY.setAttribute('y1', tickY);
      tickMarkY.setAttribute('x2', '40');
      tickMarkY.setAttribute('y2', tickY);
      tickMarkY.setAttribute('stroke', 'aqua');
      axes.appendChild(tickMarkY);

      var tickLabelX = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tickLabelX.setAttribute('class', 'label');
      tickLabelX.setAttribute('x', tickX);
      tickLabelX.setAttribute('y', '580');
      tickLabelX.setAttribute('text-anchor', 'middle');
      tickLabelX.textContent = j.toString();
      axes.appendChild(tickLabelX);

      var tickLabelY = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tickLabelY.setAttribute('class', 'label');
      tickLabelY.setAttribute('x', '30');
      tickLabelY.setAttribute('y', tickY + 5);
      tickLabelY.setAttribute('text-anchor', 'end');
      tickLabelY.textContent = j.toString();
      axes.appendChild(tickLabelY);
    }

    
    var dotX = 50 + (quantityA * scaleFactorX);
    var dotY = 550 - (quantityB * scaleFactorY);

    var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', dotX);
    dot.setAttribute('cy', dotY);
    dot.setAttribute('r', '5');
    var dotColor = getDotColor(quantityA, quantityB);
    dot.setAttribute('fill', dotColor);
    axes.appendChild(dot);

    
    setInterval(function () {
      if (dot.getAttribute('r') === '5') {
        dot.setAttribute('r', '6');
      } else {
        dot.setAttribute('r', '5');
      }
    }, 1000);

    
    var intersectionLineX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    intersectionLineX.setAttribute('x1', dotX);
    intersectionLineX.setAttribute('y1', dotY);
    intersectionLineX.setAttribute('x2', dotX);
    intersectionLineX.setAttribute('y2', '550');
    intersectionLineX.setAttribute('stroke', 'white');
    intersectionLineX.setAttribute('stroke-dasharray', '5, 5');
    axes.appendChild(intersectionLineX);

    var intersectionLineY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    intersectionLineY.setAttribute('x1', dotX);
    intersectionLineY.setAttribute('y1', dotY);
    intersectionLineY.setAttribute('x2', '50');
    intersectionLineY.setAttribute('y2', dotY);
    intersectionLineY.setAttribute('stroke', 'white');
    intersectionLineY.setAttribute('stroke-dasharray', '5, 5');
    axes.appendChild(intersectionLineY);
  }

  
  function getDotColor(quantityA, quantityB) {
    var scaleFactorX = (750 - 50) / 1000;
    var scaleFactorY = (550 - 20) / 1000;
    var scaledQuantityA = 50 + (quantityA * scaleFactorX);
    var scaledQuantityB = 550 - (quantityB * scaleFactorY);

  
    for (var i = 0; i < ppfData.length - 1; i++) {
      var x1 = 50 + (ppfData[i].x * scaleFactorX);
      var y1 = 550 - (ppfData[i].y * scaleFactorY);
      var x2 = 50 + (ppfData[i + 1].x * scaleFactorX);
      var y2 = 550 - (ppfData[i + 1].y * scaleFactorY);

  
      var ppfSlope = (y2 - y1) / (x2 - x1);
      var ppfYIntercept = y1 - ppfSlope * x1;

  
      var expectedQuantityB = ppfSlope * scaledQuantityA + ppfYIntercept;

      if (scaledQuantityB === expectedQuantityB) {
        return 'aqua'; 
      }

      if (scaledQuantityB < expectedQuantityB) {
        return 'red';
      }
    }

    
    return 'blue';
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      drawCurve();
    }
  });
  