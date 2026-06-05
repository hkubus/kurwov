declare module 'markov-generator' {
    export interface MarkovProps {
        input: string[];
        minLength?: number;
        bannedTerminals?: string[];
    }

    declare class Markov {
        private props: MarkovProps;
        private terminals: Record<string, number>;
        private startWords: string[];
        private wordStats: Record<string, string[]>;
        private bannedTerminals;

        constructor(props: MarkovProps);

        /**
         * Creates a new string via a Markov chain based on the input array from the constructor
         * @param minLength - The minimum number of words in the generated string
         * @return The generated string
         */
        makeChain(minLength?: number): string;

        private isBannedTerminal(word: string): boolean;
        private choice(a: string[]): string;
    }

    export = Markov;
}
