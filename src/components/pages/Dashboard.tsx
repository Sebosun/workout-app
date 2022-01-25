import { useEffect, useState } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
import BarChart from "../ui/BarChart";
import { LineChart } from "../ui/LineChart";
import { workoutType } from "./User/CheckWorkoutTemplates";
import { workoutArray } from "../../store/slices/workout-slice";
interface completedTypes {
  date: Date;
  completed: boolean[];
  name: string;
  reps: number;
  sets: number[];
  weight: number;
}

interface transformedInterface {
  dates: string[];
  volume: number[];
  // completed: number[];
  totalReps: number[];
}

const Dashboard = () => {
  const [data, setData] = useState<firebase.firestore.DocumentData[]>();
  //volume as in amount not sound
  const [dataTransformed, setDataTransformed] =
    useState<transformedInterface>();
  const [labels, setLabels] = useState<any>();

  const getUserData = async () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const docRef = db
      .collection("user-data")
      .doc(user?.uid)
      .collection("completed-workouts")
      .orderBy("date", "desc")
      .limit(5);

    docRef.onSnapshot((querySnapshot) => {
      try {
        let data: firebase.firestore.DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data);
      } catch (err: any) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (data && !dataTransformed && !labels) {
    setDataTransformed(getChartStats(data));
    console.log(data);
    // will return [day]/[month]/[year] date format
    setLabels(
      data.map(
        (item) =>
          new Date(item.date.seconds * 1000).toLocaleString().split(",")[0]
      )
    );
  }

  return (
    <div className="max-w-md text-red-500 gap-8 mx-auto my-12 text-2xl">
      {dataTransformed && labels && (
        <>
          <h1 className="text-center my-4">Your Last 5 Workouts</h1>
          <h1 className="text-center my-4">Total Volume</h1>
          <LineChart volume={dataTransformed.volume} labels={labels} />
          <h1 className="text-center my-4">Total reps</h1>
          <BarChart
            volume={dataTransformed.totalReps}
            labels={labels}
            hover="Total Reps"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;

//if an exercise was completed, adds the weight times reps to the total volume amount
function getChartStats(data: firebase.firestore.DocumentData[]) {
  const totalVolArr = data.map((item) => {
    let totalVolume: number = item.workout.reduce(
      (prev: number, cur: completedTypes) => {
        return getTotalVolume(prev, cur);
      },
      0
    );
    return totalVolume;
  });

  const dates = data.map(
    (item) => new Date(item.date.seconds * 1000).toLocaleString().split(",")[0]
  );

  const totalReps = data.map(getTotalSets);
  const totalCompleted = data.map(getCompletedSets);

  console.log(totalReps);
  return { volume: totalVolArr, dates: dates, totalReps: totalReps };
}

function getCompletedSets(item: firebase.firestore.DocumentData) {
  return item.workout.reducej;
}

function getTotalSets(item: firebase.firestore.DocumentData) {
  return item.workout.reduce((prev: number, cur: completedTypes) => {
    var total: number = 0;
    for (let i = 0; i < cur.reps; i++) {
      if (cur.completed[i]) {
        total += cur.sets[i];
      }
    }
    return prev + total;
  }, 0);
}

function getTotalVolume(prev: number, cur: completedTypes) {
  var total: number = 0;
  for (let i = 0; i < cur.reps; i++) {
    if (cur.completed[i]) {
      total += cur.sets[i] * cur.weight;
    }
  }
  return prev + total;
}
