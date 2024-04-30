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

export function FloatingForm() {
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
          <div className="grid gap-4 py-4 dark justify-center items-center">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Expense
              </Label>
              <Input id="name" className="col-span-10" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <div className="flex justify-center">
                <Button type="submit">Save changes</Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
