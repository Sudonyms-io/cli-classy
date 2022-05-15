import * as colors from 'ansi-colors';

export type StyleDefinition = {
    flags: TokenFlags,
    style: Function,
    clearTokens?: boolean;
}

/**
 * Set of flags that indicate characterisics of a parsed token.
 */
export enum TokenFlags {
    Token = 0,
    Whitespace = 1,
    Word = 2,
    Phrase = 4,
    SingleQuoted = 8,
    SingleQuotedWord = Word | SingleQuoted,
    SingleQuotedPhrase = Phrase | SingleQuoted,
    DoubleQuoted = 16,
    DoubleQuotedWord = Word | DoubleQuoted,
    DoubleQuotedPhrase = Phrase | DoubleQuoted,
    Quoted = SingleQuoted | DoubleQuoted,
    QuotedWord = Word | Quoted,
    QuotedPhrase = Phrase | Quoted,
    Braced = 32,
    BracedWord = Word | Braced,
    BracedPhrase = Phrase | Braced,
    Bracketed = 64,
    BracketedWord = Word | Bracketed,
    BracketedPhrase = Phrase | Bracketed,
    Parenthesis = 128,
    Period = 256,
    Comma = 512,
    Exclamation = 1024,
    Punctuation = Period | Comma | Exclamation
}

export { colors }
