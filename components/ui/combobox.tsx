"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange: (value: string) => void;
}

export const Combobox = ({ options, value, onChange }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log("Combobox options:", options);
    console.log("Initial value:", value);
  }, [options, value]);

  const handleSelect = (selectedValue: string) => {
    console.log("Selected option:", selectedValue);
    onChange(selectedValue === value ? "" : selectedValue);
    setOpen(false);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : "Select option..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <div>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
              >
                <span
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
