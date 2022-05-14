import { TokenFlags } from "../src/tokenizer";
import { blueBright, greenBright} from 'ansi-colors';
import { expect } from "chai";
const bb = greenBright;

/**
 * Utility type for testing tokens.
 */
export type TokenSpec = {
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
export function replaceAll(text: string, search: string, replace: string) {
    return text.split(search).join(replace);
}

export function dec2bin(dec) {
    return replaceAll((dec >>> 0).toString(2).padStart(8, "0"), "1", bb('1'));
}

export function checkHasFlags(msg: string, token: string, flag: TokenFlags, flags: TokenFlags, log: Function) {
    const binExpected = dec2bin(flag);
    const binActual = dec2bin(flags);
    const bit = flag & flags;
    if (process.env.MOCHA_DEBUG && log) log(`${token} has bit ${TokenFlags[flag].padEnd(20, ' ')}  (${binExpected} & ${(binActual)}): ${bit == flag}`)
    expect(bit === flag, msg).to.be.true
}
export class Logger {

    constructor() {
        this.buffer = [];
    }

    private buffer: string[] = [];

    log(msg: any) {
        this.buffer.push(msg);
    }

    flush() {
        while(this.buffer.length) {
            console.log(this.buffer.shift());
        }
    }
}

