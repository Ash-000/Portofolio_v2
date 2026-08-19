---
name: production-inventory-flow
description: Use whenever building or modifying anything touching Botani Seed's production, inventory, or approval-workflow modules — the Raw Material to Finished Goods pipeline, the transactions/approval_requests/approval_logs state machine, warehouse/location models, or BOM/work-order screens. This is the most domain-specific and easiest-to-get-wrong part of the system; read this before writing schema or business logic here.
---

# Production & Inventory Flow

This is the operational backbone of the Inventory module (`PRD.md §4.3`). Get this wrong and every downstream Finance/Marketplace number is wrong too — Inventory is described in the source discussion notes as "the heart of the system."

## The pipeline
```
Raw Material (Sawah/field — CBKS)
  → Warehouse intake (CBKB, 40kg sacks)
  → Processing Production (drying + cleaning — merged into one step)
  → Packaging (BBDK, 5kg retail packs)
  → Finished Goods → Warehouse (Inventory) → Sale (POS / Marketplace)
```

Shrinkage is **expected and must be recorded** at each transformation step, not treated as a bug. Worked example from source notes: 100kg raw → 80kg after drying (20% loss) → 75kg after cleaning (5kg further loss) = 25% total production shrinkage. Any BOM/work-order screen needs a place to record expected vs. actual yield.

## Document-control checkpoints (don't add more than this without asking)
Only **two** points in the pipeline require a formal supporting document:
1. **Raw material intake** — Purchase Order / Proof of Payment.
2. **Finished Goods release** — Goods Receipt Note / Production Report.

Everything in between (WIP transitions) is a **system-only update**, deliberately skipping formal document requirements to keep the shop floor fast. Do not add a document-upload requirement to a WIP sub-step — that's a scope change the Finance department explicitly decided against, for exactly this system.

## Approval state machine
Backing tables: `transactions` (`id, type, qty, status`), `approval_requests` (`id, transaction_id, req_by, approver_role, status`), `approval_logs` (`id, request_id, action_by, action, timestamp, notes`).

| State | Trigger | System action |
|---|---|---|
| `PENDING` | Staff Inventory submits Raw In / FG Out | Insert `transactions` + `approval_requests`, notify Staff Finance |
| *(bypass)* | Transaction `type` = WIP | Skip the approval queue entirely |
| `APPROVED` | Staff Finance clicks ACC | Insert `approval_logs`, generate PO/GRN, sync inventory value into the accounting ledger |
| `REJECTED` | Staff Finance clicks Reject + note | Insert `approval_logs`, notify submitter; resubmission returns it to `PENDING` |

## Open questions to check before locking behavior (see `PRD.md §11`)
- **OQ-2:** the exact 3×3 sub-step breakdown of production hasn't been fully confirmed against the worked example (which only shows 2–3 sub-steps, not a clean 3×3 grid). Don't hard-code a rigid 3×3 UI without checking with the Production department first.
- **OQ-4:** there are two versions of several inventory/production tables in the source docs (legacy Odoo/HasMicro-style mixed-case notes vs. the cleaned snake_case schema). Build against the snake_case schema in `PRD.md §6` unless told otherwise.

## Rules
1. Every stock-affecting mutation should be a row in `transactions`/`stock_mutations`, not a direct field update on `product_variants.stock` — you need the audit trail for the approval workflow and for Finance's ledger sync.
2. Location model is two-level: `warehouses`/`location_warehouse` (the physical site) and `locations` (a sub-location within it, e.g. "packing" vs. "rack/karung storage") — don't collapse these into one table.
3. Finished-goods location and rejected-goods location are tracked separately per work center (`lokasi_finished_produk`, `lokasi_rejected_produck` on `work_center`) — a BOM/work-order screen needs both, not just one "output location" field.
