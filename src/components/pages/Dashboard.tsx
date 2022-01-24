import { useEffect, useState } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
import VolumeChart from "../ui/VolumeChart";
import { LineChart } from "../ui/LineChart";
interface completedTypes {
  date: Date;
  completed: boolean[];
  name: string;
  reps: number;
  sets: number[];
  weight: number;
}

interface transformedInterface {
  // date: string[];
  volume: number[];
  // completed: number[];
  // totalReps: number;
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
    <div className="my-12 max-w-md text-2xl mx-auto">
      <h1 className="text-center">Your Last 5 Workouts</h1>
      {dataTransformed && labels && (
        <VolumeChart volume={dataTransformed.volume} labels={labels} />
      )}
      <h1 className="text-center">Total Volume of Your Last 5 Workouts</h1>
      {dataTransformed && labels && (
        <LineChart volume={dataTransformed.volume} labels={labels} />
      )}
    </div>
  );
};

export default Dashboard;

//if an exercise was completed, adds the weight times reps to the total volume amount
function getChartStats(item: firebase.firestore.DocumentData[]) {
  const totalVolArr = item.map((item) => {
    let totalVolume: number = item.workout.reduce(
      (prev: number, cur: completedTypes) => {
        return getTotalVolume(prev, cur);
      },
      0
    );
    return totalVolume;
  });

  return { volume: totalVolArr };
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
