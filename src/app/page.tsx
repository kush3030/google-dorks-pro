"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/header";
import { DomainInput } from "@/components/domain-input";
import { Filters } from "@/components/filters";
import { Stats } from "@/components/stats";
import { DorkCard } from "@/components/dork-card";
import { DorkBuilder } from "@/components/dork-builder";
import { dorks } from "@/data/dorks";
import { DorkCategory, Severity } from "@/types/dork";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const [domains, setDomains] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<DorkCategory[]>([]);
  const [selectedSeverities, setSelectedSeverities] = useState<Severity[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (dorkId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(dorkId)) {
      newFavorites.delete(dorkId);
    } else {
      newFavorites.add(dorkId);
    }
    setFavorites(newFavorites);
  };

  const toggleCategory = (category: DorkCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSeverity = (severity: Severity) => {
    setSelectedSeverities((prev) =>
      prev.includes(severity)
        ? prev.filter((s) => s !== severity)
        : [...prev, severity]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedSeverities([]);
  };

  const filteredDorks = useMemo(() => {
    return dorks.filter((dork) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          dork.title.toLowerCase().includes(query) ||
          dork.description.toLowerCase().includes(query) ||
          dork.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          dork.category.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      if (selectedCategories.length > 0 && !selectedCategories.includes(dork.category)) {
        return false;
      }

      if (selectedSeverities.length > 0 && !selectedSeverities.includes(dork.severity)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedSeverities]);

  const favoriteDorks = useMemo(() => {
    return dorks.filter((dork) => favorites.has(dork.id));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="container max-w-7xl py-8 space-y-6">
        {/* Hero Section - ReconPro Style */}
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 sm:p-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">
                DorkGenius | Advanced Google Dorking Toolkit
              </h1>
              <p className="text-sm text-slate-400 max-w-3xl">
                <span className="font-semibold text-cyan-400">{dorks.length}+ professional Google dorks</span> for security research, penetration testing, and bug bounty hunting. Find exposed files, misconfigurations, and security weaknesses.
              </p>
            </div>
            <DomainInput domains={domains} onDomainsChange={setDomains} />

            {/* Preset Scan Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategories(['cms-platforms']);
                  setSearchQuery('wordpress');
                }}
                className="px-4 py-2 rounded-md border border-slate-600 bg-slate-800 text-slate-200 text-sm font-medium hover:bg-slate-700 hover:border-cyan-500 transition-all"
              >
                ⚡ WordPress Scan
              </button>
              <button
                onClick={() => {
                  setSelectedSeverities(['critical', 'high']);
                  setSearchQuery('sql');
                }}
                className="px-4 py-2 rounded-md border border-slate-600 bg-slate-800 text-slate-200 text-sm font-medium hover:bg-slate-700 hover:border-cyan-500 transition-all"
              >
                ⚡ SQLi Checks
              </button>
              <button
                onClick={() => {
                  setSearchQuery('subdomain');
                }}
                className="px-4 py-2 rounded-md border border-slate-600 bg-slate-800 text-slate-200 text-sm font-medium hover:bg-slate-700 hover:border-cyan-500 transition-all"
              >
                ⚡ Subdomains
              </button>
            </div>
          </div>
        </div>

        {/* Stats with Glass Effect */}
        <Stats
          totalDorks={dorks.length}
          filteredCount={filteredDorks.length}
          domains={domains.length}
          favorites={favorites.size}
        />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <Filters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategories={selectedCategories}
              onCategoryToggle={toggleCategory}
              selectedSeverities={selectedSeverities}
              onSeverityToggle={toggleSeverity}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-slate-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-slate-900 data-[state=active]:border data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-400">
                  All ({filteredDorks.length})
                </TabsTrigger>
                <TabsTrigger value="favorites" className="data-[state=active]:bg-slate-900 data-[state=active]:border data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-400">
                  Favorites ({favorites.size})
                </TabsTrigger>
                <TabsTrigger value="builder" className="data-[state=active]:bg-slate-900 data-[state=active]:border data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-400">
                  Builder
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                {filteredDorks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center rounded-lg border border-slate-700 bg-slate-900">
                    <AlertCircle className="h-12 w-12 text-slate-500 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">No dorks found</h3>
                    <p className="text-slate-400">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-[calc(100vh-450px)]">
                    <div className="space-y-4 pr-4">
                      {filteredDorks.map((dork) => (
                        <DorkCard
                          key={dork.id}
                          dork={dork}
                          domains={domains}
                          onToggleFavorite={toggleFavorite}
                          isFavorite={favorites.has(dork.id)}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </TabsContent>

              <TabsContent value="favorites" className="mt-6">
                {favoriteDorks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center rounded-lg border border-slate-700 bg-slate-900">
                    <AlertCircle className="h-12 w-12 text-slate-500 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">No favorites yet</h3>
                    <p className="text-slate-400">
                      Click the heart icon on dorks to save them
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-[calc(100vh-450px)]">
                    <div className="space-y-4 pr-4">
                      {favoriteDorks.map((dork) => (
                        <DorkCard
                          key={dork.id}
                          dork={dork}
                          domains={domains}
                          onToggleFavorite={toggleFavorite}
                          isFavorite={true}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </TabsContent>

              <TabsContent value="builder" className="mt-6">
                <DorkBuilder />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-8 bg-slate-950">
        <div className="container text-center">
          <p className="text-sm text-slate-500">
            Use responsibly on authorized targets only • Built with ❤️ for the security community
          </p>
        </div>
      </footer>
    </div>
  );
}
