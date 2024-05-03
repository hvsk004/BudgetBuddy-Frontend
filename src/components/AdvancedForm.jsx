import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";

const ExpenseForm = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [expense, setExpense] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const data = isAdvancedMode
      ? { description: expense, date, category, amount }
      : { expense };

    axios
      .post(
        isAdvancedMode
          ? "https://budgetbuddy-u7zf.onrender.com" + "/expense/newExpense"
          : "https://budgetbuddy-u7zf.onrender.com" + "/expense/createExpense",
        data,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Expense submitted successfully:", response.data);
        setExpense("");
        setDate("");
        setCategory("");
        setAmount("");
        setSubmitting(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Internal server error. Please try again later.");
        setSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <div className="text-red-500">{error}</div>}
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

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? (
          <>
            <Spinner width={24} height={24} stroke="#fff" />
            <span className="ml-2">Submitting...</span>
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default ExpenseForm;
