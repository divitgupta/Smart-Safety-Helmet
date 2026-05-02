let gasChart, tempChart, humidityChart;

function createChart(ctx, label, color) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: label,
        data: [],
        borderColor: color,
        fill: false,
        tension: 0.2
      }]
    },
    options: {
      scales: {
        x: { display: false },
        y: { beginAtZero: true }
      }
    }
  });
}

function updateChart(chart, value) {
  const now = new Date().toLocaleTimeString();
  chart.data.labels.push(now);
  chart.data.datasets[0].data.push(value);
  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
}

async function fetchData() {
  try {
    const res = await fetch('/data');
    const data = await res.json();

    document.getElementById("gforce").textContent = `${data.acceleration.toFixed(2)} g`;
    document.getElementById("temperature").textContent = `${data.temperature.toFixed(1)}°C`;
    document.getElementById("humidity").textContent = `${data.humidity.toFixed(1)}%`;
    document.getElementById("gas").textContent = `${data.gas} ppm`;

    document.querySelector(".helmet-status p").textContent =
      data.helmet === "WORN"
        ? "Worn — Helmet is securely on the user's head."
        : "Not Worn — Please wear the helmet!";
    document.querySelector(".helmet-status p").style.color =
      data.helmet === "WORN" ? "#00e676" : "#ff5252";

    document.getElementById("alertBox").style.display =
      (data.acceleration > 2.5 || data.gas > 500 || data.temperature > 50)
        ? "block" : "none";

    updateChart(gasChart, data.gas);
    updateChart(tempChart, data.temperature);
    updateChart(humidityChart, data.humidity);
  } catch (err) {
    document.getElementById("alertBox").style.display = "block";
    console.error("Failed to fetch data", err);
  }
}

window.onload = function () {
  gasChart = createChart(document.getElementById('gasChart'), 'Gas (ppm)', '#ff9800');
  tempChart = createChart(document.getElementById('tempChart'), 'Temp (°C)', '#f44336');
  humidityChart = createChart(document.getElementById('humidityChart'), 'Humidity (%)', '#2196f3');

  fetchData();
  setInterval(fetchData, 1000);
}
