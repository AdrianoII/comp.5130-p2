"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExampleSelector() {
  const [selectedExample, setSelectedExample] = useState("");

  return (
    <div className="w-80">
      <Select onValueChange={setSelectedExample}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a coding example" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Coding Examples</SelectLabel>
            <SelectItem value="loops">Loops and Iterations</SelectItem>
            <SelectItem value="recursion">Recursion</SelectItem>
            <SelectItem value="sorting">Sorting Algorithms</SelectItem>
            <SelectItem value="searching">Searching Algorithms</SelectItem>
            <SelectItem value="data-structures">Data Structures</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedExample && (
        <p className="mt-3 text-sm text-gray-600">
          Selected: <span className="font-medium text-gray-900">{selectedExample}</span>
        </p>
      )}
    </div>
  );
}
