import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, GraduationCap, Flag, Sparkles, User, Users, Globe2 } from "lucide-react";
import type { MetaSchool, MetaNation, MetaGalaxy } from "@shared/schema";

export default function MetaScaleObservatoryPage() {
  const { data: metaSchools, isLoading: schoolsLoading } = useQuery<MetaSchool[]>({
    queryKey: ["/api/meta-schools"],
  });

  const { data: metaNations, isLoading: nationsLoading } = useQuery<MetaNation[]>({
    queryKey: ["/api/meta-nations"],
  });

  const { data: metaGalaxies, isLoading: galaxiesLoading } = useQuery<MetaGalaxy[]>({
    queryKey: ["/api/meta-galaxies"],
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b bg-gradient-to-r from-background to-primary/5">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
          MetaScale Observatory
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Consciousness Sequencing • Governance Networks • Cosmic-Scale Civilizations
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="schools" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6" data-testid="tabs-metascale">
            <TabsTrigger value="schools" data-testid="tab-meta-schools">
              <GraduationCap className="w-4 h-4 mr-2" />
              MetaSchools
            </TabsTrigger>
            <TabsTrigger value="nations" data-testid="tab-meta-nations">
              <Flag className="w-4 h-4 mr-2" />
              MetaNations
            </TabsTrigger>
            <TabsTrigger value="galaxies" data-testid="tab-meta-galaxies">
              <Sparkles className="w-4 h-4 mr-2" />
              MetaGalaxies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schools" data-testid="content-meta-schools">
            {schoolsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4">
                {metaSchools?.map((school) => (
                  <Card key={school.id} className="hover-elevate" data-testid={`card-metaschool-${school.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl" data-testid={`text-school-name-${school.id}`}>
                            {school.name}
                          </CardTitle>
                          <CardDescription data-testid={`text-school-core-${school.id}`}>
                            {school.core}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline" data-testid={`badge-school-status-${school.id}`}>
                            {school.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Globe2 className="w-4 h-4" />
                            Educational Layers
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            {school.layers.map((layer: string, idx: number) => (
                              <div key={idx} className="flex items-start gap-2" data-testid={`text-layer-${school.id}-${idx}`}>
                                <span className="text-primary font-bold min-w-6">{idx + 1}.</span>
                                <span>{layer}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Core Disciplines
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {school.disciplines.map((discipline: string, idx: number) => (
                              <Badge key={idx} data-testid={`badge-discipline-${school.id}-${idx}`}>
                                {discipline}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Philosophy</h4>
                          <p className="text-sm text-muted-foreground" data-testid={`text-philosophy-${school.id}`}>
                            {school.philosophy}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2 border-t text-sm">
                          <div>
                            <span className="text-muted-foreground">Enrollment:</span>{" "}
                            <span className="font-semibold" data-testid={`text-enrollment-${school.id}`}>
                              {school.currentEnrollment?.toLocaleString() || "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Capacity:</span>{" "}
                            <span className="font-semibold" data-testid={`text-capacity-${school.id}`}>
                              {school.enrollmentCapacity?.toLocaleString() || "Unlimited"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="nations" data-testid="content-meta-nations">
            {nationsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4">
                {metaNations?.map((nation) => (
                  <Card key={nation.id} className="hover-elevate" data-testid={`card-metanation-${nation.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl" data-testid={`text-nation-name-${nation.id}`}>
                            {nation.name}
                          </CardTitle>
                          <CardDescription data-testid={`text-nation-governance-${nation.id}`}>
                            Governance: {nation.governance}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline" data-testid={`badge-nation-diplomatic-${nation.id}`}>
                            {nation.diplomaticStatus}
                          </Badge>
                          <Badge data-testid={`badge-nation-tech-${nation.id}`}>
                            Tech Tier: {nation.techTier}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Nation Metrics
                          </h4>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Population:</span>
                              <span className="font-semibold" data-testid={`text-population-${nation.id}`}>
                                {nation.population?.toLocaleString() || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Capital City:</span>
                              <span data-testid={`text-capital-${nation.id}`}>
                                {nation.capital}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Currency System:</span>
                              <span data-testid={`text-currency-${nation.id}`}>
                                {nation.currencySystem}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Globe2 className="w-4 h-4" />
                            Sovereign Territories
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {nation.territories.map((territory: string, idx: number) => (
                              <Badge key={idx} variant="secondary" data-testid={`badge-territory-${nation.id}-${idx}`}>
                                {territory}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Primary Languages</h4>
                          <div className="flex flex-wrap gap-2">
                            {nation.primaryLanguages.map((language: string, idx: number) => (
                              <Badge key={idx} data-testid={`badge-language-${nation.id}-${idx}`}>
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2 border-t text-sm">
                          <div>
                            <span className="text-muted-foreground">Economic Model:</span>{" "}
                            <span className="font-semibold" data-testid={`text-economy-${nation.id}`}>
                              {nation.economicModel}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cultural Identity:</span>{" "}
                            <span className="font-semibold" data-testid={`text-culture-${nation.id}`}>
                              {nation.culturalIdentity}
                            </span>
                          </div>
                        </div>

                        {nation.militaryStrength && (
                          <div className="pt-2 border-t text-sm">
                            <span className="text-muted-foreground">Military Strength:</span>{" "}
                            <span className="font-semibold" data-testid={`text-military-${nation.id}`}>
                              {nation.militaryStrength}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="galaxies" data-testid="content-meta-galaxies">
            {galaxiesLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4">
                {metaGalaxies?.map((galaxy) => (
                  <Card key={galaxy.id} className="hover-elevate" data-testid={`card-metagalaxy-${galaxy.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl" data-testid={`text-galaxy-name-${galaxy.id}`}>
                            {galaxy.name}
                          </CardTitle>
                          <CardDescription data-testid={`text-galaxy-coordinates-${galaxy.id}`}>
                            Coordinates: {galaxy.coordinates}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline" data-testid={`badge-galaxy-consciousness-${galaxy.id}`}>
                            {galaxy.consciousnessLevel}
                          </Badge>
                          <Badge data-testid={`badge-galaxy-tech-${galaxy.id}`}>
                            Tech Tier: {galaxy.technologyTier}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Breeding Protocol
                          </h4>
                          <p className="text-sm text-muted-foreground" data-testid={`text-breeding-${galaxy.id}`}>
                            {galaxy.breedingProtocol}
                          </p>
                          {galaxy.breedingEngine && (
                            <p className="text-sm text-muted-foreground mt-2" data-testid={`text-engine-${galaxy.id}`}>
                              Engine: {galaxy.breedingEngine}
                            </p>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Globe2 className="w-4 h-4" />
                            Galactic Chambers
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {galaxy.chambers.map((chamber: string, idx: number) => (
                              <Badge key={idx} variant="secondary" data-testid={`badge-chamber-${galaxy.id}-${idx}`}>
                                {chamber}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Member Civilizations
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            {galaxy.memberCivilizations.map((civ: string, idx: number) => (
                              <div key={idx} className="flex items-start gap-2" data-testid={`text-civilization-${galaxy.id}-${idx}`}>
                                <span className="text-primary font-bold">{idx + 1}.</span>
                                <span>{civ}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Resource Flows</h4>
                          <div className="flex flex-wrap gap-2">
                            {galaxy.resourceFlows.map((flow: string, idx: number) => (
                              <Badge key={idx} data-testid={`badge-resource-${galaxy.id}-${idx}`}>
                                {flow}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2 border-t text-sm">
                          <div>
                            <span className="text-muted-foreground">Galactic Role:</span>{" "}
                            <span className="font-semibold" data-testid={`text-role-${galaxy.id}`}>
                              {galaxy.galacticRole}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Diplomatic Status:</span>{" "}
                            <span className="font-semibold" data-testid={`text-diplomatic-${galaxy.id}`}>
                              {galaxy.diplomaticStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Layers({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
