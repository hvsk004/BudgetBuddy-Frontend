import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarGraph() {
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

        // Initialize an object to store daily totals
        const dailyTotals = {};

        // Iterate through expenses and accumulate totals for each day
        response.data.expenses.forEach((expense) => {
          const expenseDate = new Date(expense.date);
          const dayOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][expenseDate.getDay()];
          if (!dailyTotals[dayOfWeek]) {
            dailyTotals[dayOfWeek] = 0;
          }
          dailyTotals[dayOfWeek] += expense.amount;
        });

        // Create an array of objects with total and name of the day for the last 7 days
        const today = new Date();
        const SevenDays = [];
        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(today);
          currentDate.setDate(currentDate.getDate() - i);
          const dayOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][currentDate.getDay()];
          const total = dailyTotals[dayOfWeek] || 0;
          SevenDays.unshift({ name: dayOfWeek, total }); // Add daily total to the beginning of the array
        }
        setPastSevenDays(SevenDays);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <ResponsiveContainer height={500} width="100%">
      <BarChart
        data={pastSevenDays}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
