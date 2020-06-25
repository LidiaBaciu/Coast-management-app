const data = {
  labels: ["Today", "Yesterday"],
  datasets: [
    {
      label: "",
      backgroundColor: "rgb(255, 99, 132)",
      borderWidth: 0,
      data: [],
    }
  ]
};

const data2 = {
  labels: data.labels,
  datasets: [
    {
      ...data.datasets[0],
      backgroundColor: "rgb(54, 162, 235)"
    }
  ]
};

const data3 = {
  labels: data.labels,
  datasets: [
    {
      label: "",
      backgroundColor: "rgb(153, 102, 255)",
      borderWidth: 0,
      data: [],
    }
  ]
};

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scaleBeginAtZero: true,
  scales: {
    xAxes: [
      {
        categoryPercentage: 0.8,
        barPercentage: 0.8,
        // barThickness: 5,
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          display: false
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ]
  }
};

const barSettings = {
  // height: 160,
};

export { data, data2, data3, barSettings, options };
