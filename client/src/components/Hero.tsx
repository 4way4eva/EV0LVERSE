import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/BLEULION_Prime_hero_image_e0893ca5.png";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      </div>
      
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container px-6 text-center">
          <h1 className="font-ceremonial text-6xl font-bold tracking-wide text-primary-foreground md:text-7xl lg:text-8xl drop-shadow-lg">
            BLEULIONTREASURY™
          </h1>
          <p className="mt-6 font-display text-xl text-primary-foreground/90 md:text-2xl max-w-3xl mx-auto drop-shadow">
            Sovereign governance, water-backed currency, and ceremonial NFT minting across the EvolVerse
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="default"
              className="text-lg px-8 py-6 backdrop-blur-md bg-primary/90 hover:bg-primary"
              data-testid="button-launch-dashboard"
              onClick={() => console.log('Launch Dashboard clicked')}
            >
              Launch Dashboard
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 backdrop-blur-md bg-background/20 hover:bg-background/30"
              data-testid="button-mint-enft"
              onClick={() => console.log('Mint ENFT clicked')}
            >
              Mint ENFT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
