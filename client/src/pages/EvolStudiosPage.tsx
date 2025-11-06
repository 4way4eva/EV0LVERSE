import { useQuery } from "@tanstack/react-query";
import type { StudioProject } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Video, PlayCircle, Calendar, Users, Sparkles } from "lucide-react";
import { useState } from "react";

export default function EvolStudiosPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const { data: allProjects, isLoading } = useQuery<StudioProject[]>({
    queryKey: ["/api/studio-projects"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading studio projects...</p>
        </div>
      </div>
    );
  }

  const projects = allProjects || [];

  const filteredProjects = projects.filter((project) => {
    if (selectedType && project.projectType !== selectedType) return false;
    if (selectedStatus && project.status !== selectedStatus) return false;
    return true;
  });

  const projectTypes = Array.from(new Set(projects.map((p) => p.projectType)));
  const projectStatuses = Array.from(new Set(projects.map((p) => p.status)));

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "released":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "production":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "in development":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "film":
        return <Film className="w-4 h-4" />;
      case "series":
        return <Video className="w-4 h-4" />;
      case "ceremonial broadcast":
        return <PlayCircle className="w-4 h-4" />;
      case "documentary series":
        return <Users className="w-4 h-4" />;
      default:
        return <Film className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold flex items-center gap-3" data-testid="text-page-title">
            <Film className="w-10 h-10 text-primary" />
            EVOL Studios
          </h1>
          <p className="text-lg text-muted-foreground">
            Creative production hub for ceremonial films, series, and immersive experiences
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Film className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-projects">{projects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Production</CardTitle>
              <PlayCircle className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500" data-testid="text-production-count">
                {projects.filter((p) => p.status === "Production").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Released</CardTitle>
              <Sparkles className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500" data-testid="text-released-count">
                {projects.filter((p) => p.status === "Released").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Development</CardTitle>
              <Calendar className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500" data-testid="text-development-count">
                {projects.filter((p) => p.status === "In Development").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Project Type</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(null)}
                  data-testid="button-filter-all-types"
                >
                  All Types
                </Button>
                {projectTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    data-testid={`button-filter-type-${type.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {getTypeIcon(type)}
                    <span className="ml-2">{type}</span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedStatus === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(null)}
                  data-testid="button-filter-all-statuses"
                >
                  All Statuses
                </Button>
                {projectStatuses.map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                    data-testid={`button-filter-status-${status.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold" data-testid="text-projects-heading">
              {selectedType || selectedStatus ? "Filtered " : "All "}Projects ({filteredProjects.length})
            </h2>
          </div>

          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Film className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No projects found matching your filters</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden" data-testid={`card-project-${project.id}`}>
                  {project.imagePath && (
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={`/${project.imagePath}`}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        data-testid={`img-project-${project.id}`}
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge className={getStatusColor(project.status)} data-testid={`badge-status-${project.id}`}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-xl" data-testid={`text-project-title-${project.id}`}>
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-sm italic" data-testid={`text-project-tagline-${project.id}`}>
                          "{project.tagline}"
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getTypeIcon(project.projectType)}
                        {project.projectType}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground" data-testid={`text-project-description-${project.id}`}>
                      {project.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Director</p>
                        <p data-testid={`text-director-${project.id}`}>{project.director}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Producer</p>
                        <p data-testid={`text-producer-${project.id}`}>{project.producer}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Release Year</p>
                        <p data-testid={`text-release-year-${project.id}`}>{project.releaseYear}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Genres</p>
                        <div className="flex flex-wrap gap-1">
                          {project.genres.map((genre, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {project.keyFeatures.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Key Features</p>
                        <div className="flex flex-wrap gap-2">
                          {project.keyFeatures.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
