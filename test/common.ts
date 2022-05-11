import { Token, TokenFlags } from "../src/tokenizer";

/**
 * Utility type for testing tokens.
 */
export type TokenSpec = Token & {
    description: string;
    [key: string]: any;
}

export const getEnumValues = <T>(e: T): number[] => {
    const items = Object.values(e);
    const count = items.length / 2;
    return items.splice(count);
}

export const getEnumKeys = <T>(e: T): string[] => {
    const items = Object.keys(e);
    const count = items.length / 2;
    return items.splice(count);
}

