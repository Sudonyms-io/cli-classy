import { TokenFlags } from "../src/tokenizer";
import { getEnumKeys, TokenSpec } from "./common";

// const toStrings = (items: typeof TokenFlags[]) => {
//     return items.map((item) => TokenFlags[item])
// }

export const PHRASE_TOKEN_SPECs: TokenSpec[] = [
    // {
    //     description: "Tests a single phrase.",
    //     token: "'dogs and cats'",
    //     flags: TokenFlags.IsPhrase | TokenFlags.DoubleQuotedPhrase | TokenFlags.QuotedPhrase | TokenFlags.SingleQuotedPhrase,
    //     flagNames: toStrings([TokenFlags.IsPhrase | TokenFlags.DoubleQuotedPhrase | TokenFlags.QuotedPhrase | TokenFlags.SingleQuotedPhrase]),
    //     index: 0,
    //     length: 15
    // }
];