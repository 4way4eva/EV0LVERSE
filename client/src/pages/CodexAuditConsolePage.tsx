import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Layers, Globe, ImageIcon, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import type { CodexLayer, EnvironmentalCity, ImageAudit } from "@shared/schema";

export default function CodexAuditConsolePage() {
  const { data: codexLayers, isLoading: layersLoading } = useQuery<CodexLayer[]>({
    queryKey: ["/api/codex-layers"],
  });

  const { data: cities, isLoading: citiesLoading } = useQuery<EnvironmentalCity[]>({
    queryKey: ["/api/environmental-cities"],
  });

  const { data: imageAudits, isLoading: auditsLoading } = useQuery<ImageAudit[]>({
    queryKey: ["/api/image-audits"],
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b bg-gradient-to-r from-background to-accent/5">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
          Codex Audit Console
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          10-Layer EV0L Codex System • Environmental Tracking • ENFT Image Provenance
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="codex" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6" data-testid="tabs-audit-console">
            <TabsTrigger value="codex" data-testid="tab-codex-layers">
              <Layers className="w-4 h-4 mr-2" />
              Codex Layers
            </TabsTrigger>
            <TabsTrigger value="environmental" data-testid="tab-environmental-cities">
              <Globe className="w-4 h-4 mr-2" />
              Environmental Cities
            </TabsTrigger>
            <TabsTrigger value="image-audits" data-testid="tab-image-audits">
              <ImageIcon className="w-4 h-4 mr-2" />
              Image Audits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="codex" data-testid="content-codex-layers">
            {layersLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4">
                {codexLayers?.map((layer) => (
                  <Card key={layer.id} className="hover-elevate" data-testid={`card-codex-layer-${layer.layerNumber}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-4xl" data-testid={`glyph-layer-${layer.layerNumber}`}>
                            {layer.glyph}
                          </div>
                          <div>
                            <CardTitle className="text-xl" data-testid={`text-layer-name-${layer.layerNumber}`}>
                              Layer {layer.layerNumber}: {layer.codex}
                            </CardTitle>
                            <CardDescription data-testid={`text-law-english-${layer.layerNumber}`}>
                              {layer.lawEnglish}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" data-testid={`badge-status-${layer.layerNumber}`}>
                          {layer.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Multilingual Laws</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Swahili:</span> {layer.lawSwahili}
                            </div>
                            <div>
                              <span className="font-medium">Yoruba:</span> {layer.lawYoruba}
                            </div>
                            <div>
                              <span className="font-medium">Hebrew:</span> {layer.lawHebrew}
                            </div>
                            <div>
                              <span className="font-medium">Arabic:</span> {layer.lawArabic}
                            </div>
                            <div className="col-span-2">
                              <span className="font-medium">Nahuatl:</span> {layer.lawNahuatl}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">HMMM Resonance</h4>
                          <div className="flex flex-wrap gap-2">
                            {layer.hmmm.map((sound, idx) => (
                              <Badge key={idx} variant="secondary" data-testid={`badge-hmmm-${layer.layerNumber}-${idx}`}>
                                {sound}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Hieroglyphs</h4>
                          <div className="flex gap-2 text-2xl" data-testid={`text-hieroglyphs-${layer.layerNumber}`}>
                            {layer.hieroglyphs.map((glyph, idx) => (
                              <span key={idx}>{glyph}</span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Revenue Streams</h4>
                          <div className="flex flex-wrap gap-2">
                            {layer.streams.map((stream, idx) => (
                              <Badge key={idx} data-testid={`badge-stream-${layer.layerNumber}-${idx}`}>
                                {stream}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="environmental" data-testid="content-environmental-cities">
            {citiesLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {cities?.map((city) => (
                  <Card key={city.id} className="hover-elevate" data-testid={`card-city-${city.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle data-testid={`text-city-name-${city.id}`}>{city.cityName}</CardTitle>
                          <CardDescription data-testid={`text-city-biome-${city.id}`}>
                            {city.biome}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={
                            city.safeHavenStatus === "Active" ? "default" : 
                            city.safeHavenStatus === "Under Construction" ? "secondary" : 
                            "outline"
                          }
                          data-testid={`badge-status-${city.id}`}
                        >
                          {city.safeHavenStatus === "Active" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {city.safeHavenStatus === "Under Construction" && <Clock className="w-3 h-3 mr-1" />}
                          {city.safeHavenStatus === "Planned" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {city.safeHavenStatus}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Region:</span>
                            <Badge variant="outline" className="ml-2" data-testid={`badge-region-${city.id}`}>
                              {city.region}
                            </Badge>
                          </div>
                          <div>
                            <span className="font-medium">Guardian:</span>
                            <Badge variant="secondary" className="ml-2" data-testid={`badge-guardian-${city.id}`}>
                              {city.vaultGuardian}
                            </Badge>
                          </div>
                        </div>

                        <div className="border-t pt-3">
                          <h4 className="text-sm font-semibold mb-2">Climate Data</h4>
                          <div className="space-y-1 text-sm">
                            <div data-testid={`text-climate-${city.id}`}>
                              <span className="font-medium">Climate:</span> {city.climate}
                            </div>
                            <div data-testid={`text-weather-${city.id}`}>
                              <span className="font-medium">Current Weather:</span> {city.currentWeather}
                            </div>
                            <div data-testid={`text-temperature-${city.id}`}>
                              <span className="font-medium">Temperature:</span> {city.temperature}°C
                            </div>
                            <div data-testid={`text-density-${city.id}`}>
                              <span className="font-medium">Population Density:</span> {city.populationDensity?.toLocaleString() ?? 'N/A'} per km²
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-3">
                          <h4 className="text-sm font-semibold mb-2">Coordinates</h4>
                          <div className="text-sm font-mono" data-testid={`text-coordinates-${city.id}`}>
                            {city.latitude}, {city.longitude}
                          </div>
                        </div>

                        {city.mallNode && (
                          <div className="border-t pt-3">
                            <span className="text-sm font-medium">Mall Node:</span>
                            <Badge className="ml-2" data-testid={`badge-mall-${city.id}`}>
                              {city.mallNode}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="image-audits" data-testid="content-image-audits">
            {auditsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4">
                {imageAudits?.map((audit) => (
                  <Card key={audit.id} className="hover-elevate" data-testid={`card-audit-${audit.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-mono" data-testid={`text-filename-${audit.id}`}>
                            {audit.fileName}
                          </CardTitle>
                          <CardDescription data-testid={`text-enft-id-${audit.id}`}>
                            Token ID: {audit.enftTokenId}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold" data-testid={`text-density-score-${audit.id}`}>
                            {audit.densityScore}
                          </div>
                          <div className="text-xs text-muted-foreground">Density Score</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm font-medium mb-1">Resolution</div>
                            <div className="text-sm" data-testid={`text-resolution-${audit.id}`}>{audit.resolution}</div>
                            <div className="text-xs text-muted-foreground">{audit.megapixels} MP</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">File Size</div>
                            <div className="text-sm" data-testid={`text-filesize-${audit.id}`}>{audit.sizeKb} KB</div>
                            <div className="text-xs text-muted-foreground">
                              {audit.compressionRatio}:1 ratio
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">Entropy</div>
                            <div className="text-sm" data-testid={`text-entropy-${audit.id}`}>{audit.entropyBits} bits</div>
                            <div className="text-xs text-muted-foreground">Information density</div>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="text-sm font-semibold mb-3">Quality Metrics</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Edge Density</div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-secondary rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${parseFloat(audit.edgeDensity) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium w-12" data-testid={`text-edge-density-${audit.id}`}>
                                  {audit.edgeDensity}
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Colorfulness</div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-secondary rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${Math.min(parseFloat(audit.colorfulness), 100)}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium w-12" data-testid={`text-colorfulness-${audit.id}`}>
                                  {audit.colorfulness}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="text-sm font-semibold mb-2">Blockchain Provenance</h4>
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="font-medium">IPFS CID:</span>
                              <div className="font-mono bg-secondary/50 p-2 rounded mt-1 break-all" data-testid={`text-ipfs-${audit.id}`}>
                                {audit.ipfsCid}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">Keccak-256 Hash:</span>
                              <div className="font-mono bg-secondary/50 p-2 rounded mt-1 break-all" data-testid={`text-keccak-${audit.id}`}>
                                {audit.keccakHash}
                              </div>
                            </div>
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
