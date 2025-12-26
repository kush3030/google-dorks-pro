"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wand2, Plus, Trash2, Copy, ExternalLink } from "lucide-react";

interface DorkOperator {
  operator: string;
  value: string;
}

const operators = [
  { value: "site:", label: "site:", description: "Search within a specific website" },
  { value: "inurl:", label: "inurl:", description: "Find pages with keyword in URL" },
  { value: "intext:", label: "intext:", description: "Find pages with keyword in text" },
  { value: "intitle:", label: "intitle:", description: "Find pages with keyword in title" },
  { value: "filetype:", label: "filetype:", description: "Search for specific file types" },
  { value: "ext:", label: "ext:", description: "Search for file extensions" },
  { value: "cache:", label: "cache:", description: "View cached version of page" },
  { value: "link:", label: "link:", description: "Find pages linking to URL" },
  { value: "related:", label: "related:", description: "Find related websites" },
];

const commonFileTypes = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "txt", "log", "sql", "env", "config", "xml", "json"];
const commonKeywords = ["admin", "login", "password", "secret", "api", "key", "token", "config", "backup", "db"];

export function DorkBuilder() {
  const [parts, setParts] = useState<DorkOperator[]>([{ operator: "site:", value: "" }]);
  const [builtQuery, setBuiltQuery] = useState("");

  const addPart = () => {
    setParts([...parts, { operator: "site:", value: "" }]);
  };

  const removePart = (index: number) => {
    setParts(parts.filter((_, i) => i !== index));
  };

  const updatePart = (index: number, field: "operator" | "value", value: string) => {
    const newParts = [...parts];
    newParts[index][field] = value;
    setParts(newParts);
  };

  const buildQuery = () => {
    const query = parts
      .filter((part) => part.value.trim())
      .map((part) => `${part.operator}${part.value}`)
      .join(" ");
    setBuiltQuery(query);
  };

  const copyQuery = () => {
    navigator.clipboard.writeText(builtQuery);
  };

  const openInGoogle = () => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(builtQuery)}`;
    window.open(url, "_blank");
  };

  const addQuickTemplate = (template: string) => {
    setBuiltQuery(template);
  };

  return (
    <Card className="border-slate-700 bg-slate-900">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-cyan-400" />
          <CardTitle className="text-slate-50">Custom Dork Builder</CardTitle>
        </div>
        <CardDescription className="text-slate-400">
          Build your own Google dork queries with our interactive builder
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800 border border-slate-700">
            <TabsTrigger value="builder" className="data-[state=active]:bg-slate-900 data-[state=active]:border data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-400">Visual Builder</TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-slate-900 data-[state=active]:border data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-400">Quick Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-4">
            <div className="space-y-3">
              {parts.map((part, index) => (
                <div key={index} className="flex gap-2">
                  <Select
                    value={part.operator}
                    onValueChange={(value) => updatePart(index, "operator", value)}
                  >
                    <SelectTrigger className="w-[150px] border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {operators.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Value..."
                    value={part.value}
                    onChange={(e) => updatePart(index, "value", e.target.value)}
                    className="flex-1 border-slate-700"
                  />

                  {parts.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePart(index)}
                      className="hover:bg-slate-800"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={addPart} variant="outline" className="gap-2 border-slate-700 text-slate-300 hover:bg-slate-800">
                <Plus className="h-4 w-4" />
                Add Operator
              </Button>
              <Button onClick={buildQuery} className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-white">
                <Wand2 className="h-4 w-4" />
                Build Query
              </Button>
            </div>

            {builtQuery && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-50">Generated Query:</p>
                <div className="rounded-md bg-slate-950 border border-slate-700 p-3 font-mono text-sm">
                  <code className="text-slate-50">{builtQuery}</code>
                </div>
                <div className="flex gap-2">
                  <Button onClick={copyQuery} variant="outline" size="sm" className="gap-2 border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                  <Button onClick={openInGoogle} size="sm" className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-white">
                    <ExternalLink className="h-3 w-3" />
                    Search on Google
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2 pt-4 border-t border-slate-700">
              <p className="text-sm font-medium text-slate-50">Quick Suggestions:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-slate-400 mb-1">File Types:</p>
                  <div className="flex flex-wrap gap-1">
                    {commonFileTypes.map((type) => (
                      <Badge
                        key={type}
                        variant="outline"
                        className="cursor-pointer border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={() => {
                          const newParts = [...parts];
                          const emptyIndex = newParts.findIndex((p) => !p.value);
                          if (emptyIndex !== -1) {
                            newParts[emptyIndex] = { operator: "ext:", value: type };
                            setParts(newParts);
                          }
                        }}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Keywords:</p>
                  <div className="flex flex-wrap gap-1">
                    {commonKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="cursor-pointer border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={() => {
                          const newParts = [...parts];
                          const emptyIndex = newParts.findIndex((p) => !p.value);
                          if (emptyIndex !== -1) {
                            newParts[emptyIndex] = { operator: "inurl:", value: keyword };
                            setParts(newParts);
                          }
                        }}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-3">
            <p className="text-sm text-slate-400">
              Click on any template to use it instantly
            </p>
            <div className="space-y-2">
              {[
                {
                  name: "Find Exposed Credentials",
                  query: 'site:{DOMAIN} ext:env "DB_PASSWORD" | "API_KEY"',
                },
                {
                  name: "Discover Login Pages",
                  query: "site:{DOMAIN} inurl:admin | inurl:login | inurl:signin",
                },
                {
                  name: "Search Config Files",
                  query: 'site:{DOMAIN} ext:xml | ext:conf | ext:config intext:"password"',
                },
                {
                  name: "Find SQL Files",
                  query: 'site:{DOMAIN} ext:sql intext:"INSERT INTO" | "CREATE TABLE"',
                },
                {
                  name: "Locate Backup Files",
                  query: "site:{DOMAIN} ext:bak | ext:backup | ext:old",
                },
              ].map((template) => (
                <Card
                  key={template.name}
                  className="cursor-pointer border-slate-700 bg-slate-900 hover:bg-slate-800 transition-colors"
                  onClick={() => addQuickTemplate(template.query)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm text-slate-50">{template.name}</CardTitle>
                    <CardDescription className="font-mono text-xs text-slate-400">
                      {template.query}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
