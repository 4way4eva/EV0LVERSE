import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [walletConnected, setWalletConnected] = useState(false);
  
  const handleWalletConnect = () => {
    console.log('Wallet connect clicked');
    setWalletConnected(!walletConnected);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
            data-testid="button-menu-toggle"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="text-3xl">🦁</div>
            <h1 className="font-ceremonial text-xl font-bold tracking-wide">
              BLEULIONTREASURY
            </h1>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" data-testid="link-dashboard" onClick={() => console.log('Dashboard clicked')}>
            Dashboard
          </Button>
          <Button variant="ghost" data-testid="link-mint" onClick={() => console.log('Mint clicked')}>
            Mint
          </Button>
          <Button variant="ghost" data-testid="link-vault" onClick={() => console.log('Vault clicked')}>
            Vault
          </Button>
          <Button variant="ghost" data-testid="link-hydrocard" onClick={() => console.log('HydroCard clicked')}>
            HydroCard
          </Button>
          <Button variant="ghost" data-testid="link-dossier" onClick={() => console.log('Dossier clicked')}>
            Dossier
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          {walletConnected && (
            <Badge variant="secondary" className="hidden sm:flex" data-testid="badge-network">
              Avalanche
            </Badge>
          )}
          <Button 
            variant={walletConnected ? "secondary" : "default"}
            className="gap-2"
            onClick={handleWalletConnect}
            data-testid="button-wallet-connect"
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">
              {walletConnected ? '0x742d...5f3a' : 'Connect Wallet'}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
