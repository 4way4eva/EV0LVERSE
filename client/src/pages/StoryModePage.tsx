import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BookOpen, ChevronDown, ChevronUp, Lock, Unlock, Sparkles } from "lucide-react";
import type { StoryChapter } from "@shared/schema";

import evolAwardsImage from "@assets/A4593FEC-12FC-4C6F-B312-DE841F4F9FE0_1762460020992.png";
import pourHouseImage from "@assets/4C5D9E73-7FAE-4FD8-9F55-619E76454241_1762460020992.png";
import soraSpiralImage from "@assets/72D9C3C9-981C-4643-8A9E-7B24DC35D5D3_1762460020992.png";
import evolBankingImage from "@assets/AF3841E5-F424-4D1A-B52F-98B06DD10FA4_1762460020992.png";
import hoverboardImage from "@assets/4864A7E2-2B0C-4AD7-A81D-541A1E1A1E51_1762460020992.png";
import platformImage from "@assets/7DA78580-3D0A-49D1-8136-C762A1247965_1762460020992.png";
import galacticUnityImage from "@assets/IMG_4440_1762460020992.png";
import tachometerImage from "@assets/IMG_4428_1762460020992.png";
import smartEcosystemImage from "@assets/0F64EA36-29BF-4C4B-A146-2BBE66A2597F_1762460020992.png";
import bleuShieldImage from "@assets/E323600E-0028-441D-A49E-1AC8385F5E3D_1762460020992.png";
import bleuzionsImage from "@assets/8B2FC767-3612-4749-8ABE-8220D4D26B9E_1762460020992.png";
import overtimeRulesImage from "@assets/20E69351-B8C8-4126-A05C-EF98471C77F9_1762460020992.png";
import bleuLionEngineImage from "@assets/E3EA6C32-CC2C-44F2-AD49-5AAE454FA7B2_1762460020992.png";

const imageMap: Record<string, string> = {
  "attached_assets/A4593FEC-12FC-4C6F-B312-DE841F4F9FE0_1762460020992.png": evolAwardsImage,
  "attached_assets/4C5D9E73-7FAE-4FD8-9F55-619E76454241_1762460020992.png": pourHouseImage,
  "attached_assets/72D9C3C9-981C-4643-8A9E-7B24DC35D5D3_1762460020992.png": soraSpiralImage,
  "attached_assets/AF3841E5-F424-4D1A-B52F-98B06DD10FA4_1762460020992.png": evolBankingImage,
  "attached_assets/4864A7E2-2B0C-4AD7-A81D-541A1E1A1E51_1762460020992.png": hoverboardImage,
  "attached_assets/7DA78580-3D0A-49D1-8136-C762A1247965_1762460020992.png": platformImage,
  "attached_assets/IMG_4440_1762460020992.png": galacticUnityImage,
  "attached_assets/IMG_4428_1762460020992.png": tachometerImage,
  "attached_assets/0F64EA36-29BF-4C4B-A146-2BBE66A2597F_1762460020992.png": smartEcosystemImage,
  "attached_assets/E323600E-0028-441D-A49E-1AC8385F5E3D_1762460020992.png": bleuShieldImage,
  "attached_assets/8B2FC767-3612-4749-8ABE-8220D4D26B9E_1762460020992.png": bleuzionsImage,
  "attached_assets/20E69351-B8C8-4126-A05C-EF98471C77F9_1762460020992.png": overtimeRulesImage,
  "attached_assets/E3EA6C32-CC2C-44F2-AD49-5AAE454FA7B2_1762460020992.png": bleuLionEngineImage,
};

export default function StoryModePage() {
  const { data: chapters, isLoading } = useQuery<StoryChapter[]>({
    queryKey: ["/api/story-chapters"],
  });

  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-96 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!chapters || chapters.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-ceremonial font-bold mb-2">ENFT Story Mode</h1>
          <p className="text-muted-foreground">No chapters available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <BookOpen className="w-10 h-10 text-primary" />
          <h1 className="text-5xl font-ceremonial font-bold tracking-wide" data-testid="heading-story-mode">
            ENFT Story Mode
          </h1>
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          An infinite unfolding narrative experience chronicling the rise of the BLEULIONTREASURY sovereign ecosystem
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="default" className="text-sm" data-testid="badge-total-chapters">
            {chapters.length} Chapters
          </Badge>
          <Badge variant="secondary" className="text-sm" data-testid="badge-unlocked-chapters">
            {chapters.filter((c) => c.unlocked).length} Unlocked
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => {
          const isExpanded = expandedChapters.has(chapter.id);
          
          return (
            <Collapsible
              key={chapter.id}
              open={isExpanded}
              onOpenChange={() => toggleChapter(chapter.id)}
            >
              <Card
                className="overflow-hidden hover-elevate transition-all duration-300"
                data-testid={`card-chapter-${chapter.chapterNumber}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={imageMap[chapter.imagePath] || ""}
                    alt={chapter.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-chapter-${chapter.chapterNumber}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {chapter.unlocked ? (
                      <Badge variant="default" className="gap-1" data-testid={`badge-unlocked-${chapter.chapterNumber}`}>
                        <Unlock className="w-3 h-3" />
                        Unlocked
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1" data-testid={`badge-locked-${chapter.chapterNumber}`}>
                        <Lock className="w-3 h-3" />
                        Locked
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
                        <span className="text-xl font-ceremonial font-bold text-white" data-testid={`text-chapter-number-${chapter.chapterNumber}`}>
                          {chapter.chapterNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-ceremonial" data-testid={`title-chapter-${chapter.chapterNumber}`}>
                        {chapter.title}
                      </CardTitle>
                      <CardDescription className="mt-1" data-testid={`subtitle-chapter-${chapter.chapterNumber}`}>
                        {chapter.subtitle}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Badge variant="outline" className="text-xs" data-testid={`badge-category-${chapter.chapterNumber}`}>
                      {chapter.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      data-testid={`button-expand-${chapter.chapterNumber}`}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Hide Story
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Read Story
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-4">
                    <div className="pt-4 border-t">
                      <p className="text-sm leading-relaxed text-muted-foreground" data-testid={`narrative-chapter-${chapter.chapterNumber}`}>
                        {chapter.narrative}
                      </p>
                    </div>

                    {chapter.charactersFeatured && chapter.charactersFeatured.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Featured Characters</h4>
                        <div className="flex flex-wrap gap-2">
                          {chapter.charactersFeatured.map((character) => (
                            <Badge
                              key={character}
                              variant="secondary"
                              className="text-xs"
                              data-testid={`badge-character-${character.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {character}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CollapsibleContent>
                </CardContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>

      {chapters.length > 0 && (
        <div className="text-center pt-8 border-t">
          <p className="text-sm text-muted-foreground italic">
            The story continues to unfold... More chapters coming soon
          </p>
        </div>
      )}
    </div>
  );
}
