export type Constructor<T = object> = new (...args: unknown[]) => T;

export type Key<T> = Token<T> | Constructor<T> | string;

export type TokenIdentifier = symbol;

export class Token<T> {
    private readonly _type!: T;

    readonly identifier: TokenIdentifier;

    private constructor(public readonly description: string) {
        this.identifier = Symbol(description);
    }

    private static classCache = new WeakMap<Function, Token<unknown>>();
    private static stringCache = new Map<string, Token<unknown>>();

    static for<T>(description: string): Token<T> {
        if (!Token.stringCache.has(description)) {
            Token.stringCache.set(description, new Token<T>(description));
        }
        return Token.stringCache.get(description) as Token<T>;
    }

    static fromClass<T>(ctor: Constructor<T>): Token<T> {
        if (!Token.classCache.has(ctor)) {
            Token.classCache.set(ctor, new Token<T>(ctor.name));
        }
        return Token.classCache.get(ctor) as Token<T>;
    }
}
