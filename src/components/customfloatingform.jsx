import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/custom-sheet";
import Spinner from "./Spinner";
import axios from "axios";

export function FloatingForm() {
  const [expense, setExpense] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    axios
      .post(
        "https://budgetbuddy-u7zf.onrender.com" + "/expense/createExpense",
        { expense },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Expense submitted successfully:", response.data);
        setExpense("");
        setSubmitting(false);
        // Close the sheet on successful submission
        // You can use your own method to close the sheet
        // For demonstration purpose, let's set a state to indicate the sheet should be closed
        // setSheetClosed(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Internal server error. Please try again later.");
        setSubmitting(false);
      });
  };

  return (
    <div className="dark">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent className="dark">
          <SheetHeader>
            <SheetTitle>Add Expense</SheetTitle>
            <SheetDescription>
              Write down your expense in natural Language and the app will do
              the rest.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4 dark justify-center items-center">
              <div className="grid grid-cols-6 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Expense
                </Label>
                <Input
                  id="name"
                  className="col-span-10"
                  value={expense}
                  onChange={(e) => setExpense(e.target.value)}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <div className="flex justify-center">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Spinner width={24} height={24} stroke="#fff" />
                        <span className="ml-2">Submitting...</span>
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </div>
              </SheetClose>
            </SheetFooter>
          </form>
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
