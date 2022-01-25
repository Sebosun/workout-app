import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
      color: "#FF0000",
      labels: {
        fontSize: "50px",
      },
    },
    title: {
      display: false,
      text: "Volume of your last 3 workouts",
      labels: {
        fontColor: "#fff",
        color: "#FF0000",
      },
    },
  },
};

// export const barData = {
//   labels,
//   datasets: [
//     {
//       label: "Total workout volume",
//       data: [10, 250, 350],
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//   ],
// };

interface props {
  volume: number[];
  labels: string[];
  hover: string;
}

export default function BarChart({ labels, volume, hover }: props) {
  const barData = {
    labels,
    datasets: [
      {
        label: hover,
        data: volume,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
        ],
        fontColor: "#FF0000",
        strokeColor: "rgba(51, 51, 51, 1)",

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        scaleFontColor: "#FF0000",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        color: "#FF0000",
        position: "top" as const,
      },
      title: {
        display: false,
        text: hover,
      },
    },

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
  };

  return <Bar options={options} data={barData} />;
}
