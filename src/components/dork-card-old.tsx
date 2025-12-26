"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, ExternalLink, Heart, AlertCircle, Shield, Info } from "lucide-react";
import { Dork } from "@/types/dork";

interface DorkCardProps {
  dork: Dork;
  domains: string[];
  onToggleFavorite?: (dorkId: string) => void;
  isFavorite?: boolean;
}

const severityConfig = {
  critical: { color: "bg-red-500/10 text-red-500 border-red-500/20", icon: AlertCircle },
  high: { color: "bg-orange-500/10 text-orange-500 border-orange-500/20", icon: Shield },
  medium: { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: Shield },
  low: { color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Info },
  info: { color: "bg-gray-500/10 text-gray-500 border-gray-500/20", icon: Info },
};

export function DorkCard({ dork, domains, onToggleFavorite, isFavorite = false }: DorkCardProps) {
  const [copied, setCopied] = useState(false);

  const getSeverityConfig = (severity: Dork["severity"]) => severityConfig[severity];
  const config = getSeverityConfig(dork.severity);
  const SeverityIcon = config.icon;

  const generateQuery = (domain: string) => {
    return dork.query.replace(/{DOMAIN}/g, domain);
  };

  const copyToClipboard = (domain?: string) => {
    const query = domain ? generateQuery(domain) : dork.query;
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInGoogle = (domain: string) => {
    const query = generateQuery(domain);
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="group hover:shadow-md transition-shadow border-muted/40">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-base">{dork.title}</CardTitle>
              <Badge className={`${config.color} border text-xs`}>
                {dork.severity}
              </Badge>
              {dork.platform && (
                <Badge variant="outline" className="text-xs">
                  {dork.platform}
                </Badge>
              )}
            </div>
            <CardDescription className="text-sm mt-1">{dork.description}</CardDescription>
          </div>

          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(dork.id)}
              className="shrink-0 h-8 w-8"
            >
              <Heart
                className={`h-3.5 w-3.5 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-2">
        <div className="rounded bg-muted/50 px-2 py-1.5 font-mono text-xs break-all">
          <code className="text-muted-foreground">{dork.query}</code>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 flex-1">
            {dork.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                #{tag}
              </Badge>
            ))}
            {dork.tags.length > 4 && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                +{dork.tags.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex gap-1.5 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard()}
              className="h-7 px-2 text-xs"
            >
              <Copy className="h-3 w-3" />
            </Button>

            {domains.length > 0 && (
              <>
                {domains.slice(0, 1).map((domain) => (
                  <Button
                    key={domain}
                    variant="default"
                    size="sm"
                    onClick={() => openInGoogle(domain)}
                    className="h-7 px-2 text-xs gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {domain.length > 15 ? domain.substring(0, 15) + '...' : domain}
                  </Button>
                ))}
                {domains.length > 1 && (
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                    +{domains.length - 1}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
