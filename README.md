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
Generating sentences | ✔️ | ✔️ | ✔️ | ✔️ | ❌ (errors) | ❌ (errors)
Completing sentences | ✔️ | ❌ | ❌ | ❌ | ❌ |  ✔️
Higher statesize  support | ✔️ | ✔️ | ❌ | ✔️ | ❌ |  ❌ 
Adding stuff other than strings | ❌ | ✔️ | ❌ | ❌ | ✔️ | ❌ |
Total package size | 16.6KB | 1.4MB | 7.9KB* | 1.4MB | 51KB | 20KB

If you use markov chains to generate sentences, kurwov is far better than other libraries. It's the fastest and smallest package in the comparison, and has typings.
\* While markov-generator is only 7.9KB, it doesn't include ESM support and doesn't include typings. It also doesn't support higher statesizes which results in less code. 
## Speed
Benchmarks ran on a 6c/12t AMD Ryzen 5 5600 @ 4.45GHz with 32gb ddr4 3200mhz RAM on Ubuntu through WSL2 with Node.js v22.5.1
Using data from [amazon q/a dataset](https://cseweb.ucsd.edu/~jmcauley/datasets/amazon/qa/), using the first n (10k or 100k) answers from the electronics dataset.


### kurwov speed compared to other markov packages
Benchmark | kurwov | markov-typescript | markov-generator | markov-strings | markov-chains, foswig, mrkv
--- | --- | --- | --- | --- | ---
Generating a dataset with 10000 sentences. | 64.30ms | 458.90ms | 127.63ms | 1507.75ms | N/A (errored) 
Generating a dataset with 100000 sentences. | 1046.55ms | 5815.11ms | 8844.53ms | 78044.7619ms | N/A (errored)

### kurwov speed compared to other markov packages with higher statesize
Benchmark | kurwov | markov-typescript | markov-strings 
Generating a dataset with 10000 sentences. | 182.08ms | 702.25ms | 1349.19ms
Generating a dataset with 100000 sentences. | 3481.44ms | 10154.96ms | 77600.49ms
