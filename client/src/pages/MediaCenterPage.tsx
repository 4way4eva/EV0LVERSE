import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tv, TrendingUp, Eye } from "lucide-react";
import type { EvolMedia } from "@shared/schema";

export default function MediaCenterPage() {
  const { data: allMedia, isLoading: isLoadingAll } = useQuery<EvolMedia[]>({
    queryKey: ['/api/evol-media'],
  });

  const { data: featuredMedia, isLoading: isLoadingFeatured } = useQuery<EvolMedia[]>({
    queryKey: ['/api/evol-media/featured'],
  });

  if (isLoadingAll || isLoadingFeatured) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
            <Tv className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent" data-testid="text-page-title">
              EVOL Media Center
            </h1>
            <p className="text-muted-foreground text-lg">
              Breaking news, exclusive stories, and cultural insights from the EvolVerse
            </p>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      {featuredMedia && featuredMedia.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold" data-testid="text-featured-title">Featured Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredMedia.map((media) => (
              <Card key={media.id} className="overflow-hidden hover-elevate" data-testid={`card-featured-media-${media.id}`}>
                {media.imageUrl && (
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={media.imageUrl}
                      alt={media.title}
                      className="w-full h-full object-cover"
                      data-testid={`img-media-${media.id}`}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" data-testid={`badge-category-${media.id}`}>
                      {media.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{media.views?.toLocaleString() || 0} views</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl" data-testid={`text-title-${media.id}`}>{media.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    By {media.author} • {new Date(media.publishedDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90" data-testid={`text-description-${media.id}`}>{media.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Media Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold" data-testid="text-all-media-title">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMedia?.map((media) => (
            <Card key={media.id} className="overflow-hidden hover-elevate active-elevate-2" data-testid={`card-media-${media.id}`}>
              {media.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={media.imageUrl}
                    alt={media.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-media-thumb-${media.id}`}
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" data-testid={`badge-category-small-${media.id}`}>
                    {media.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(media.publishedDate).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-2" data-testid={`text-title-small-${media.id}`}>
                  {media.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-description-small-${media.id}`}>
                  {media.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <span>{media.author}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{media.views?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
