import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import axios from "axios";

const ExpenseForm = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [expense, setExpense] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAdvancedMode) {
      // Handle advanced mode form submission
      axios
        .post(
          "http://localhost:3000/expense/newExpense",
          {
            description: expense,
            date,
            category,
            amount,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Expense submitted successfully:", response.data);
          // Handle success response
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error
        });
    } else {
      // Default mode, send data to localhost:3000/expense/createExpense
      axios
        .post(
          "http://localhost:3000/expense/createExpense",
          {
            expense,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Expense submitted successfully:", response.data);
          // Handle success response
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="expense">Expense</Label>
        <Switch
          id="advanced-mode"
          checked={isAdvancedMode}
          onCheckedChange={() => setIsAdvancedMode(!isAdvancedMode)}
        />
      </div>
      <Input
        id="desc"
        placeholder="Enter expense"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />

      {isAdvancedMode && (
        <>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            id="category"
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </>
      )}

      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
