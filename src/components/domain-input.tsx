"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface DomainInputProps {
  domains: string[];
  onDomainsChange: (domains: string[]) => void;
}

export function DomainInput({ domains, onDomainsChange }: DomainInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addDomain = () => {
    if (inputValue.trim()) {
      const newDomains = inputValue
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d && !domains.includes(d));

      if (newDomains.length > 0) {
        onDomainsChange([...domains, ...newDomains]);
        setInputValue("");
      }
    }
  };

  const removeDomain = (domain: string) => {
    onDomainsChange(domains.filter((d) => d !== domain));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addDomain();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter target domain(s), e.g., example.com, test.com..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border-slate-700 bg-slate-950 text-slate-200 placeholder:text-slate-500 focus:border-cyan-500"
        />
        <Button onClick={addDomain} size="icon" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {domains.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {domains.map((domain) => (
            <Badge
              key={domain}
              className="pl-3 pr-2 py-1.5 text-sm bg-slate-800 text-slate-200 border border-slate-600 hover:bg-slate-700"
            >
              {domain}
              <button
                onClick={() => removeDomain(domain)}
                className="ml-2 text-slate-400 hover:text-red-400"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDomainsChange([])}
            className="text-slate-400 hover:text-red-400 hover:bg-slate-800"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
