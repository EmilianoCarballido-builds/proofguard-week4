import test from 'node:test';
import assert from 'node:assert/strict';
import evidence from '../data/evidence.json' with { type: 'json' };
import { validateEvidence } from '../lib/evidence.ts';
test('accepts the fictional demo record', () => assert.equal(validateEvidence(evidence), true));
test('rejects impossible score and non-fictional data', () => {
  assert.equal(validateEvidence({ ...evidence, fictional: false }), false);
  assert.equal(validateEvidence({ ...evidence, result: { correct: 11, total: 10 } }), false);
});
