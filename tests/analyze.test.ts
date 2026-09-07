import test from 'node:test'; import assert from 'node:assert/strict';
import evidence from '../data/evidence.json' with { type: 'json' };
import { applyShadowGuardrails, validateAnalysisRequest, simulatedSemanticAnalysis } from '../lib/analyze.ts';
test('validates exact bounded analysis input', () => assert.equal(validateAnalysisRequest({ evidence, claims: ['Identificó 8 de 10 errores.'] }), true));
test('rejects unknown fields and oversized claims', () => {
  assert.equal(validateAnalysisRequest({ evidence, claims: ['válida'], extra: true }), false);
  assert.equal(validateAnalysisRequest({ evidence, claims: ['x'.repeat(281)] }), false);
});
test('simulated semantic fallback distinguishes overclaim', () => assert.equal(simulatedSemanticAnalysis({ evidence, claims: ['Está lista para trabajo real.'] })[0].classification, 'OVERCLAIM'));
for (const claim of ['alto potencial','empleabilidad 82','personalidad responsable','aptitud contable','carrera recomendada','ranking global','certificada','lista para trabajar']) test(`blocks shadow family: ${claim}`, () => assert.equal(applyShadowGuardrails(claim)?.classification, 'SHADOW_VIOLATION'));
test('leaves bounded observations for semantic analysis', () => assert.equal(applyShadowGuardrails('Identificó 8 de 10 errores.'), null));
