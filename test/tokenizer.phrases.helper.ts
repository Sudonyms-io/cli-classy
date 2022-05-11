import { TokenFlags } from "../src/tokenizer";
import { TokenSpec } from "./common";

export const PHRASE_TOKEN_SPECs: TokenSpec[] = [
    {
        description: "Tests a single phrase.",
        token: "'dogs and cats'",
        flags: TokenFlags.SingleQuotedPhrase,
        flagNames: [TokenFlags[TokenFlags.SingleQuotedPhrase]],
        index: 0,
        length: 15
    }
];