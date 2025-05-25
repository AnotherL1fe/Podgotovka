// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';

import { execSync } from 'child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = { encoding: 'utf8', cwd: path.join(__dirname, '..') };
const result1 = execSync(
  'bin/weather.js __fixtures__/weather1.csv',
  // @ts-ignore
  options,
);
const result2 = execSync(
  'bin/weather.js __fixtures__/weather2.csv',
  // @ts-ignore
  options,
);

const rows1 = result1.trim().split('\n');
const rows2 = result2.trim().split('\n');

test('step1', () => {
  assert.strictEqual(rows1[0], 'Count: 20');
  assert.strictEqual(rows2[0], 'Count: 9');
});

test('step2', () => {
  assert.strictEqual(rows1[1], 'Cities: Chicago, Denver, Los Angeles, Miami, Seattle');
  assert.strictEqual(rows2[1], 'Cities: Chicago, Denver, Miami, Seattle');
});

test('step3', () => {
  assert.strictEqual(rows1[2], 'Humidity: Min: 58, Max: 80');
  assert.strictEqual(rows2[2], 'Humidity: Min: 30, Max: 83');
});

test('step4', () => {
  assert.strictEqual(rows1[3], 'HottestDay: 2023-04-18 Los Angeles');
  assert.strictEqual(rows2[3], 'HottestDay: 2023-04-18 Miami');
});

test('step5', () => {
  assert.strictEqual(rows1[4], 'HottestCity: Miami');
  assert.strictEqual(rows2[4], 'HottestCity: Miami');
});
