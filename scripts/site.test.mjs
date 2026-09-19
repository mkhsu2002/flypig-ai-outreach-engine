import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const script = readFileSync(new URL('../docs/assets/site.js', import.meta.url), 'utf8');

function run(search = '', pathname = '/', hash = '') {
  let redirect;
  let ready;
  const document = {
    querySelector(selector) {
      const zh = selector.includes('zh-Hant');
      const path = pathname.replace(/^\/zh(?=\/|$)/, '') || '/';
      return { href: 'https://outreach-engine.flypigai.ca' + (zh ? '/zh' + (path === '/' ? '' : path) : path) };
    },
    addEventListener(name, handler) { assert.equal(name, 'DOMContentLoaded'); ready = handler; },
    getElementById() { return null; },
  };
  const context = {
    document, URL, URLSearchParams,
    location: { search, pathname, hash, replace(value) { redirect = value; } },
  };
  Object.defineProperty(context, 'localStorage', { get() { throw Error('Storage is unavailable'); } });
  vm.runInNewContext(script, context);
  return { redirect, ready, document };
}

test('normal URLs do not redirect, access storage or overwrite title', () => {
  const result = run('', '/zh/test-01');
  assert.equal(result.redirect, undefined);
  assert.equal(result.document.title, undefined);
  result.ready();
});

test('explicit legacy Chinese links preserve tracking parameters and anchors', () => {
  assert.equal(run('?lang=zh-TW&utm_source=link', '/managed-service', '#brief').redirect,
    'https://outreach-engine.flypigai.ca/zh/managed-service?utm_source=link#brief');
});

test('legacy English links resolve to the English translation', () => {
  assert.equal(run('?lang=en', '/zh/test-01').redirect, 'https://outreach-engine.flypigai.ca/test-01');
});

test('unrecognized language parameters do not cause navigation', () => {
  assert.equal(run('?lang=invalid').redirect, undefined);
});
