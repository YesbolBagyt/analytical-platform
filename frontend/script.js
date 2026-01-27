let chart;

async function loadData() {
  const field = document.getElementById("field").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  let url = `http://localhost:3000/api/measurements?field=${field}`;

  if (start && end) {
    url += `&start_date=${start}&end_date=${end}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  const labels = data.map(d => new Date(d.timestamp).toLocaleString());
  const values = data.map(d => d[field]);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: field,
        data: values
      }]
    }
  });

  loadMetrics(field);
}

async function loadMetrics(field) {
  const response = await fetch(
    `http://localhost:3000/api/measurements/metrics?field=${field}`
  );
  const metrics = await response.json();

  document.getElementById("metrics").innerHTML = `
    <p><strong>Average:</strong> ${metrics.avg.toFixed(2)}</p>
    <p><strong>Min:</strong> ${metrics.min}</p>
    <p><strong>Max:</strong> ${metrics.max}</p>
    <p><strong>Std Dev:</strong> ${metrics.stdDev.toFixed(2)}</p>
  `;
}
