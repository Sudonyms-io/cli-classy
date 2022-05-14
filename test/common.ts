import { TokenFlags } from "../src/types";
import { greenBright, dim } from 'ansi-colors';
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
    //return replaceAll((dec >>> 0).toString(2).padStart(8, "0"), "1", bb('1'));
    return (dec >>> 0).toString(2).padStart(8, "0"); 
}

export function checkHasFlags(msg: string, token: string, flag: TokenFlags, flags: TokenFlags, log: Function) {
    const binExpected = dec2bin(flag);
    const binActual = dec2bin(flags);
    const bit = flag & flags;
    //if (process.env.MOCHA_DEBUG && log) log(`${token} has bit ${TokenFlags[flag].padEnd(20, ' ')}  (${binExpected} & ${(binActual)}): ${bit == flag}`)
    if (process.env.MOCHA_DEBUG && log) printFlagComparison(`${token} has bit ${TokenFlags[flag].padEnd(20, ' ')}`, flag, flags, log)
    expect(bit === flag, msg).to.be.true
}

export const printFlagComparison = (msg: string, flag: TokenFlags, flags: TokenFlags, log: Function)  => {
    const bFlag = dec2bin(flag);
    const bFlags = dec2bin(flags);
    const hasBits = (flag & flags) == flag;

    const as: string[] = [];
    const bs: string[] =[];

    for (let i = 0; i <= bFlag.length; i++) {
        const a = bFlag[i];
        const b = bFlags[i];
        if (a === b && a === '1') {
            as.push(greenBright.bold(a));
            bs.push(greenBright.bold(b));
        } else {
            as.push(dim(a));
            bs.push(dim(b));
        }
    }

    log(`${msg} ${as.join('')} & ${bs.join('')} = ${hasBits}`)
}
