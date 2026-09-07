# ProofGuard - Precise Implementation Prompt

Build a Spanish-first web prototype called **ProofGuard** from `docs/PACKET.md` and `public/proofguard-mockup.png`. It is an adversarial recognition-and-shadow test for one fictional auxiliar-contable work sample. Use structured JSON plus a server-side LLM integration, with deterministic guardrails as final authority. Never build an AI tutor, career recommender, hiring decision maker, or career/employability scoring system.

## Non-negotiable constraints

- Label every person, result, and fallback AI output as simulated/fictional.
- Store no personal data. Candidate actions are in-memory only and disappear on refresh.
- Keep secrets server-side and out of the repository.
- Validate exact API object shape, types, nonblank values, maximum lengths, claim count, record identifiers, ISO dates, and score bounds. Reject unknown fields.
- Run deterministic Shadow Clause rules before the LLM. Never send prohibited claims to the LLM.
- Employer view receives only candidate-selected, supported, non-expired evidence. Hidden, challenged, missing, rejected, or private data never appears and never counts negatively.
- Preserve conditions, permitted AI assistance, provenance, limitations, correction status, and expiry.

## Feature and commit plan

### Commit 1 - Packet, decisions, and static ProofGuard surface

- Complete Packet, implementation plan, mockup, simulated-data banner, responsive static UI, and `DECISIONS.md`.

### Commit 2 - Typed structured evidence model

- Standalone JSON + TypeScript model; render every field from data; validate the demo record in tests.

### Commit 3 - Validated claim-analysis boundary

- Strict server endpoint; server-side LLM when configured; clearly labeled simulated fallback; tests for valid and invalid input.

**Deploy 1 after Commit 3. Record URL/date/version in `DECISIONS.md`.**

### Commit 4 - Deterministic Shadow Clause guardrails

- Block potential, personality, aptitude, employability, certification, job-readiness, career/destiny, and ranking language before any LLM call; show the three result classes with reasons; test every prohibited family.

### Commit 5 - Candidate sharing, hiding, correction, and expiry

- Select supported claims only; hide all evidence; add a local correction/challenge; set expiry; employer preview contains only selected, supported, unchallenged, non-expired evidence.

### Commit 6 - Employer view, accessibility, and polish

- Separate candidate/employer views; responsive and keyboard accessible; handle loading, error, empty, success, hidden, and expired states; product-specific metadata/social preview; all checks pass.

**Deploy 2 after Commit 6. Record URL/date/version in `DECISIONS.md`.**

## Required test/fix sequence after Deploy 2

1. Run the mechanical plan and document it in `docs/TEST_LOG.md`.
2. Identify and document a genuine defect, fix it in its own commit, rerun tests, and redeploy.
3. Run the screenshot-based synthetic persona test in a fresh chat and document every confusion in `docs/PERSONA_TEST.md`.
4. Fix the worst confusion in its own commit, explain the before/after in `DECISIONS.md`, rerun checks, and deploy finally.

## Session Close discipline

At the end of every work session: update `DECISIONS.md`, write tomorrow's first concrete move, run proportionate checks, commit the coherent changes, and push when a remote exists. Never claim a push or deploy occurred unless it did.

