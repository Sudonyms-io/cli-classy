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
    Comma = 512
}

/**
 * Mapping of TokenFlags to it's associated RegEx.
 */
const TokenFlagsRegExMap = [
    { flags: TokenFlags.Word, pattern: `(?<Word>(?<!')(\\b\\S+\\b)(?!'))` }, //`(?<Word>[\\w']+)` }, // `(?<Word>[\\w]+[']*[\\w]+)` },
    { flags: TokenFlags.DoubleQuotedWord, pattern: `(?<DoubleQuotedWord>"[\\w']+")` },
    { flags: TokenFlags.SingleQuotedWord, pattern: `(?<SingleQuotedWord>'[\\w']+')` },
    { flags: TokenFlags.BracedWord, pattern: `(?<BracedWord>\\[[\\w']+\\])` },
    { flags: TokenFlags.BracketedWord, pattern: `(?<BracketedWord>{[\\w']+})` },
    { flags: TokenFlags.DoubleQuotedPhrase, pattern: `(?<DoubleQuotedPhrase>["].*["])` },
    { flags: TokenFlags.SingleQuotedPhrase, pattern: `(?<SingleQuotedPhrase>['].*['])` },
    { flags: TokenFlags.Whitespace, pattern: `(?<Whitespace>[\\s]+)` },
    { flags: TokenFlags.Period, pattern: `(?<Period>\\.)` },
    { flags: TokenFlags.Comma, pattern: `(?<Comma>\\,)` }
]

/**
 * The RegEx that will be used to parse the line of text into tokens.
 */
const TokenFlagsRegEx = new RegExp(TokenFlagsRegExMap.map((item) => {
    return item.pattern;
}).join("|"), 'giy');

if (process.env.DEBUG || process.env.MOCHA_DEBUG) console.log(`RegExp: ${TokenFlagsRegEx}`);

/**
 * Represents a parsed token.
 */
export type Token = {
    token: string;
    flags: TokenFlags;
    index: number;
    length: number;
}

/**
 * Represents the return structure of the parse operation.
 */
export type Parsed = {
    /**
     * The line of input that was parsed.
     */
    input: string;

    /**
     * The set of parsed tokens.
     */
    tokens: Token[];
}

/**
 * Parses the input text into a set of tokens with flags that indicate the type of token.
 * @param inputs A line of text to parse.
 * @returns A parsed set of tokens.
 */
const parse = (inputs: string): Parsed => {
    let results = [];
    let matches = TokenFlagsRegEx.exec(inputs);

    
    // Break up input into "tokens"
    while (matches != null) {
        const groups = matches.groups;
        for (const group in groups) {
            // Get the named group - if it matched
            const token = groups[group];

            // Did we get a match?
            if (token !== undefined) {
                let flags = TokenFlags[group];
                
                // Add additional flags
                if ((flags & TokenFlags.Word) && (flags & TokenFlags.SingleQuoted || flags & TokenFlags.DoubleQuoted)) {
                    flags = TokenFlags.QuotedWord
                }
                // Add additional flags
                if ((flags & TokenFlags.Phrase) && (flags & TokenFlags.SingleQuoted || flags & TokenFlags.DoubleQuoted)) {
                    flags = TokenFlags.QuotedPhrase
                }
                results.push({
                    token: token,
                    flags: flags,
                    index: matches.index,
                    length: token.length
                });
            }
        }
        // Move to next match
        matches = TokenFlagsRegEx.exec(inputs);
    }

    return { input: inputs, tokens: results }
}

export default parse;