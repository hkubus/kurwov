export class MarkovChain {
    finalData: Record<string, string[]> = {};
    startData: string[] = [];
    endDelimiter = '󿼏';
    forbidden: string[];
    constructor(data: string[]) {
        this.forbidden = Object.getOwnPropertyNames(Object.getPrototypeOf({}));
        this.#_createData(data);
    }

    async #_createData(data: string[]) {
        for (let e of data) {
            e += this.endDelimiter;
            const words: string[] = e.split(' ');
            this.startData.push(words[0]);

            words.forEach((word, i) => {
                if (this.forbidden.includes(word)) word = `${word} `;
                const next = words[i + 1];
                if (word === undefined || next === undefined) return;

                if (this.finalData[word] === undefined) {
                    this.finalData[word] = [next];
                    return;
                }

                this.finalData[word].push(next);
            });
        }
    }

    getNext(current: string): string | undefined {
        if (!current) return;
        const data = this.finalData[this.forbidden.includes(current.slice(0, -1)) ? current : current.slice(0, -1)];
        if (!data) return;
        const random = Math.floor(Math.random() * data.length);
        return data[random].endsWith(' ') ? data[random] : `${data[random]} `;
    }

    async add(data: string): Promise<void> {
        data += this.endDelimiter;
        const words = data.split(' ');

        this.startData.push(words[0]);
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const next = words[i + 1];
            if (word === undefined || next === undefined) continue;

            if (!this.finalData[word]) {
                this.finalData[word] = [next];
                continue;
            }

            this.finalData[word].push(next);
        }
    }

    generate(maxLength = 1000): string {
        const randomData = `${this.startData[Math.floor(Math.random() * this.startData.length)]} `;
        return this.choose(randomData, randomData, maxLength);
    }

    choose(current: string, sequence: string, maxLength: number): string {
        if (sequence.endsWith(`${this.endDelimiter} `)) return sequence.replaceAll(`${this.endDelimiter} `, '');
        if (sequence.length >= maxLength) return sequence;
        const next = this.getNext(current);

        if (!next) return sequence;
        sequence += next;
        return this.choose(next, sequence, maxLength);
    }

    complete(start: string, maxLength = 1000): string {
        return this.choose(start, start, maxLength);
    }
}
