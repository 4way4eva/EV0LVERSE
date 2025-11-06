import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, TrendingUp, DollarSign, Target } from "lucide-react";
import type { MarketProduct } from "@shared/schema";

export default function MarketIntelligencePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products, isLoading } = useQuery<MarketProduct[]>({
    queryKey: ["/api/market-products"],
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

  if (!products || products.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">BLEU Backbone Market Intelligence</h1>
          <p className="text-muted-foreground">No market products found in database</p>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.useCaseFit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalProducts: products.length,
    totalBenchmark: products.reduce((sum, p) => sum + p.marketBenchmark2025, 0),
    totalProjection: products.reduce((sum, p) => sum + p.overscaleProjection, 0),
    avgROI: Math.round(products.reduce((sum, p) => sum + p.roiPercentage, 0) / products.length),
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">
          BLEU Backbone Market Intelligence
        </h1>
        <p className="text-muted-foreground">
          Strategic product portfolio with overscale projections and ROI metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Lines</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-product-lines">
              {stats.totalProducts}
            </div>
            <p className="text-xs text-muted-foreground">Strategic offerings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2025 Benchmark</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalBenchmark}B</div>
            <p className="text-xs text-muted-foreground">Market baseline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overscale Target</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalProjection}B</div>
            <p className="text-xs text-muted-foreground">EV0L projection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgROI}%</div>
            <p className="text-xs text-muted-foreground">Portfolio average</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Product Portfolio</CardTitle>
              <CardDescription>
                BLEU Backbone market intelligence and projections
              </CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products or sectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-products"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Use Case</TableHead>
                  <TableHead className="text-right">2025 Benchmark</TableHead>
                  <TableHead className="text-right">Overscale</TableHead>
                  <TableHead className="text-right">ROI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} data-testid={`product-row-${product.productName.toLowerCase().replace(/\s+/g, "-")}`}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.productName}</p>
                        <p className="text-xs text-muted-foreground italic">{product.slogan}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {product.sector}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {product.useCaseFit}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${product.marketBenchmark2025}B
                    </TableCell>
                    <TableCell className="text-right font-medium text-primary">
                      ${product.overscaleProjection}B
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="default">
                        +{product.roiPercentage}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
