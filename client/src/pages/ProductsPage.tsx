import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Zap, ShoppingBag, Star } from "lucide-react";
import type { EvolProduct } from "@shared/schema";

export default function ProductsPage() {
  const { data: allProducts, isLoading: isLoadingAll } = useQuery<EvolProduct[]>({
    queryKey: ['/api/evol-products'],
  });

  const { data: featuredProducts, isLoading: isLoadingFeatured } = useQuery<EvolProduct[]>({
    queryKey: ['/api/evol-products/featured'],
  });

  if (isLoadingAll || isLoadingFeatured) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" data-testid="text-page-title">
              EVOL Products
            </h1>
            <p className="text-muted-foreground text-lg">
              Next-generation technology designed for the future
            </p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold" data-testid="text-featured-title">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover-elevate" data-testid={`card-featured-product-${product.id}`}>
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-product-${product.id}`}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" data-testid={`badge-category-${product.id}`}>
                      {product.category}
                    </Badge>
                    {product.price && (
                      <span className="text-lg font-bold text-primary" data-testid={`text-price-${product.id}`}>
                        ${parseFloat(product.price).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-2xl" data-testid={`text-name-${product.id}`}>{product.name}</CardTitle>
                  <CardDescription className="text-base" data-testid={`text-tagline-${product.id}`}>
                    {product.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/90" data-testid={`text-description-${product.id}`}>{product.description}</p>
                  {product.specs && product.specs.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground/70">Key Specs:</h4>
                      <ul className="space-y-1">
                        {product.specs.map((spec, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Zap className="w-3 h-3 text-primary" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {product.releaseDate && (
                    <p className="text-xs text-muted-foreground">
                      Available: {new Date(product.releaseDate).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Products Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold" data-testid="text-all-products-title">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts?.map((product) => (
            <Card key={product.id} className="overflow-hidden hover-elevate active-elevate-2" data-testid={`card-product-${product.id}`}>
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  data-testid={`img-product-thumb-${product.id}`}
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" data-testid={`badge-category-small-${product.id}`}>
                    {product.category}
                  </Badge>
                  {product.price && (
                    <span className="text-sm font-bold text-primary" data-testid={`text-price-small-${product.id}`}>
                      ${parseFloat(product.price).toLocaleString()}
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg line-clamp-1" data-testid={`text-name-small-${product.id}`}>
                  {product.name}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {product.tagline}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
