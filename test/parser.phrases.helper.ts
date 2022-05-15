import { TokenFlags } from "../src/types";
import { getEnumKeys, TokenSpec } from "./common";

// const toStrings = (items: typeof TokenFlags[]) => {
//     return items.map((item) => TokenFlags[item])
// }

export const PHRASE_TOKEN_SPECs: TokenSpec[] = [
    {
        description: "Tests a single-quoted phrase.",
        value: "'Cat and Dog'",
        flags: [TokenFlags.Phrase, TokenFlags.Quoted, TokenFlags.QuotedPhrase, TokenFlags.SingleQuoted, TokenFlags.SingleQuotedPhrase],
        index: 0,
        length: 3
    },
    {
        description: "Tests a double-quoted phrase.",
        value: '"Cat and Dog"',
        flags: [TokenFlags.Phrase, TokenFlags.Quoted, TokenFlags.QuotedPhrase, TokenFlags.DoubleQuoted, TokenFlags.DoubleQuotedPhrase],
        index: 0,
        length: 3
    },
    {
        description: "Tests a double-quoted phrase with apostrophes.",
        value: `"Dan's wife's hamster"`,
        flags: [TokenFlags.Phrase, TokenFlags.Quoted, TokenFlags.QuotedPhrase, TokenFlags.DoubleQuoted, TokenFlags.DoubleQuotedPhrase],
        index: 0,
        length: 3
    },
];