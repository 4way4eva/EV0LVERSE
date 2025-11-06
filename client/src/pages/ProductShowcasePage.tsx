import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Zap, ShoppingCart } from "lucide-react";
import { type ShowcaseProduct } from "@shared/schema";

// Import product images
import evolVRImage from "@assets/0A71EEB9-70BC-4E32-8015-D752161816B7_1762460192313.png";
import evolConsoleImage from "@assets/11F45317-AC0C-4370-93A6-68782EAC1331_1762460192313.png";
import bleuGasStationImage from "@assets/2664BC23-1F34-4C81-B400-9F026CE8947F_1762460192313.png";
import shadesOfBleuImage from "@assets/904E304A-9736-4225-81D9-7368632CA3CF_1762460192313.png";
import evolSportsGearImage from "@assets/D9CB4A78-DB8A-47F8-9DFD-7B76C1F84BDF_1762461706562.png";
import evolCleatsImage from "@assets/A1209ECD-1125-4C58-B329-33D8D0228067_1762461706562.png";
import evolNerdGearImage from "@assets/39030CBA-C29F-4CF0-9E05-059095E64873_2_1762461706562.png";
import bleuLionsUniformImage from "@assets/3EC454AD-FB3C-42CC-91E2-9D32D5B49081_1762461706562.png";

// Create image map
const imageMap: Record<string, string> = {
  "attached_assets/0A71EEB9-70BC-4E32-8015-D752161816B7_1762460192313.png": evolVRImage,
  "attached_assets/11F45317-AC0C-4370-93A6-68782EAC1331_1762460192313.png": evolConsoleImage,
  "attached_assets/2664BC23-1F34-4C81-B400-9F026CE8947F_1762460192313.png": bleuGasStationImage,
  "attached_assets/904E304A-9736-4225-81D9-7368632CA3CF_1762460192313.png": shadesOfBleuImage,
  "attached_assets/D9CB4A78-DB8A-47F8-9DFD-7B76C1F84BDF_1762461706562.png": evolSportsGearImage,
  "attached_assets/A1209ECD-1125-4C58-B329-33D8D0228067_1762461706562.png": evolCleatsImage,
  "attached_assets/39030CBA-C29F-4CF0-9E05-059095E64873_2_1762461706562.png": evolNerdGearImage,
  "attached_assets/3EC454AD-FB3C-42CC-91E2-9D32D5B49081_1762461706562.png": bleuLionsUniformImage,
};

export default function ProductShowcasePage() {
  const { data: products, isLoading } = useQuery<ShowcaseProduct[]>({
    queryKey: ["/api/showcase-products"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" data-testid="loading-spinner">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-3">
          <Package className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">No products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <h1 
          className="text-5xl font-bold tracking-tight" 
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          data-testid="page-title"
        >
          EVOL PRODUCT SHOWCASE
        </h1>
        <p className="text-xl text-muted-foreground">
          Hardware, apparel, and infrastructure for the sovereign future
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="overflow-hidden hover-elevate transition-all duration-300 flex flex-col"
            data-testid={`card-product-${product.id}`}
          >
            {/* Product Image */}
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-background to-accent/10">
              <img
                src={imageMap[product.imagePath] || ""}
                alt={product.name}
                className="w-full h-full object-contain p-6"
                data-testid={`img-product-${product.id}`}
              />
              {product.badge && (
                <Badge 
                  variant="default" 
                  className="absolute top-3 right-3 gap-1"
                  data-testid={`badge-${product.badge.toLowerCase().replace(/\s+/g, "-")}-${product.id}`}
                >
                  <Zap className="h-3 w-3" />
                  {product.badge}
                </Badge>
              )}
            </div>

            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <CardTitle 
                    className="text-2xl"
                    data-testid={`title-product-${product.id}`}
                  >
                    {product.name}
                  </CardTitle>
                  <CardDescription 
                    className="text-base italic"
                    data-testid={`tagline-product-${product.id}`}
                  >
                    "{product.tagline}"
                  </CardDescription>
                </div>
                <Badge variant="outline" data-testid={`category-${product.id}`}>
                  {product.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
              <p className="text-sm leading-relaxed" data-testid={`description-${product.id}`}>
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Key Features
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-1 text-xs"
                      data-testid={`feature-${idx}-${product.id}`}
                    >
                      <span className="text-primary mt-0.5">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-3 border-t pt-4">
              <div className="space-y-1">
                {product.price && (
                  <p className="text-2xl font-bold" data-testid={`price-${product.id}`}>
                    {product.price}
                  </p>
                )}
                <Badge 
                  variant={product.availability === "Available" ? "default" : "secondary"}
                  data-testid={`availability-${product.id}`}
                >
                  {product.availability}
                </Badge>
              </div>
              
              <Button 
                size="default"
                disabled={product.availability === "Coming Soon"}
                data-testid={`button-order-${product.id}`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.availability === "Available" ? "Order Now" : 
                 product.availability === "Pre-Order" ? "Pre-Order" : 
                 "Coming Soon"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="text-center space-y-4 pt-8">
        <p className="text-lg text-muted-foreground">
          Join the sovereign movement. Shape the future.
        </p>
        <p className="text-sm text-muted-foreground">
          For wholesale inquiries or custom orders, contact{" "}
          <a href="mailto:products@evolverse.io" className="text-primary hover:underline">
            products@evolverse.io
          </a>
        </p>
      </div>
    </div>
  );
}
