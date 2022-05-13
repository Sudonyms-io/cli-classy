import { TokenFlags } from "../src/tokenizer";
import { TokenSpec } from "./common";

const getTokenNames = (flags: TokenFlags[]) => {
    return flags.map((flag) => {
        return TokenFlags[flag]
    });
}
  
export const WORD_TOKEN_SPECs = [
    {   
        description: "Tests a single word.",
        token: "dog",
        flags: [TokenFlags.Word],
        index: 0,
        length: 3
    },
    {
        description: "Tests a single letter.",
        token: "a",
        flags: [TokenFlags.Word],
        index: 0,
        length: 1
    },
    {   
        description: "Tests a single word with an apostro'phe.",
        token: "she's",
        flags: [TokenFlags.Word],
        index: 0,
        length: 5
    },
    {        
        description: "Tests a single word in 'single' quotes.",
        token: "'cat'",
        flags: [TokenFlags.Word, TokenFlags.SingleQuoted, TokenFlags.SingleQuotedWord, TokenFlags.QuotedWord],
        index: 0,
        length: 5
    },
    {
        description: "Tests a single word in \"double\" quotes.",
        token: "\"cat\"",
        flags: [TokenFlags.Word,TokenFlags.DoubleQuoted, TokenFlags.Quoted,TokenFlags.SingleQuoted, TokenFlags.SingleQuotedWord],
        index: 0,
        length: 5
    },
    {
        description: "Tests a single word in [braces].",
        token: "[cat]",
        flags: [TokenFlags.Word, TokenFlags.Braced],
        index: 0,
        length: 5
    },
    {
        description: "Tests a single word in {brackets}.",
        token: "{dog}",
        flags: [TokenFlags.Word, TokenFlags.Bracketed],
        index: 0,
        length: 5
    }
]