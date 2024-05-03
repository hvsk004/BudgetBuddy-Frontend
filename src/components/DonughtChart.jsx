import { PieChart, Pie, Sector, Cell } from "recharts";
import React, { useState, useEffect } from "react";
import axios from "axios";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DonughtChart() {
  const [pastSevenDays, setPastSevenDays] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          "https://budgetbuddy-u7zf.onrender.com" + "/expense/getExpenses",
          {
            withCredentials: true, // Include cookies in the request
          }
        );

        // Initialize an object to store daily totals for each category
        const dailyCategoryTotals = {
          food: 0,
          travel: 0,
          personalcare: 0,
          clothing: 0,
          other: 0,
        };

        let expenses = response.data.expenses;
        // Assume `expenses` is the array of expense objects returned from the API
        expenses.forEach((expense) => {
          // Convert the category to lower case
          const category = expense.category.toLowerCase();

          // Check if the category exists in the dailyCategoryTotals object
          if (category in dailyCategoryTotals) {
            // Add the expense amount to the total for that category
            dailyCategoryTotals[category] += expense.amount;
          } else {
            // If the category doesn't exist in the dailyCategoryTotals object, add the amount to 'other'
            dailyCategoryTotals["other"] += expense.amount;
          }
        });

        // Transform the dailyCategoryTotals object into an array of objects
        const dailyCategoryTotalsArray = Object.entries(
          dailyCategoryTotals
        ).map(([name, value]) => ({ name, value }));

        // Update the state with the new totals
        setPastSevenDays(dailyCategoryTotalsArray);
        console.log(pastSevenDays);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
  }, []);
  return (
    <div>
      <PieChart width={350} height={400} className="flex flex-col items-center">
        <Pie
          data={pastSevenDays}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {pastSevenDays.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div>
        {pastSevenDays.map((entry, index) => (
          <div key={index} className="flex items-center mb-2">
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: "10px",
              }}
            ></div>
            <div className="text-lg">{entry.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
