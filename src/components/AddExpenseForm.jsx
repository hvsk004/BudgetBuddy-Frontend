import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
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
import { useState } from "react";
import axios from "axios";

export function FloatingForm() {
  const [expense, setExpense] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading state to true when submitting
      const response = await axios.post(
        "https://budgetbuddy-u7zf.onrender.com" + "/expense/createExpense",
        { expense },
        {
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status === 201) {
        setMessage(response.data.message);
        // Wait for a moment to simulate showing the message before reloading
        window.location.reload();
      } else {
        setMessage("Failed to create expense");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
    } finally {
      setLoading(false); // Set loading state to false after submitting
    }
  };

  return (
    <div className="dark">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Expense
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent className="dark">
          <SheetHeader>
            <SheetTitle>Add Expense</SheetTitle>
            <SheetDescription>
              Write down your expense in natural Language and the app will do
              the rest.
            </SheetDescription>
          </SheetHeader>
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
                <Button type="submit" onClick={handleSubmit}>
                  Save changes
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
