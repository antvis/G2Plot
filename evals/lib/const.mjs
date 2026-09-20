// Shared path constants for eval scripts.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const EVALS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const ROOT = path.resolve(EVALS_DIR, '..');
export const RESULTS_DIR = path.join(EVALS_DIR, 'results');
export const CASES_DIR = path.join(EVALS_DIR, 'cases');
