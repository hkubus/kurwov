import { readFile } from 'node:fs/promises';
import MarkovGen from 'markov-generator';
import * as MarkovStrings from 'markov-strings';
import MarkovTypescript from 'markov-typescript';
import Corpus from 'mrkv';
import { Bench } from 'tinybench';
import { MarkovChain as Kurwov } from '../dist/index.mjs';
// replace the 10000 with the number of sentences you want to use for the benchmark
const data = (await readFile('bench.txt', 'utf8')).split('\n').slice(0, 10000);
console.log('Data size:', data.length);

const bench = new Bench()
    .add('kurwov', () => {
        const chain = new Kurwov(data);
        chain.generate();
    })
    .add('markov-typescript', () => {
        const chain = new MarkovTypescript.MarkovChain(2);
        for (const line of data) {
            chain.learn(line.split(' '));
        }
        chain.walk().join(' ');
    })
    .add('markov-generator', () => {
        const chain = new MarkovGen({
            input: data,
            minLength: 0,
        });
        chain.makeChain();
    })
    .add('markov-strings', () => {
        const chain = new MarkovStrings.default.default(2);
        chain.addData(data);
        chain.generate();
    })
    .add('mrkv', () => {
        const chain = new Corpus();
        chain.load(data);
        chain.generate();
    });
await bench.warmup();
await bench.run();

console.table(bench.table());

// foswig, mrkv, markov-chains error as of 2024-08-23 so they're not included
