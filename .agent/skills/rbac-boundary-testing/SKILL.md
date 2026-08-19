---
name: rbac-boundary-testing
description: Use whenever adding, editing, or reviewing any route, API endpoint, or dashboard panel in Botani Seed that should be restricted to specific roles (Super Admin, Staff Inventory, Staff Finance, Staff Tracking, Buyer). Mandatory before marking any such feature complete — verifies the explicit-denial acceptance criterion from PRD.md, not just that the allowed role works.
---

# RBAC Boundary Testing

Botani Seed's PRD (`§3.1`, `§5`) is explicit: every cross-department access attempt must return a **visible, explicit denial** — an `Error: Unauthorized Access` message or a blocked/denied overlay that redirects to Dashboard Overview. A silent 404, a blank page, or (worse) the data quietly not loading are all acceptance-criteria failures, not acceptable degradations.

## What to test for every protected route/endpoint

Given the RBAC matrix in `PRD.md §3.1`, for each screen/endpoint:

1. **Positive case:** each role that *should* have access can actually read/write per its documented permission level (full CRUD vs. read-only vs. no access).
2. **Negative case, one test per disallowed role:** each role that should *not* have access gets the explicit denial — assert on the actual message/redirect, not just a non-200 status code.
3. **Super Admin override:** for Dashboard Overview specifically, confirm the global override toggle actually grants create/edit/delete on the sub-panel, and that it's off by default (staff view is read-only until Super Admin explicitly steps in).
4. **Unauthenticated case:** buyer-only routes (cart/checkout) and staff-only routes both need a clear "not logged in" path distinct from "logged in but wrong role."

## Example (NestJS + a guard-based RBAC setup)
```ts
describe("Inventory Management access", () => {
  it.each(["STAFF_INVENTORY", "SUPER_ADMIN"])("allows %s full CRUD", async (role) => {
    const res = await request(app).patch("/inventory/123").set(authAs(role)).send(validPatch);
    expect(res.status).toBe(200);
  });

  it.each(["STAFF_FINANCE", "STAFF_TRACKING"])("blocks %s with an explicit denial", async (role) => {
    const res = await request(app).get("/inventory").set(authAs(role));
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/unauthorized|denied/i); // not a generic 403 with no message
  });
});
```

For the dashboard frontend, assert the **UI-level** behavior too, not just the API: the nav item for a disallowed module should not render at all for that role (see `motion-dashboard-transitions` skill's note on this — don't just hide it with opacity/CSS, remove it from the DOM), and directly navigating to the URL should show the denial overlay, not a broken/empty page.

## Rules
1. Never mark an RBAC-touching feature done without at least one negative test per disallowed role — a feature that only tests the happy path hasn't verified the actual PRD acceptance criterion.
2. If the role model in code doesn't match `PRD.md §3.1` exactly (check the canonical role codes — see `PRD.md §11 OQ-1` for the naming reconciliation), flag it before writing tests against the wrong assumption.
3. Buyer-facing checkout/cart routes need the inverse check too: staff roles shouldn't be silently treated as buyers, and vice versa.
