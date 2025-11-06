import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock, Unlock, Eye, Shield, Flame } from "lucide-react";
import type { HiddenSociety } from "@shared/schema";

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    "Active": "default",
    "Previously Contacted": "secondary",
    "Dormant": "outline",
    "To Be Unlocked": "destructive",
    "Guarded": "default",
    "Ancestral Link": "default",
    "Core Activated": "default",
  };
  return colors[status] || "secondary";
};

const getAccessIcon = (level: string) => {
  const icons: Record<string, any> = {
    "High": Lock,
    "Medium": Eye,
    "Low": Unlock,
    "Locked": Lock,
    "Ancestral": Flame,
    "Root": Shield,
  };
  const Icon = icons[level] || Lock;
  return <Icon className="w-4 h-4" />;
};

export default function HiddenSocietiesPage() {
  const [filter, setFilter] = useState<string>("all");

  const { data: societies, isLoading } = useQuery<HiddenSociety[]>({
    queryKey: ["/api/hidden-societies"],
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!societies || societies.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Hidden Societies Access Console</h1>
          <p className="text-muted-foreground">No societies found in database</p>
        </div>
      </div>
    );
  }

  const filteredSocieties = filter === "all" 
    ? societies 
    : societies.filter(s => s.status === filter);

  const stats = {
    total: societies.length,
    active: societies.filter(s => s.status === "Active").length,
    locked: societies.filter(s => s.status === "To Be Unlocked").length,
    contacted: societies.filter(s => s.status === "Previously Contacted").length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">
          Hidden Societies Access Console
        </h1>
        <p className="text-muted-foreground">
          25 secret organizations tracked across ceremonial access tiers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Societies</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-societies">
              {stats.total}
            </div>
            <p className="text-xs text-muted-foreground">Tracked organizations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Currently operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locked</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.locked}</div>
            <p className="text-xs text-muted-foreground">Awaiting ceremony</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contacted}</div>
            <p className="text-xs text-muted-foreground">Previous engagement</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Society Registry</CardTitle>
          <CardDescription>
            Ceremonial access tracking across organizational tiers
          </CardDescription>
          <div className="flex gap-2 mt-4 flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              data-testid="filter-all"
            >
              All
            </Button>
            <Button
              variant={filter === "Active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("Active")}
              data-testid="filter-active"
            >
              Active
            </Button>
            <Button
              variant={filter === "To Be Unlocked" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("To Be Unlocked")}
              data-testid="filter-locked"
            >
              Locked
            </Button>
            <Button
              variant={filter === "Ancestral Link" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("Ancestral Link")}
              data-testid="filter-ancestral"
            >
              Ancestral
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSocieties.map((society) => (
              <Card key={society.id} className="hover-elevate" data-testid={`society-card-${society.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{society.symbol}</span>
                      <div>
                        <CardTitle className="text-base">{society.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                          {getAccessIcon(society.accessLevel)}
                          <span className="text-xs">{society.accessLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant={getStatusColor(society.status) as any}>
                    {society.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
