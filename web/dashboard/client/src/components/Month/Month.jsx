import React from "react";
import "./Month.css";
import { CChart } from "@coreui/react-chartjs";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Month = ({ type, data }) => {
  const d = Object.groupBy(
    data,
    (person) => months[Number.parseInt(person.dob.slice(5, 7)) - 1]
  );
  const sorted = months
    .map((m) => ({
      [m]: d[m],
      isUndefined: d[m] === undefined,
    }))
    .filter((e) => !e.isUndefined)
    .map((e) => {
      const { isUndefined, ...rest } = e;
      return rest;
    });

  return (
    <div className="month">
      <CChart
        type={type}
        data={{
          labels: sorted.map((e) => Object.keys(e)[0]),
          datasets: [
            {
              label: "Bar Graph For Gender",
              backgroundColor: "#f87979",
              data: sorted.map((e) => Object.values(e)[0].length),
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

export default Month;
