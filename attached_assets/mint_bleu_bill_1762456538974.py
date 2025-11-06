from dataclasses import dataclass, asdict
from hashlib import blake2b
from time import time
from typing import Dict, List
import json, sys

def blake3_like(data: bytes) -> str:
    return blake2b(data, digest_size=32).hexdigest()

def mnemonic5(h: str) -> str:
    return "-".join([h[i:i+4] for i in range(0, 20, 4)]).upper()

def praise_code(namespace: str, mission: str, issuer_pub: str, salt: str) -> str:
    h = blake3_like((namespace + "|" + mission + "|" + issuer_pub + "|" + salt).encode())
    return f"{h}:{mnemonic5(h)}"

def reciprocal_index(need: float, svc_growth: float, equity: float, resilience_gap: float, incident_penalty: float, satisfaction: float) -> float:
    ri = 0.5 + 0.2*need + 0.2*svc_growth + 0.15*equity + 0.15*resilience_gap - 0.2*incident_penalty + 0.1*satisfaction
    return max(0.5, min(2.0, ri))

@dataclass
class BleuBill:
    code: str
    name: str
    shade: str
    mission: str
    routes_to_modules: List[str]
    praise_code: str
    reciprocal_index: float

def mint_bill(code, name, shade, mission, routes, issuer_pub, salt, ri_inputs):
    pc = praise_code("BLEU", mission, issuer_pub, salt)
    ri = reciprocal_index(**ri_inputs)
    bill = BleuBill(code, name, shade, mission, routes, pc, ri)
    record = {"bill": asdict(bill), "mint_ts": time(), "tx_hash": blake3_like(str(asdict(bill)).encode())}
    return record

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python mint_bleu_bill.py bleu_bill_registry.json")
        sys.exit(1)
    reg_path = sys.argv[1]
    reg = json.load(open(reg_path))
    issuer_pub = "PUBKEY_PLACEHOLDER"
    out = []
    for b in reg["bills"]:
        ri_inputs = {"need":0.6,"svc_growth":0.6,"equity":0.6,"resilience_gap":0.6,"incident_penalty":0.0,"satisfaction":0.6}
        minted = mint_bill(b["code"], b["name"], b["shade"], b["mission"], b["routes_to_modules"], issuer_pub, "AUTO", ri_inputs)
        out.append(minted)
    print(json.dumps({"minted": out[:3], "note": "printing first 3 only for brevity"}, indent=2))