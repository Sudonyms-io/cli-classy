import * as colors from 'ansi-colors';

export type StyleBase = {
    name: string;
    styles: colors.StyleFunction
    type: string;
}

export type RegExStyle = StyleBase & {
    pattern: RegExp;
    type: "regex";
}

export type KeywordStyle = StyleBase & {
    keywords: string[];
    type: "keyword";
}

export type Style = KeywordStyle | RegExStyle;

export type StyleCollection = Style[];

export type Stylesheet = {
    flags: TokenFlags,
    style: Function
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
