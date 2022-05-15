/**
 * Represents a parsed token.
 */
export type Token = {
    /** The parsed text value for the token. */
    value: string;
    /** Any identified TokenFlags for the token. */
    flags: TokenFlags;
    /** The position of the token within the line of input that was parsed. */
    index: number;
    /** The length of the tokens value. */
    length: number;
}

/**
 * Represents the return structure of the parse operation.
 */
export type Parsed = {
    /** The line of input that was parsed. */
    input: string;

    /** The set of parsed text tokens. */
    tokens: Token[];
}

/**
 * A callback function, which applies a style to a token.
 */
export type StyleFunction = (text: string, token?: Token) => string;

/**
 * A style definition, which maps TokenFlags to a StyleFunction.
 */
export type StyleDefinition = {
    flags: TokenFlags,
    stylize: StyleFunction,
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

