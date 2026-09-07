import { applyShadowGuardrails, validateAnalysisRequest, simulatedSemanticAnalysis, type ClaimResult } from '@/lib/analyze';

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'JSON inválido.' }, { status: 400 }); }
  if (!validateAnalysisRequest(body)) return Response.json({ error: 'Entrada inválida o fuera de límites.' }, { status: 422 });

  const blocked = body.claims.map(applyShadowGuardrails);
  const allowedClaims = body.claims.filter((_, index) => blocked[index] === null);
  const merge = (semantic: ClaimResult[]) => { let i = 0; return blocked.map((item) => item ?? semantic[i++]); };
  if (!allowedClaims.length) return Response.json({ mode: 'deterministic', label: 'REGLAS DE SOMBRA', results: merge([]) });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ mode: 'simulated', label: 'ANÁLISIS DE IA SIMULADO', results: merge(simulatedSemanticAnalysis({ ...body, claims: allowedClaims })) });

  try {
    const response = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gpt-5-mini', input: [{ role: 'system', content: 'Compare each Spanish claim only with the bounded fictional evidence. Never score or recommend the person. Return JSON with results.' }, { role: 'user', content: JSON.stringify({ ...body, claims: allowedClaims }) }], text: { format: { type: 'json_schema', name: 'claim_results', strict: true, schema: { type: 'object', additionalProperties: false, properties: { results: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { claim: { type: 'string' }, classification: { type: 'string', enum: ['SUPPORTED','OVERCLAIM'] }, reason: { type: 'string' } }, required: ['claim','classification','reason'] } } }, required: ['results'] } } } }) });
    if (!response.ok) throw new Error('LLM unavailable');
    const payload = await response.json() as { output_text?: string };
    const parsed = JSON.parse(payload.output_text ?? '{}') as { results?: ClaimResult[] };
    if (!Array.isArray(parsed.results) || parsed.results.length !== allowedClaims.length) throw new Error('Invalid LLM shape');
    return Response.json({ mode: 'live', label: 'ANÁLISIS ASISTIDO POR IA', results: merge(parsed.results) });
  } catch { return Response.json({ mode: 'simulated', label: 'ANÁLISIS DE IA SIMULADO · SERVICIO NO DISPONIBLE', results: merge(simulatedSemanticAnalysis({ ...body, claims: allowedClaims })) }); }
}
