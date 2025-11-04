import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function MintInterface() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedRealm, setSelectedRealm] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [description, setDescription] = useState("");

  const handleFileSelect = () => {
    console.log('File upload clicked');
    setSelectedFile('placeholder_image.png');
  };

  const handleMint = () => {
    console.log('Minting NFT:', { tokenName, description, selectedSpecies, selectedRealm });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Upload Artwork</h3>
          <div 
            className="border-2 border-dashed border-border rounded-lg h-64 flex flex-col items-center justify-center gap-4 hover-elevate cursor-pointer"
            onClick={handleFileSelect}
            data-testid="button-upload-artwork"
          >
            {selectedFile ? (
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">
                  {selectedFile}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  data-testid="button-remove-file"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </div>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Metadata</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="token-name">Token Name</Label>
              <Input 
                id="token-name"
                placeholder="Enter token name"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                data-testid="input-token-name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                placeholder="Describe your ENFT"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-testid="input-description"
              />
            </div>
            <div>
              <Label htmlFor="species">Species Class</Label>
              <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                <SelectTrigger id="species" data-testid="select-species">
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="robotic-lions">Robotic Lions</SelectItem>
                  <SelectItem value="feline-sovereigns">Feline Sovereigns</SelectItem>
                  <SelectItem value="wolf-guardians">Wolf Guardians</SelectItem>
                  <SelectItem value="matriarchal-ops">Matriarchal Ops</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="realm">EvolVerse Realm</Label>
              <Select value={selectedRealm} onValueChange={setSelectedRealm}>
                <SelectTrigger id="realm" data-testid="select-realm">
                  <SelectValue placeholder="Select realm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aqua">AquaEvolverse</SelectItem>
                  <SelectItem value="galactic">GalacticEvolverse</SelectItem>
                  <SelectItem value="civic">CivicEvolverse</SelectItem>
                  <SelectItem value="mirror">MirrorEvolverse</SelectItem>
                  <SelectItem value="techni">TechniEvolverse</SelectItem>
                  <SelectItem value="zion">ZionEvolverse</SelectItem>
                  <SelectItem value="dream">DreamEvolverse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 h-fit">
        <h3 className="text-xl font-semibold mb-4">Preview & Mint</h3>
        <div className="border border-border rounded-lg p-6 mb-6 bg-muted/30">
          <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
            <p className="text-muted-foreground">Preview will appear here</p>
          </div>
          <h4 className="font-semibold text-lg mb-2">{tokenName || 'Untitled ENFT'}</h4>
          <p className="text-sm text-muted-foreground mb-4">{description || 'No description'}</p>
          <div className="flex gap-2">
            {selectedSpecies && <Badge>{selectedSpecies}</Badge>}
            {selectedRealm && <Badge variant="secondary">{selectedRealm}</Badge>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Minting Fee</span>
            <span className="font-mono font-semibold">0.05 HC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gas Estimate</span>
            <span className="font-mono font-semibold">~0.002 AVAX</span>
          </div>
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleMint}
            data-testid="button-mint-nft"
          >
            Mint ENFT
          </Button>
        </div>
      </Card>
    </div>
  );
}
