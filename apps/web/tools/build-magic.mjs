#!/usr/bin/env node
// Emits src/data/education/magic/compare.generated.js — the Magical
// Scriptorium's comparison tables and transliteration schemes.
//
// Derived, as build-cognates derives the kinship table: every cell is looked
// up from an alphabet's own letters by the hall letter it stands for, and
// every row comes from the Hebrew, Latin and Phoenician halls' own data. The
// transliterator reads its schemes from the same file, so the tool cannot
// write a sign the tables do not show. validate-magic.mjs rebuilds it in
// memory and fails if the committed file is stale.

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { GENERATED, buildCompare, loadModules, loadRegistry, serialiseCompare, web } from './magic-lib.mjs';

const registry = await loadRegistry();
const { modules, problems } = await loadModules(registry);
if (problems.length) {
    console.error('build-magic: modules failed to load —');
    for (const p of problems) console.error(`  ✗ ${p}`);
    process.exit(1);
}
const data = await buildCompare(registry, modules);
writeFileSync(GENERATED, serialiseCompare(data), 'utf8');
const cols = data.tables.map((t) => `${t.key} ${t.columns.length} columns × ${t.rows.length} rows`).join(', ');
console.log(`magic: ${cols}; schemes ${Object.keys(data.schemes).join(', ') || 'none'} → ${path.relative(web, GENERATED)}`);
