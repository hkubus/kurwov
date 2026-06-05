import assert from 'node:assert/strict';
import { test } from 'node:test';
import { MarkovChain, MultiStateMarkovChain } from '../src/index.ts';

const testingData = ['i like cats', 'i like dogs', 'hi im john', 'hi im kubus'];
// TODO: add actual tests
test('MultiStateMarkovChain', () => {
    const chain = new MultiStateMarkovChain(testingData, 2);
    assert.strictEqual(chain.startData.length, 4);
    assert.strictEqual(Object.keys(chain.finalData).length, 2);
});
test('MarkovChain', () => {
    const chain = new MarkovChain(testingData);
    assert.strictEqual(chain.startData.length, 4);
    assert.strictEqual(Object.keys(chain.finalData).length, 4);
});
test('MarkovChain generating', () => {
    const chain = new MarkovChain(testingData);
    const generated = chain.generate();
    assert.strictEqual(typeof generated, 'string');
    assert.notStrictEqual(generated, '');
    assert.match(generated, /i like (cats|dogs)|hi im (john|kubus)/);
});
test('MultiStateMarkovChain generating', () => {
    const chain = new MultiStateMarkovChain(testingData, 2);
    const generated = chain.generate();
    assert.strictEqual(typeof generated, 'string');
    assert.notStrictEqual(generated, '');
    assert.match(generated, /i like (cats|dogs)|hi im (john|kubus)/);
});
