import { CChart } from "@coreui/react-chartjs";
import React from "react";
import "./Gender.css";
const Gender = ({ data, type, color }) => {
  const d = Object.groupBy(data, (person) => person.gender);

  return (
    <div className="gender">
      <CChart
        type={type}
        data={{
          labels: Object.keys(d),
          datasets: [
            {
              label: "Bar Graph For Gender",
              backgroundColor: color,
              data: Object.values(d).map((e) => e.length),
            },
          ],
        }}
        labels="gender"
        options={{
          plugins: {
            legend: {
              labels: {
                color: "black",
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
            y: {
              grid: {
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Gender;
