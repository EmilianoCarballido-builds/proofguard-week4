# ProofGuard Persona Test

## Persona

Valeria, 20, is seeking her first auxiliar-contable role in Mexico. She uses a phone, distrusts opaque hiring systems, and worries one mistake will define her future.

## Fresh-chat walkthrough findings

- She understood that the 8/10 record and all people were simulated.
- She understood that only a supported claim could be selected.
- She hesitated over whether the employer might still see the raw 8/10 score, blocked claims, or a challenge note.
- “Shadow violation” sounded serious enough that she feared it might become a permanent misconduct record.
- She might quit before opening the employer preview if opening it seemed equivalent to publishing.

## Worst confusion and fix

**Worst confusion:** Whether “Mantener privado” hid the entire evaluation or only underlying documents while leaving the score and negative labels visible.

**Fix:** Renamed the control to **“Ocultar todo al empleador”**; the status now explicitly says the employer cannot see the score, labels, or correction note; and the employer action now says **“Vista previa (no publica)”**.

This keeps the Blueprint promise that the candidate owns sharing and private or missing evidence never becomes negative evidence.
