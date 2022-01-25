import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    yAxes: {
      grid: {
        display: false,
        drawBorder: true,
        color: "#FFFFFF",
      },
      ticks: {
        beginAtZero: true,
        color: "white",
        fontSize: 12,
      },
    },
    xAxes: {
      grid: {
        display: false,
        color: "#FFFFFF",
      },
      ticks: {
        beginAtZero: true,
        color: "white",
        fontSize: 12,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
  },
};

interface props {
  volume: number[];
  labels: string[];
}

export function LineChart({ volume, labels }: props) {
  const data = {
    labels,
    datasets: [
      {
        label: "Volume",
        data: volume,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
