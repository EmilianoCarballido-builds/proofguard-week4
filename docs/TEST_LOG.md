# ProofGuard Mechanical Test Log

## 2026-09-06 - Full pass

| Check | Result |
|---|---|
| Fictional structured record loads | Pass |
| Invalid score, unknown fields, oversized claim rejected | Pass |
| Bounded claim supported | Pass |
| General job-performance claim overclaimed | Pass |
| Shadow families blocked deterministically | Pass |
| Candidate selection/private/correction/expiry behavior | Pass by state review and production build |
| Employer view contains selected supported evidence only | Pass |
| No secret or real-person record in tracked source | Pass |
| Automated tests | Pass: 14 |
| Production build | Pass |

## Genuine defect found

**Reproduction:** Run the repository quality check after Commit 6.

**Actual:** It failed because it scanned dozens of unused generated UI components, while the live analysis page also treated the API response as an unchecked value and used a generic element with `role=status`.

**Expected:** The project quality gate should target shipped application code, and the UI should validate the returned shape before rendering it with a semantic status element.

**Root cause:** The default scaffold lint scope was broader than the product source, and the fetch response lacked a runtime shape guard.

**Fix:** Scoped lint to `app` and `lib`, validated the label/result/item types and result count before use, and changed the correction notice to a semantic `<output>`.

**Retest:** Automated tests, build, and scoped lint all pass before redeployment.
