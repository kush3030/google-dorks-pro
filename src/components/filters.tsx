"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import { DorkCategory, Severity } from "@/types/dork";

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: DorkCategory[];
  onCategoryToggle: (category: DorkCategory) => void;
  selectedSeverities: Severity[];
  onSeverityToggle: (severity: Severity) => void;
  onClearFilters: () => void;
}

const categories: { value: DorkCategory; label: string }[] = [
  { value: "exposed-files", label: "Exposed Files" },
  { value: "vulnerabilities", label: "Vulnerabilities" },
  { value: "cloud-storage", label: "Cloud Storage" },
  { value: "authentication", label: "Authentication" },
  { value: "cms-platforms", label: "CMS Platforms" },
  { value: "sensitive-data", label: "Sensitive Data" },
  { value: "network-devices", label: "Network Devices" },
  { value: "databases", label: "Databases" },
];

const severities: { value: Severity; label: string; color: string }[] = [
  { value: "critical", label: "Critical", color: "bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30" },
  { value: "high", label: "High", color: "bg-orange-500/20 text-orange-400 border-orange-500/50 hover:bg-orange-500/30" },
  { value: "medium", label: "Medium", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/30" },
  { value: "low", label: "Low", color: "bg-blue-500/20 text-blue-400 border-blue-500/50 hover:bg-blue-500/30" },
  { value: "info", label: "Info", color: "bg-slate-500/20 text-slate-400 border-slate-500/50 hover:bg-slate-500/30" },
];

export function Filters({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  selectedSeverities,
  onSeverityToggle,
  onClearFilters,
}: FiltersProps) {
  const hasActiveFilters = selectedCategories.length > 0 || selectedSeverities.length > 0 || searchQuery.length > 0;

  return (
    <div className="space-y-3 rounded-lg border border-slate-700 bg-slate-900 p-3 sticky top-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Filter className="h-4 w-4 text-cyan-400" />
          <h3 className="font-semibold text-sm text-slate-50">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-7 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800">
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
        <Input
          type="text"
          placeholder="Search dorks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 h-9 text-sm border-slate-700 bg-slate-950 text-slate-200 placeholder:text-slate-500"
        />
      </div>

      <div className="space-y-3">
        <div>
          <p className="mb-1.5 text-xs font-medium text-slate-400">Severity</p>
          <div className="flex flex-wrap gap-1.5">
            {severities.map((severity) => (
              <Badge
                key={severity.value}
                variant={selectedSeverities.includes(severity.value) ? "default" : "outline"}
                className={`cursor-pointer border transition-colors text-xs px-2 py-0.5 ${
                  selectedSeverities.includes(severity.value)
                    ? severity.color
                    : "border-slate-600 text-slate-400 hover:bg-slate-800"
                }`}
                onClick={() => onSeverityToggle(severity.value)}
              >
                {severity.label}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium text-slate-400">Category</p>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <Badge
                key={category.value}
                variant={selectedCategories.includes(category.value) ? "default" : "outline"}
                className={`cursor-pointer transition-colors text-xs px-2 py-0.5 ${
                  selectedCategories.includes(category.value)
                    ? "bg-cyan-500/30 text-cyan-300 border-cyan-500/50 hover:bg-cyan-500/40"
                    : "border-slate-600 text-slate-400 hover:bg-slate-800"
                }`}
                onClick={() => onCategoryToggle(category.value)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
