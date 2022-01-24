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
import faker from "@faker-js/faker";

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
    },
    title: {
      display: false,
      text: "Volume of your last 3 workouts",
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
}

export default function VolumeChart({ labels, volume }: props) {
  const barData = {
    labels,
    datasets: [
      {
        label: "Total workout volume",
        data: volume,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
        ],
      },
    ],
  };
  return <Bar options={options} data={barData} />;
}
