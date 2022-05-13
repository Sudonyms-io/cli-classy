import { TokenFlags } from "../src/tokenizer";
import { getEnumKeys, TokenSpec } from "./common";

// const toStrings = (items: typeof TokenFlags[]) => {
//     return items.map((item) => TokenFlags[item])
// }

export const PHRASE_TOKEN_SPECs: TokenSpec[] = [
    {
        description: "Tests a single-quoted phrase.",
        token: "'Cat and Dog'",
        flags: [TokenFlags.Phrase, TokenFlags.Quoted, TokenFlags.QuotedPhrase, TokenFlags.SingleQuoted, TokenFlags.SingleQuotedPhrase],
        index: 0,
        length: 3
    },
    {
        description: "Tests a single-quoted phrase with apostrophes.",
        token: `'Dan's wife's hamster'`,
        flags: [TokenFlags.Phrase, TokenFlags.Quoted, TokenFlags.QuotedPhrase, TokenFlags.DoubleQuoted, TokenFlags.DoubleQuotedPhrase],
        index: 0,
        length: 3
    },
    {
        description: "Tests a double-quoted phrase.",
        token: '"Cat and Dog"',
        flags: [TokenFlags.Phrase, TokenFlags.Quoted, TokenFlags.QuotedPhrase, TokenFlags.DoubleQuoted, TokenFlags.DoubleQuotedPhrase],
        index: 0,
        length: 3
    },
    {
        description: "Tests a double-quoted phrase with apostrophes.",
        token: `"Dan's wife's hamster"`,
        flags: [TokenFlags.Phrase, TokenFlags.Quoted, TokenFlags.QuotedPhrase, TokenFlags.DoubleQuoted, TokenFlags.DoubleQuotedPhrase],
        index: 0,
        length: 3
    },
];