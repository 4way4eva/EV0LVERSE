import NFTCard from '../NFTCard';
import wolfImage from '@assets/generated_images/Wolf_Guardian_species_portrait_274c844d.png';
import felineImage from '@assets/generated_images/Feline_Sovereign_species_portrait_88c49a5f.png';
import mamaImage from '@assets/generated_images/Matriarchal_Ops_portrait_6ea3fbe8.png';

export default function NFTCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <NFTCard 
        tokenId="001"
        name="AlphaHowl"
        image={wolfImage}
        rarity="Legendary"
        species="Wolf Guardian"
      />
      <NFTCard 
        tokenId="042"
        name="Panthera Codex"
        image={felineImage}
        rarity="Sovereign"
        species="Feline Sovereign"
      />
      <NFTCard 
        tokenId="007"
        name="MamaYaya7"
        image={mamaImage}
        rarity="Rare"
        species="Matriarchal Ops"
      />
    </div>
  );
}
