"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Heart, AlertCircle, Shield, Info } from "lucide-react";
import { Dork } from "@/types/dork";

interface DorkCardProps {
  dork: Dork;
  domains: string[];
  onToggleFavorite?: (dorkId: string) => void;
  isFavorite?: boolean;
}

const severityConfig = {
  critical: {
    color: "bg-red-500/20 text-red-400 border-red-500/50",
    icon: AlertCircle,
  },
  high: {
    color: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    icon: Shield,
  },
  medium: {
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    icon: Shield,
  },
  low: {
    color: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    icon: Info,
  },
  info: {
    color: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    icon: Info,
  },
};

export function DorkCard({ dork, domains, onToggleFavorite, isFavorite = false }: DorkCardProps) {
  const [copied, setCopied] = useState(false);

  const config = severityConfig[dork.severity];
  const SeverityIcon = config.icon;

  const generateQuery = (domain: string) => {
    return dork.query.replace(/{DOMAIN}/g, domain);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dork.query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInGoogle = (domain: string) => {
    const query = generateQuery(domain);
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="border-slate-700 bg-slate-900 hover:border-cyan-500/50 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-base text-slate-50">{dork.title}</CardTitle>
              <Badge className={`${config.color} border text-xs`}>
                <SeverityIcon className="h-3 w-3 mr-1" />
                {dork.severity}
              </Badge>
              {dork.platform && (
                <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                  {dork.platform}
                </Badge>
              )}
            </div>
            <CardDescription className="text-sm text-slate-400">
              {dork.description}
            </CardDescription>
          </div>

          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(dork.id)}
              className="shrink-0 h-8 w-8 hover:bg-slate-800"
            >
              <Heart
                className={`h-4 w-4 transition-all ${
                  isFavorite ? "fill-pink-500 text-pink-500" : "text-slate-500"
                }`}
              />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 font-mono text-xs break-all">
          <code className="text-cyan-300">{dork.query}</code>
        </div>

        {dork.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {dork.tags.slice(0, 5).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-1.5 py-0 border-slate-600 text-slate-400"
              >
                #{tag}
              </Badge>
            ))}
            {dork.tags.length > 5 && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-slate-600 text-slate-400">
                +{dork.tags.length - 5}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 px-3 text-xs border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-cyan-500"
          >
            <Copy className="h-3 w-3 mr-1.5" />
            {copied ? "Copied!" : "Copy"}
          </Button>

          {domains.length > 0 && (
            <div className="flex gap-2">
              {domains.slice(0, 1).map((domain) => (
                <Button
                  key={domain}
                  size="sm"
                  onClick={() => openInGoogle(domain)}
                  className="h-8 px-3 text-xs bg-cyan-500 hover:bg-cyan-600 text-slate-900 border-0 font-semibold"
                >
                  <ExternalLink className="h-3 w-3 mr-1.5" />
                  {domain.length > 12 ? domain.substring(0, 12) + '...' : domain}
                </Button>
              ))}
              {domains.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-2 text-xs border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  +{domains.length - 1}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
