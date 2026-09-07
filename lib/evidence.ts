export type EvidenceRecord = {
  recordId: string; fictional: true; candidate: { displayName: string; age: number };
  role: string; assessment: string; task: string; result: { correct: number; total: number };
  aiAssistance: string; conditions: string; provenance: string; rubricVersion: string;
  limitations: string; evidenceDate: string; expiresAt: string;
};

const exactKeys = ['recordId','fictional','candidate','role','assessment','task','result','aiAssistance','conditions','provenance','rubricVersion','limitations','evidenceDate','expiresAt'];
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export function validateEvidence(value: unknown): value is EvidenceRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const e = value as Record<string, unknown>;
  if (Object.keys(e).sort().join('|') !== [...exactKeys].sort().join('|')) return false;
  const strings = ['recordId','role','assessment','task','aiAssistance','conditions','provenance','rubricVersion','limitations'] as const;
  if (strings.some((key) => typeof e[key] !== 'string' || !(e[key] as string).trim() || (e[key] as string).length > 500)) return false;
  if (e.fictional !== true || !isoDate.test(String(e.evidenceDate)) || !isoDate.test(String(e.expiresAt))) return false;
  const c = e.candidate as Record<string, unknown>; const r = e.result as Record<string, unknown>;
  if (!c || Object.keys(c).sort().join('|') !== 'age|displayName' || typeof c.displayName !== 'string' || c.displayName.length > 80 || !Number.isInteger(c.age) || (c.age as number) < 16 || (c.age as number) > 100) return false;
  return !!r && Object.keys(r).sort().join('|') === 'correct|total' && Number.isInteger(r.correct) && Number.isInteger(r.total) && (r.total as number) > 0 && (r.correct as number) >= 0 && (r.correct as number) <= (r.total as number);
}
