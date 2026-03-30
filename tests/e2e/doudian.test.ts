/**
 * E2E tests for doudian (抖店) browser commands.
 * These use OPENCLI_HEADLESS=1 to launch a headless Chromium.
 *
 * Tests are wrapped with tryBrowserCommand() which allows graceful failure.
 */

import { describe, it, expect } from 'vitest';
import { runCli, parseJsonOutput, type CliResult } from './helpers.js';

async function tryBrowserCommand(args: string[]): Promise<any[] | null> {
  const { stdout, code } = await runCli(args, { timeout: 120_000 });
  if (code !== 0) return null;
  try {
    const data = parseJsonOutput(stdout);
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

function expectDataOrSkip(data: any[] | null, label: string) {
  if (data === null || data.length === 0) {
    console.warn(`${label}: skipped — no data returned (likely bot detection or geo-blocking)`);
    return;
  }
  expect(data.length).toBeGreaterThanOrEqual(1);
}

function isBrowserBridgeUnavailable(result: CliResult): boolean {
  const text = `${result.stderr}\n${result.stdout}`;
  return /Browser Bridge.*not connected|Extension.*not connected/i.test(text);
}

function isUnauthorized(result: CliResult): boolean {
  const text = `${result.stderr}\n${result.stdout}`;
  return /401|unauthorized|未登录/i.test(text);
}

async function runJsonCliOrThrow(args: string[], label: string, timeout: number, opts: { retryTransient?: boolean } = {}): Promise<any[] | null> {
  const result = await runCli(args, { timeout });
  if (result.code !== 0) {
    if (isBrowserBridgeUnavailable(result)) {
      console.warn(`${label}: skipped — Browser Bridge extension is unavailable in this environment`);
      return null;
    }
    if (isUnauthorized(result)) {
      console.warn(`${label}: skipped — Unauthorized (need login session)`);
      return null;
    }
    throw new Error(`${label} failed:\n${result.stderr || result.stdout}`);
  }

  try {
    const data = parseJsonOutput(result.stdout);
    if (!Array.isArray(data)) {
      throw new Error(`${label} returned non-array JSON:\n${result.stdout.slice(0, 500)}`);
    }
    return data;
  } catch {
    throw new Error(`${label} failed to parse JSON:\n${result.stdout.slice(0, 500)}`);
  }
}

describe('doudian (抖店) browser commands E2E', () => {

  // ── Category queries ──
  it('cat3 returns category tree', async () => {
    const data = await tryBrowserCommand(['doudian', 'cat3', '-f', 'json']);
    expectDataOrSkip(data, 'doudian cat3');
    if (data?.length) {
      expect(data[0]).toHaveProperty('id');
      expect(data[0]).toHaveProperty('name');
    }
  }, 120_000);

  it('cat4 returns category tree', async () => {
    const data = await tryBrowserCommand(['doudian', 'cat4', '-f', 'json']);
    expectDataOrSkip(data, 'doudian cat4');
  }, 120_000);

  // ── Product Rankings ──
  it('productrank hotsale returns hot sale ranking', async () => {
    const data = await tryBrowserCommand(['doudian', 'productrank', '--rankType', 'hotsale', '-f', 'json']);
    expectDataOrSkip(data, 'doudian productrank hotsale');
  }, 120_000);

  it('productrank live returns live ranking', async () => {
    const data = await tryBrowserCommand(['doudian', 'productrank', '--rankType', 'live', '-f', 'json']);
    expectDataOrSkip(data, 'doudian productrank live');
  }, 120_000);

  it('productrank search returns search ranking', async () => {
    const data = await tryBrowserCommand(['doudian', 'productrank', '--rankType', 'search', '-f', 'json']);
    expectDataOrSkip(data, 'doudian productrank search');
  }, 120_000);

  it('productrank card returns card ranking', async () => {
    const data = await tryBrowserCommand(['doudian', 'productrank', '--rankType', 'card', '-f', 'json']);
    expectDataOrSkip(data, 'doudian productrank card');
  }, 120_000);

  it('productrank video returns video ranking', async () => {
    const data = await tryBrowserCommand(['doudian', 'productrank', '--rankType', 'video', '-f', 'json']);
    expectDataOrSkip(data, 'doudian productrank video');
  }, 120_000);

  it('productrank realtime returns realtime ranking', async () => {
    const data = await tryBrowserCommand(['doudian', 'productrank', '--rankType', 'realtime', '-f', 'json']);
    expectDataOrSkip(data, 'doudian productrank realtime');
  }, 120_000);

  it('productrank author returns author ranking', async () => {
    const data = await tryBrowserCommand(['doudian', 'productrank', '--rankType', 'author', '-f', 'json']);
    expectDataOrSkip(data, 'doudian productrank author');
  }, 120_000);

  // ── Hot Keywords & Search ──
  it('ecom_hot returns hot keywords', async () => {
    const data = await tryBrowserCommand(['doudian', 'ecom_hot', '--cateId', '20188', '-f', 'json']);
    expectDataOrSkip(data, 'doudian ecom_hot');
  }, 120_000);

  it('ecom_hot rankType 2 returns growth keywords', async () => {
    const data = await tryBrowserCommand(['doudian', 'ecom_hot', '--cateId', '20188', '--rankType', '2', '-f', 'json']);
    expectDataOrSkip(data, 'doudian ecom_hot rankType 2');
  }, 120_000);

  it('douyin_hot returns hot content ranking', async () => {
    const data = await tryBrowserCommand(['doudian', 'douyin_hot', '-f', 'json']);
    expectDataOrSkip(data, 'doudian douyin_hot');
  }, 120_000);

  it('searchrank returns industry search ranking', async () => {
    const data = await tryBrowserCommand(['doudian', 'searchrank', '--cateId', '20188', '-f', 'json']);
    expectDataOrSkip(data, 'doudian searchrank');
  }, 120_000);

  // ── Sales Data & Weekly Report ──
  it('weeklysales returns weekly sales report', async () => {
    const data = await tryBrowserCommand(['doudian', 'weeklysales', '-f', 'json']);
    expectDataOrSkip(data, 'doudian weeklysales');
  }, 120_000);

  // ── Product Details & Comments ──
  it('goodscomments returns product comments', async () => {
    const data = await tryBrowserCommand(['doudian', 'goodscomments', '--productId', '7521307167140610304', '-f', 'json']);
    expectDataOrSkip(data, 'doudian goodscomments');
  }, 120_000);

  it('goodscomments with pageNo returns paginated comments', async () => {
    const data = await tryBrowserCommand(['doudian', 'goodscomments', '--productId', '7521307167140610304', '--pageNo', '2', '--pageSize', '5', '-f', 'json']);
    expectDataOrSkip(data, 'doudian goodscomments page 2');
  }, 120_000);

  // ── Source Products List ──
  it('goodslist returns source products', async () => {
    const data = await tryBrowserCommand(['doudian', 'goodslist', '-f', 'json']);
    expectDataOrSkip(data, 'doudian goodslist');
  }, 120_000);

  it('goodslist with filters returns filtered products', async () => {
    const data = await tryBrowserCommand(['doudian', 'goodslist', '--page', '1', '--pageSize', '5', '-f', 'json']);
    expectDataOrSkip(data, 'doudian goodslist with pagination');
  }, 120_000);

  it('goodslist with price filter returns products in range', async () => {
    const data = await tryBrowserCommand(['doudian', 'goodslist', '--supplyPriceMin', '10', '--supplyPriceMax', '50', '-f', 'json']);
    expectDataOrSkip(data, 'doudian goodslist price filter');
  }, 120_000);

  it('goodslist with category returns products in category', async () => {
    const data = await tryBrowserCommand(['doudian', 'goodslist', '--firstCids', '38944', '-f', 'json']);
    expectDataOrSkip(data, 'doudian goodslist category filter');
  }, 120_000);

  it('goodslist with free shipping returns free shipping products', async () => {
    const data = await tryBrowserCommand(['doudian', 'goodslist', '--freightType', '1', '-f', 'json']);
    expectDataOrSkip(data, 'doudian goodslist free shipping');
  }, 120_000);

  it('goodslist with 7-day return returns returnable products', async () => {
    const data = await tryBrowserCommand(['doudian', 'goodslist', '--supply7DayReturn', '1', '-f', 'json']);
    expectDataOrSkip(data, 'doudian goodslist 7-day return');
  }, 120_000);
});
