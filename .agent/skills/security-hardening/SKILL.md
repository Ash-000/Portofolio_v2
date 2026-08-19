---
name: security-hardening
description: Use whenever touching auth, the NestJS bootstrap/main.ts, CORS config, rate limiting, password/token handling, Prisma raw queries, Supabase RLS policies, or Midtrans webhook handling in Botani Seed. Mandatory checklist before merging anything in these areas — see Security.md for full detail.
---

# Security Hardening Checklist

Full protocol lives in `Security.md`. This skill is the checklist to run through before merging anything touching these surfaces.

## NestJS API (`apps/api`)
- [ ] `app.use(helmet())` present in `main.ts`.
- [ ] CORS `origin` is an explicit allowlist of `NEXT_PUBLIC_WEB_URL` / `NEXT_PUBLIC_DASHBOARD_URL` — never `origin: true` or `*`.
- [ ] Global `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })` — strips/rejects unexpected fields (mass-assignment protection).
- [ ] `ThrottlerModule` configured with `ThrottlerStorageRedisService`, applied via `APP_GUARD`.
- [ ] Any new `PrismaClientKnownRequestError` path goes through an `ExceptionFilter` — never leak stack traces or raw query text into a JSON response.

## Database (Prisma + Supabase)
- [ ] No `Prisma.$queryRawUnsafe` with any user-supplied value, ever. If raw SQL is genuinely needed, use `Prisma.sql` tagged templates with parameterization.
- [ ] Row Level Security enabled on any new table holding tenant- or user-scoped data.

## Auth
- [ ] Passwords hashed with bcrypt before storage; never logged or returned in API responses, even to Super Admin.
- [ ] Password-reset tokens expire at **exactly 15 minutes** — check this isn't silently loosened to "24 hours" for developer convenience and left that way.
- [ ] Google OAuth + email/OTP flows don't leak whether an email is registered (avoid user-enumeration via differing error messages on login/reset).

## Midtrans webhooks
- [ ] Signature-key validation on every incoming webhook — reject anything that doesn't verify before touching order state.
- [ ] Webhook handler is idempotent (Midtrans can and will retry deliveries).

## Frontend (`apps/web`, `apps/dashboard`)
- [ ] Security headers set in `next.config.js` for both apps: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `X-DNS-Prefetch-Control`.
- [ ] RBAC-hidden nav items and data are absent from what's sent to the client for a disallowed role — don't rely on the frontend alone to hide something the API still returns.

## Marketplace / external sync
- [ ] External platform sync APIs (Shopee/Tokopedia/etc.) authenticate via token, and tokens are never logged.

## Rules
- If you're unsure whether a new NestJS/Prisma/Supabase security API is current, check the `context7` MCP server before writing it from memory.
- Don't relax any item on this list "temporarily for testing" in a branch that could get merged — use a separate local `.env` override instead.
