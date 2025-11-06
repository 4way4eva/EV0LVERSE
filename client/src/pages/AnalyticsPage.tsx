import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Target } from "lucide-react";
import type { EvolAnalytics } from "@shared/schema";

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useQuery<EvolAnalytics[]>({
    queryKey: ['/api/evol-analytics'],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  const financeMetrics = analytics?.filter(a => a.category === 'Finance') || [];
  const marketMetrics = analytics?.filter(a => a.category === 'Market') || [];
  const growthMetrics = analytics?.filter(a => a.category === 'Growth') || [];

  const getIcon = (category: string) => {
    switch (category) {
      case 'Finance':
        return DollarSign;
      case 'Market':
        return Target;
      case 'Growth':
        return BarChart3;
      default:
        return TrendingUp;
    }
  };

  const renderMetricCard = (metric: EvolAnalytics) => {
    const Icon = getIcon(metric.category);
    const changePercent = metric.changePercent ? parseFloat(metric.changePercent) : null;
    const isPositive = changePercent !== null && changePercent >= 0;

    return (
      <Card key={metric.id} className="hover-elevate active-elevate-2" data-testid={`card-metric-${metric.id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {metric.metricName}
          </CardTitle>
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold" data-testid={`text-value-${metric.id}`}>
              {metric.value}
            </div>
            {metric.unit && (
              <span className="text-sm text-muted-foreground">{metric.unit}</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            {changePercent !== null && (
              <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {Math.abs(changePercent)}%
                </span>
              </div>
            )}
            <Badge variant="outline" className="text-xs">
              {metric.category}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Updated {new Date(metric.lastUpdated).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent" data-testid="text-page-title">
              EVOL Analytics
            </h1>
            <p className="text-muted-foreground text-lg">
              Real-time metrics, performance indicators, and market insights
            </p>
          </div>
        </div>
      </div>

      {/* Finance Metrics */}
      {financeMetrics.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2" data-testid="text-finance-title">
            <DollarSign className="w-6 h-6 text-primary" />
            Financial Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeMetrics.map(renderMetricCard)}
          </div>
        </div>
      )}

      {/* Market Metrics */}
      {marketMetrics.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2" data-testid="text-market-title">
            <Target className="w-6 h-6 text-primary" />
            Market Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketMetrics.map(renderMetricCard)}
          </div>
        </div>
      )}

      {/* Growth Metrics */}
      {growthMetrics.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2" data-testid="text-growth-title">
            <TrendingUp className="w-6 h-6 text-primary" />
            Growth Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {growthMetrics.map(renderMetricCard)}
          </div>
        </div>
      )}

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Platform Overview</CardTitle>
          <CardDescription>
            Comprehensive performance snapshot of the EVOL ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Tracked Metrics</p>
              <p className="text-2xl font-bold text-primary" data-testid="text-total-metrics">
                {analytics?.length || 0}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="text-2xl font-bold text-primary">
                {new Set(analytics?.map(a => a.category)).size || 0}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-lg font-semibold">
                {analytics && analytics.length > 0
                  ? new Date(analytics[0].lastUpdated).toLocaleString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
