"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Shield, Database, Cloud } from "lucide-react";

interface StatsProps {
  totalDorks: number;
  filteredCount: number;
  domains: number;
  favorites: number;
}

export function Stats({ totalDorks, filteredCount, domains, favorites }: StatsProps) {
  const stats = [
    {
      title: "Total Dorks",
      value: filteredCount,
      total: totalDorks,
      icon: Database,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
    },
    {
      title: "Target Domains",
      value: domains,
      icon: Target,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      title: "Favorites",
      value: favorites,
      icon: Shield,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      title: "Categories",
      value: 8,
      icon: Cloud,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="border-slate-700 bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">{stat.title}</CardTitle>
              <div className={`rounded-md p-2 ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-50">
                {stat.value}
                {stat.total && (
                  <span className="text-sm text-slate-400 ml-1">/ {stat.total}</span>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
