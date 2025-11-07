// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BLEULIONTREASURY_ENFT
 * @dev Enhanced NFT contract for BLEULIONTREASURY™ ceremonial tokens
 * Supports metadata URI, provenance hash tracking, and vault association
 */
contract BLEULIONTREASURY_ENFT is ERC721Enumerable, Ownable {
    
    // Token metadata
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => string) private _provenanceHashes;
    mapping(uint256 => string) private _vaultIds;
    mapping(uint256 => bool) private _nonTransferable;
    
    // Token counter
    uint256 private _tokenIdCounter;
    
    // Bill/Coin denominations in USD equivalent
    enum Denomination { BLEU, PINK, SHILLS }
    mapping(uint256 => Denomination) private _denominations;
    
    // Events
    event ENFTMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string vaultId,
        string provenanceHash,
        string tokenURI,
        Denomination denomination
    );
    
    event BillMinted(
        uint256 indexed tokenId,
        address indexed owner,
        Denomination denomination,
        uint256 usdValue
    );
    
    event CoinMinted(
        uint256 indexed tokenId,
        address indexed owner,
        Denomination denomination,
        uint256 usdValue
    );
    
    event ProvenanceUpdated(uint256 indexed tokenId, string provenanceHash);
    
    event TransferAttempt(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to,
        bool blocked
    );
    
    constructor() ERC721("BLEULIONTREASURY ENFT", "BENFT") Ownable(msg.sender) {
        _tokenIdCounter = 1;
    }
    
    /**
     * @dev Get denomination USD value
     */
    function getDenominationValue(Denomination denomination) public pure returns (uint256) {
        if (denomination == Denomination.BLEU) return 10000; // $10k
        if (denomination == Denomination.PINK) return 1000;  // $1k
        return 100; // SHILLS = $100
    }
    
    /**
     * @dev Mint new ENFT with metadata
     * @param to Recipient address
     * @param vaultId Associated vault identifier
     * @param provenanceHash SHA3-256 provenance hash
     * @param tokenURI IPFS metadata URI
     * @param nonTransferable Whether token is transferable
     * @param denomination Bill/coin denomination (BLEU=$10k, PINK=$1k, SHILLS=$100)
     */
    function mint(
        address to,
        string memory vaultId,
        string memory provenanceHash,
        string memory tokenURI,
        bool nonTransferable,
        Denomination denomination
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = tokenURI;
        _provenanceHashes[tokenId] = provenanceHash;
        _vaultIds[tokenId] = vaultId;
        _nonTransferable[tokenId] = nonTransferable;
        _denominations[tokenId] = denomination;
        
        emit ENFTMinted(tokenId, to, vaultId, provenanceHash, tokenURI, denomination);
        
        return tokenId;
    }
    
    /**
     * @dev Mint bill (ceremonial currency)
     */
    function mintBill(
        address to,
        string memory vaultId,
        string memory tokenURI,
        Denomination denomination
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = mint(
            to,
            vaultId,
            "", // No provenance for bills
            tokenURI,
            false, // Bills are transferable
            denomination
        );
        
        emit BillMinted(tokenId, to, denomination, getDenominationValue(denomination));
        
        return tokenId;
    }
    
    /**
     * @dev Mint coin (ceremonial currency)
     */
    function mintCoin(
        address to,
        string memory vaultId,
        string memory tokenURI,
        Denomination denomination
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = mint(
            to,
            vaultId,
            "", // No provenance for coins
            tokenURI,
            false, // Coins are transferable
            denomination
        );
        
        emit CoinMinted(tokenId, to, denomination, getDenominationValue(denomination));
        
        return tokenId;
    }
    
    /**
     * @dev Get denomination for token
     */
    function getDenomination(uint256 tokenId) public view returns (Denomination) {
        _requireOwned(tokenId);
        return _denominations[tokenId];
    }
    
    /**
     * @dev Batch mint multiple ENFTs
     */
    function batchMint(
        address[] memory recipients,
        string[] memory vaultIds,
        string[] memory provenanceHashes,
        string[] memory tokenURIs,
        bool[] memory nonTransferableFlags,
        Denomination[] memory denominations
    ) public onlyOwner returns (uint256[] memory) {
        require(
            recipients.length == vaultIds.length &&
            recipients.length == provenanceHashes.length &&
            recipients.length == tokenURIs.length &&
            recipients.length == nonTransferableFlags.length &&
            recipients.length == denominations.length,
            "Array lengths must match"
        );
        
        uint256[] memory tokenIds = new uint256[](recipients.length);
        
        for (uint256 i = 0; i < recipients.length; i++) {
            tokenIds[i] = mint(
                recipients[i],
                vaultIds[i],
                provenanceHashes[i],
                tokenURIs[i],
                nonTransferableFlags[i],
                denominations[i]
            );
        }
        
        return tokenIds;
    }
    
    /**
     * @dev Get token URI for given token ID
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _tokenURIs[tokenId];
    }
    
    /**
     * @dev Get provenance hash for token
     */
    function getProvenanceHash(uint256 tokenId) public view returns (string memory) {
        _requireOwned(tokenId);
        return _provenanceHashes[tokenId];
    }
    
    /**
     * @dev Get vault ID for token
     */
    function getVaultId(uint256 tokenId) public view returns (string memory) {
        _requireOwned(tokenId);
        return _vaultIds[tokenId];
    }
    
    /**
     * @dev Check if token is non-transferable
     */
    function isNonTransferable(uint256 tokenId) public view returns (bool) {
        _requireOwned(tokenId);
        return _nonTransferable[tokenId];
    }
    
    /**
     * @dev Override transfer to enforce non-transferable tokens and emit events
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Allow minting (from == address(0))
        if (from != address(0) && _nonTransferable[tokenId]) {
            emit TransferAttempt(tokenId, from, to, true);
            revert("Token is non-transferable");
        }
        
        if (from != address(0)) {
            emit TransferAttempt(tokenId, from, to, false);
        }
        
        return super._update(to, tokenId, auth);
    }
    
    /**
     * @dev Get all token IDs owned by an address
     */
    function getTokensByOwner(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokens = new uint256[](balance);
        
        for (uint256 i = 0; i < balance; i++) {
            tokens[i] = tokenOfOwnerByIndex(owner, i);
        }
        
        return tokens;
    }
}
