
import { TokenFlags } from "../src/types";

const getTokenNames = (flags: TokenFlags[]) => {
    return flags.map((flag) => {
        return TokenFlags[flag]
    });
}
  
export const WORD_TOKEN_SPECs = [
    {   
        description: "Tests a single word.",
        value: "dog",
        flags: [TokenFlags.Word],
        index: 0,
        length: 3
    },
    {
        description: "Tests a single letter.",
        value: "a",
        flags: [TokenFlags.Word],
        index: 0,
        length: 1
    },
    {   
        description: "Tests a single word with an apostro'phe.",
        value: "she's",
        flags: [TokenFlags.Word],
        index: 0,
        length: 5
    },
    {        
        description: "Tests a single word in 'single' quotes.",
        value: "'cat'",
        flags: [TokenFlags.Word, TokenFlags.SingleQuoted, TokenFlags.SingleQuotedWord, TokenFlags.QuotedWord],
        index: 0,
        length: 5
    },
    {
        description: "Tests a single word in \"double\" quotes.",
        value: "\"cat\"",
        flags: [TokenFlags.Word,TokenFlags.DoubleQuoted, TokenFlags.Quoted,TokenFlags.SingleQuoted, TokenFlags.SingleQuotedWord],
        index: 0,
        length: 5
    },
    {
        description: "Tests a single word in [braces].",
        value: "[cat]",
        flags: [TokenFlags.Word, TokenFlags.Braced],
        index: 0,
        length: 5
    },
    {
        description: "Tests a single word in {brackets}.",
        value: "{dog}",
        flags: [TokenFlags.Word, TokenFlags.Bracketed],
        index: 0,
        length: 5
    }
]