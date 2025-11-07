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
    
    // Events
    event ENFTMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string vaultId,
        string provenanceHash,
        string tokenURI
    );
    
    event ProvenanceUpdated(uint256 indexed tokenId, string provenanceHash);
    
    constructor() ERC721("BLEULIONTREASURY ENFT", "BENFT") Ownable(msg.sender) {
        _tokenIdCounter = 1;
    }
    
    /**
     * @dev Mint new ENFT with metadata
     * @param to Recipient address
     * @param vaultId Associated vault identifier
     * @param provenanceHash SHA3-256 provenance hash
     * @param tokenURI IPFS metadata URI
     * @param nonTransferable Whether token is transferable
     */
    function mint(
        address to,
        string memory vaultId,
        string memory provenanceHash,
        string memory tokenURI,
        bool nonTransferable
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = tokenURI;
        _provenanceHashes[tokenId] = provenanceHash;
        _vaultIds[tokenId] = vaultId;
        _nonTransferable[tokenId] = nonTransferable;
        
        emit ENFTMinted(tokenId, to, vaultId, provenanceHash, tokenURI);
        
        return tokenId;
    }
    
    /**
     * @dev Batch mint multiple ENFTs
     */
    function batchMint(
        address[] memory recipients,
        string[] memory vaultIds,
        string[] memory provenanceHashes,
        string[] memory tokenURIs,
        bool[] memory nonTransferableFlags
    ) public onlyOwner returns (uint256[] memory) {
        require(
            recipients.length == vaultIds.length &&
            recipients.length == provenanceHashes.length &&
            recipients.length == tokenURIs.length &&
            recipients.length == nonTransferableFlags.length,
            "Array lengths must match"
        );
        
        uint256[] memory tokenIds = new uint256[](recipients.length);
        
        for (uint256 i = 0; i < recipients.length; i++) {
            tokenIds[i] = mint(
                recipients[i],
                vaultIds[i],
                provenanceHashes[i],
                tokenURIs[i],
                nonTransferableFlags[i]
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
     * @dev Override transfer to enforce non-transferable tokens
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Allow minting (from == address(0))
        if (from != address(0) && _nonTransferable[tokenId]) {
            revert("Token is non-transferable");
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
