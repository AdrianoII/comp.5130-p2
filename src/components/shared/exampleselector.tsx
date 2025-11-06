"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeSnippetData {
  id: number;
  user_id: number;
  title: string;
  code: string;
  created_at: string; // Keep as string if just storing the value from JSON
  updated_at: string;
}


export default function ExampleSelector({ onChange }: { onChange: (v: string) => void }) {
  const [examples, setExamples] = useState([]);
  const [selectedExample, setSelectedExample] = useState("");
  useEffect(() => {
    // TODO: Maybe we should add the API_URL as an env var 
    const fetch_data = async () => {
      const data = await fetch("https://comp-5130-p2.vercel.app/api/examples")
      setExamples(await data.json());
    };
    const data = fetch_data();
  }, []);
  return (
    <div className="w-80">
      <Select onValueChange={(v) => {
        // console.log(onChange);
        onChange(v);
        setSelectedExample(v);
      }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a coding example" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Coding Examples</SelectLabel>
            {examples.map((ex: CodeSnippetData) =>
              <SelectItem key={ex.id} value={ex.id.toString()}>{ex.title}</SelectItem>
            )}
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
