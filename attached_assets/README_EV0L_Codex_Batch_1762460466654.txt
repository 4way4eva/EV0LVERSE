
EV0L Codex — Batch Mint Prep (NFT.Storage)

Files included:
- EV0L_Codex_PPPPI.json  → master manifest of layers
- metadata_token_<id>.json (1..10) → ERC-721-style metadata files
- nft_storage_upload_template.csv → CSV you can use in the NFT.Storage UI (the screenshot you sent).

How to use:
1) For each token metadata file, replace the image field’s placeholder with your actual IPFS CID AFTER uploading your images:
   "image": "ipfs://<YOUR_IMAGE_CID>"
2) Zip the metadata_token_*.json files if you want to upload as a directory to NFT.Storage, or upload one-by-one.
3) Copy the resulting metadata root CID(s) from NFT.Storage.
4) Fill nft_storage_upload_template.csv:
   - token_id: stays as-is (1..10)
   - metadata_json_path: path to the local file you will upload
   - image_cid_placeholder: optional note for you; not used by contracts
   - metadata_cid: paste the IPFS CID you get after uploading each metadata file
5) Upload the CSV to app.nft.storage (the “Click or drag CSV” screen shown) or use your mint script to bind token_id ↔ metadata CID.

Notes:
- This set is ERC-721 style metadata. It also works for ERC-1155 if your mint script maps token_id → CID.
- Keep the master manifest (EV0L_Codex_PPPPI.json) on Arweave/IPFS as your provenance anchor.
- If you want me to auto-generate a Solidity contract (721A/1155) stub wired to this CSV, say the word and I’ll drop it.
