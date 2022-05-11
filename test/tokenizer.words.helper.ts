import { TokenFlags } from "../src/tokenizer";
import { TokenSpec } from "./common";
  
export const WORD_TOKEN_SPECs: TokenSpec[] = [
    {   
        description: "Tests a single word.",
        token: "dog",
        flags: TokenFlags.IsWord,
        flagNames: [TokenFlags[TokenFlags.IsWord]],
        index: 0,
        length: 3
    },
    {   
        description: "Tests a single word with an apostro'phe.",
        token: "she's",
        flags: TokenFlags.IsWord,
        flagNames: [TokenFlags[TokenFlags.IsWord]],
        index: 0,
        length: 5
    },
    {        
        description: "Tests a single word in 'single' quotes.",
        token: "'cat'",
        flags: TokenFlags.IsWord | TokenFlags.IsQuoted | TokenFlags.IsSingleQuoted,
        flagNames: [
            TokenFlags[TokenFlags.IsWord],
            TokenFlags[TokenFlags.IsQuoted],
            TokenFlags[TokenFlags.IsSingleQuoted]],
        index: 0,
        length: 5
    },
    {
        description: "Tests a single word in \"double\" quotes.",
        token: "\"cat\"",
        flags: TokenFlags.IsWord | TokenFlags.IsQuoted | TokenFlags.IsDoubleQuoted,
        flagNames: [
            TokenFlags[TokenFlags.IsWord],
            TokenFlags[TokenFlags.IsQuoted],
            TokenFlags[TokenFlags.IsDoubleQuoted]],
        index: 0,
        length: 5
    },
    {
        description: "Tests a single word in [braces].",
        token: "[cat]",
        flags: TokenFlags.IsWord | TokenFlags.IsBraced,
        flagNames: [
            TokenFlags[TokenFlags.IsWord],
            TokenFlags[TokenFlags.IsBraced]
        ],
        index: 0,
        length: 5
    },
    {
        description: "Tests a single word in {brackets}.",
        token: "{dog}",
        flags: TokenFlags.IsWord | TokenFlags.IsBracketed,
        flagNames: [
            TokenFlags[TokenFlags.IsWord],
            TokenFlags[TokenFlags.IsBracketed]
        ],
        index: 0,
        length: 5
    }
]