"use client";

import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/shared/languageswitcher";
import { useTranslation } from "react-i18next";
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

interface Example {
  id: number;
  user_id: number;
  title: string;
  code: string;
  created_at: string; // Keep as string if just storing the value from JSON
  updated_at: string;
}


export default function ExampleSelector({ onChange }: { onChange: (v: string) => void }) {
  const pathname = usePathname();
  const { t } = useTranslation("common");
  const [examples, setExamples] = useState([] as unknown as [Example]);
  const [selectedExample, setSelectedExample] = useState("");
  useEffect(() => {
    // TODO: Maybe we should add the API_URL as an env var 
    const fetch_data = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_URL}api/examples`)
      setExamples(await data.json());
    };
    const data = fetch_data();
  }, []);
  return (
    <div className="w-80">
      <Select onValueChange={(v) => {
        // console.log(onChange);
        const ex = examples.find(ex => ex.id.toString() === v); 
        // console.log(`ex=${ex.code}`);
        if (ex){
          onChange(ex.code);
        } else {
          console.error("invalid id")
        }
        setSelectedExample(v);
      }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("playground.box")} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Code Examples</SelectLabel>
            {examples.map((ex: Example) =>
              <SelectItem key={ex.id} value={ex.id.toString()}>{ex.title}</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* {selectedExample && (
        <p className="mt-3 text-sm text-gray-600">
          Selected: <span className="font-medium text-gray-900">{selectedExample}</span>
        </p>
      )} */}
    </div>
  );
}
