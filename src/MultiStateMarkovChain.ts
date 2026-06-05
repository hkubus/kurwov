export class MultiStateMarkovChain {
    forbidden: string[];
    finalData: Record<string, string[]> = {};
    startData: string[] = [];
    endDelimiter = '󿼏';
    stateSize: number;

    constructor(data: string[], stateSize: number = 2) {
        this.stateSize = stateSize;
        this.forbidden = Object.getOwnPropertyNames(Object.getPrototypeOf({}));
        this.#createData(data);
    }
    #createData(data: string[]): void {
        for (let item of data) {
            item += this.endDelimiter;
            const words = item.split(' ');
            this.startData.push(`${words[0]} ${words[1] ? words[1] : ''}`);
            for (let i = 0; i < words.length - this.stateSize; i++) {
                const previousWords = words.slice(Math.max(0, i - 1), Math.max(1, i + this.stateSize)).join(' ');
                const currentWord = words[i + this.stateSize];

                if (!this.finalData[previousWords]) {
                    this.finalData[previousWords] = [currentWord];
                } else {
                    this.finalData[previousWords].push(currentWord);
                }
            }
        }
    }

    getNext(current: string): string | undefined {
        if (!current) return;
        const data = this.finalData[current];
        if (!data) return;
        const random = Math.floor(Math.random() * data.length);
        if (!data[random]) return;
        return data[random].endsWith(' ') ? data[random] : `${data[random]} `;
    }

    add(item: string): void {
        const words = item.split(' ');
        this.startData.push(words[0]);
        for (let i = 0; i < words.length - 1; i++) {
            let previousWords = words.slice(Math.max(0, i - 1), Math.max(1, i + this.stateSize)).join(' ');
            if (this.forbidden.includes(previousWords)) previousWords = `${previousWords} `;
            const currentWord = words[i + this.stateSize];

            if (!this.finalData[previousWords]) {
                this.finalData[previousWords] = [currentWord];
            } else {
                this.finalData[previousWords].push(currentWord);
            }
        }
    }

    choose(sequence: string, maxLength: number): string {
        if (sequence.endsWith(`${this.endDelimiter} `) || sequence.length >= maxLength)
            return sequence.replaceAll(this.endDelimiter, '');
        const next = this.getNext(sequence.split(' ').slice(-this.stateSize).join(' '));
        if (!next) return sequence;
        sequence += ` ${next}`;
        return this.choose(sequence, maxLength);
    }
    generate(maxLength = 1000): string {
        const randomData = this.startData[Math.floor(Math.random() * this.startData.length)];
        return this.choose(randomData, maxLength);
    }
    complete(start: string, maxLength = 1000): string {
        return this.choose(start, maxLength);
    }
}
