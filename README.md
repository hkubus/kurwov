<h1 align=center> kurwov </h1>
A fast, dependency-free library for creating Markov Chains.


## API
Generating a dataset.
```ts
import { MarkovData } from 'kurwov';
const sentences = ['i love hamburgers', 'i love cats'];
const chain = new MarkovChain(sentences);
```

Using your dataset to generate a sentence.
```ts
chain.generate(); // i love hamburgers or i love cats
```

Adding an sentence to the dataset.
```ts
chain.add('i love dogs');
```

Completing a sentence.
```ts
chain.complete({ data, start: 'i love' }); // i love dogs, i love hamburgers, or i love cats
```
## Comparison
Feature | kurwov | markov-typescript | markov-generator | markov-strings | markov-chains | mrkv
--- | --- | --- | --- | --- | --- | --- 
Dependency-free | ✔️ | ❌ | ✔️ | ❌ | ❌ | ✔️ 
Typings | ✔️ | ❌ | ❌ | ❌ (incorrect) | ❌ | ✔️ 
Generating sentences | ✔️ | ✔️ | ✔️ | ✔️ | ❌ (errors) | ✔️
Completing sentences | ✔️ | ❌ | ❌ | ❌ | ❌ |  ✔️
Higher statesize  support | ✔️ | ✔️ | ❌ | ✔️ | ❌ |  ❌ 
Adding stuff other than strings | ❌ | ✔️ | ❌ | ❌ | ✔️ | ❌ |
Total package size | 16.9KB | 1.38MB | 7.9KB* | 636.9KB | 49.6KB | 15.43KB

If you use markov chains to generate sentences, kurwov is far better than other libraries. It's the fastest and smallest package in the comparison, and has typings.

\* While markov-generator is only 7.9KB, it doesn't include ESM support and doesn't include typings. It also doesn't support higher statesizes which results in less code. 
## Speed
Benchmarks ran on a 6c/12t AMD Ryzen 5 7600X @ 5.3GHz with 32gb ddr5 6000MHZ RAM on CachyOS with Node.js v26.1.0
Using data from [amazon q/a dataset](https://cseweb.ucsd.edu/~jmcauley/datasets/amazon/qa/), using the first n (10k or 100k) answers from the electronics dataset.


### kurwov speed compared to other markov packages
Benchmark | kurwov | markov-typescript | markov-generator | markov-strings | mrkv | markov-chains, foswig
--- | --- | --- | --- | --- | --- | ---
Generating a dataset with 10000 sentences. | 46.31ms | 690.60ms | 782.95ms | 996.24ms | 243.54ms | N/A (errored) 
Generating a dataset with 100000 sentences. | 692.35ms | 8332.901ms | 85632.84ms | 39130.50ms | 2845.63ms | N/A (errored)
Creating a sentence from a 10k dataset | 6026.28ns | 121402.97ns | 9288.93ns | 420396460.80ns | 11297.58ns | N/A (errored)
