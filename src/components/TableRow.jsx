import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  LineChart,
  MoreHorizontal,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ReceiptIndianRupee,
  BadgeIndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import axios from "axios"; // Assuming axios is installed in your project

export default function TableRowCustom(props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Use props.eId directly in the request
      await axios.put(
        "https://budgetbuddy-u7zf.onrender.com" + "/expense/deleteExpense",
        { eId: props.eId }, // Include eId in the request body
        {
          withCredentials: true,
        }
      );
      // If the delete request is successful, you may want to trigger a reload of the data or update the UI accordingly
      console.log("Expense deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting expense:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{props.description}</TableCell>
      <TableCell>
        <Badge variant="outline">{props.category}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{props.amount}</TableCell>
      <TableCell className="hidden md:table-cell">{props.date}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
