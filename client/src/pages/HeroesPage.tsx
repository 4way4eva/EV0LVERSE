import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Star, Sparkles } from "lucide-react";
import type { EvolHero } from "@shared/schema";

export default function HeroesPage() {
  const { data: allHeroes, isLoading: isLoadingAll } = useQuery<EvolHero[]>({
    queryKey: ['/api/evol-heroes'],
  });

  const { data: featuredHeroes, isLoading: isLoadingFeatured } = useQuery<EvolHero[]>({
    queryKey: ['/api/evol-heroes/featured'],
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
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent" data-testid="text-page-title">
              EVOL Heroes & Champions
            </h1>
            <p className="text-muted-foreground text-lg">
              Guardians, warriors, and icons of the EvolVerse
            </p>
          </div>
        </div>
      </div>

      {/* Featured Heroes */}
      {featuredHeroes && featuredHeroes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold" data-testid="text-featured-title">Featured Champions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredHeroes.map((hero) => (
              <Card key={hero.id} className="overflow-hidden hover-elevate" data-testid={`card-featured-hero-${hero.id}`}>
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={hero.imageUrl}
                    alt={hero.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-hero-${hero.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" data-testid={`badge-category-${hero.id}`}>
                        {hero.category}
                      </Badge>
                      {hero.affiliation && (
                        <Badge variant="outline" className="bg-background/20 backdrop-blur-sm">
                          {hero.affiliation}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-white" data-testid={`text-name-${hero.id}`}>
                      {hero.name}
                    </h3>
                    {hero.alias && (
                      <p className="text-lg text-blue-300" data-testid={`text-alias-${hero.id}`}>
                        "{hero.alias}"
                      </p>
                    )}
                  </div>
                </div>
                <CardContent className="pt-6 space-y-4">
                  <p className="text-foreground/90" data-testid={`text-bio-${hero.id}`}>{hero.bio}</p>
                  {hero.powers && hero.powers.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground/70 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Powers & Abilities:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {hero.powers.map((power, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {power}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Heroes Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold" data-testid="text-all-heroes-title">All Heroes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allHeroes?.map((hero) => (
            <Card key={hero.id} className="overflow-hidden hover-elevate active-elevate-2" data-testid={`card-hero-${hero.id}`}>
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hero.imageUrl}
                  alt={hero.name}
                  className="w-full h-full object-cover"
                  data-testid={`img-hero-thumb-${hero.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Badge variant="secondary" className="mb-2" data-testid={`badge-category-small-${hero.id}`}>
                    {hero.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-white line-clamp-1" data-testid={`text-name-small-${hero.id}`}>
                    {hero.name}
                  </h3>
                  {hero.alias && (
                    <p className="text-sm text-blue-300 line-clamp-1">"{hero.alias}"</p>
                  )}
                </div>
              </div>
              <CardContent className="pt-4 space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-bio-small-${hero.id}`}>
                  {hero.bio}
                </p>
                {hero.powers && hero.powers.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {hero.powers.slice(0, 3).map((power, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {power}
                      </Badge>
                    ))}
                    {hero.powers.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{hero.powers.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
