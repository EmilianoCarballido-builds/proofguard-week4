import { validateEvidence, type EvidenceRecord } from './evidence.ts';
export type ClaimResult = { claim: string; classification: 'SUPPORTED' | 'OVERCLAIM' | 'SHADOW_VIOLATION'; reason: string };
export type AnalysisRequest = { evidence: EvidenceRecord; claims: string[] };

export function validateAnalysisRequest(value: unknown): value is AnalysisRequest {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const body = value as Record<string, unknown>;
  if (Object.keys(body).sort().join('|') !== 'claims|evidence' || !validateEvidence(body.evidence) || !Array.isArray(body.claims) || body.claims.length < 1 || body.claims.length > 8) return false;
  return body.claims.every((claim) => typeof claim === 'string' && claim.trim().length >= 3 && claim.length <= 280);
}

export function simulatedSemanticAnalysis(request: AnalysisRequest): ClaimResult[] {
  const overclaim = /lista para|independiente|experta|siempre|cualquier|trabajo real/i;
  return request.claims.map((claim) => overclaim.test(claim)
    ? { claim, classification: 'OVERCLAIM', reason: 'La afirmación generaliza una sola tarea simulada a un desempeño laboral más amplio.' }
    : { claim, classification: 'SUPPORTED', reason: 'La afirmación se mantiene dentro del resultado observado y sus condiciones.' });
}

const shadowPatterns: Array<[RegExp, string]> = [
  [/potencial/i, 'No se puede convertir una tarea en una predicción de potencial.'],
  [/empleabilidad|empleable/i, 'ProofGuard prohíbe puntajes o etiquetas de empleabilidad.'],
  [/personalidad|responsable|confiable/i, 'Una muestra no demuestra rasgos de personalidad.'],
  [/aptitud|talento innato/i, 'La evidencia no autoriza una etiqueta de aptitud.'],
  [/carrera recomendada|debería ser|destinad[oa]/i, 'La evidencia no puede elegir ni ordenar futuros profesionales.'],
  [/ranking|percentil/i, 'No se permite un ranking global de personas.'],
  [/certificad[oa]|job.ready|lista para trabajar|listo para trabajar/i, 'Esta tarea no prueba certificación ni preparación laboral general.'],
];

export function applyShadowGuardrails(claim: string): ClaimResult | null {
  for (const [pattern, reason] of shadowPatterns) if (pattern.test(claim)) return { claim, classification: 'SHADOW_VIOLATION', reason };
  return null;
}

export function analyzeWithGuardrails(request: AnalysisRequest): ClaimResult[] {
  return request.claims.map((claim) => applyShadowGuardrails(claim) ?? simulatedSemanticAnalysis({ ...request, claims: [claim] })[0]);
}
