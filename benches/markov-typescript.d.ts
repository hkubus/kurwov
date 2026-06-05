declare module 'markov-typescript' {
    declare namespace markov {
        declare class MarkovChain<T> {
            public readonly order: number;
            // its MarkovChainItems<T> and MarkovTerminalItems<T> but im not gonna port all of that
            protected readonly items: unknown;
            protected readonly terminals: unknown;

            protected readonly toStrFunction: (key: T) => string;

            constructor(order?: number, toStrFunction?: (key: T) => string);
            learnAll(items: T[][]): void;
            learn(items: T[]): void;

            private learnWithPrevious(previous: ChainState<T>, next: T): void;

            walk(): T[];
            walkWithPrevious(previous: T[]): T[];
        }
    }
    export = markov;
}
