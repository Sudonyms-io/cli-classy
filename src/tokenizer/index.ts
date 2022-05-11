const tokenizer = /(["'{\[].*?["'}\]])|(\s)+|([^\s\.]+)|([\.,])+/g

const getFilePattern = () => {
    return /^([a-zA-Z]):[\\\/]((?:[^<>:"\\\/\|\?\*]+[\\\/])*)([^<>:"\\\/\|\?\*]+)\.([^<>:"\\\/\|\?\*\s]+)$/gim;
}

enum TokenFlags {
    IsWord = 1 << 0,
    IsPhrase = 1 << 1,
    IsWhitespace = 1 << 2,    
    IsSingleQuoted = 1 << 3,
    IsDoubleQuoted = 1 << 4,
    IsBraced = 1 << 5,
    IsBracketed = 1 << 6,
    IsPunctuation = 1 << 15,
    // Extended
    IsQuoted = IsDoubleQuoted | IsSingleQuoted,
    SingleQuotedPhrase = IsPhrase | IsSingleQuoted,
    DoubleQuotedPhrase = IsPhrase | IsDoubleQuoted,
    QuotedPhrase = IsPhrase | IsQuoted,
    SingleQuotedWord = IsWord | IsSingleQuoted,
    DoubleQuotedWord = IsWord | IsDoubleQuoted,
    QuotedWord = IsWord | IsQuoted,

    // What the devil be ye?
    IsUnknown = 1 << 16
}

/**
 * Alias for TokenFlags.
 */
const a_tf = TokenFlags;

const TokenFlagRegExMap = [
    { type: a_tf.IsWord, pattern: /^[{\["']?[\w']+[}\]"']?$/ },
    { type: a_tf.IsPhrase, pattern: /\b(\s)+\b/ },
    { type: a_tf.IsWhitespace, pattern: /^[\s]+$/ },
    { type: a_tf.IsQuoted, pattern: /^['"](.)+['"]$/ },
    { type: a_tf.IsSingleQuoted, pattern: /^['](.)+[']$/ },
    { type: a_tf.IsDoubleQuoted, pattern: /^["](.)+["]$/ },
    { type: a_tf.IsBraced, pattern: /^[\[](.)+[\]]$/ },
    { type: a_tf.IsBracketed, pattern: /^[{](.)+[}]$/ },
    { type: a_tf.IsPunctuation, pattern: /^[.,]$/ },
    { type: a_tf.IsUnknown, pattern: null },
    { type: a_tf.SingleQuotedPhrase, pattern: null },
    { type: a_tf.DoubleQuotedPhrase, pattern: null },
    { type: a_tf.SingleQuotedWord, pattern: null },
    { type: a_tf.DoubleQuotedWord, pattern: null },
    
    { type: a_tf.QuotedPhrase, pattern: null },
    
    { type: a_tf.QuotedWord, pattern: null }
]
type TokenFlagMap = {
    flags: TokenFlags,
    flagNames: string[]
}
const mapFlagsToTokens = (token): TokenFlagMap => {
    const defs = TokenFlagRegExMap.filter((def) => {
        return (def.pattern !== null) ? def.pattern.test(token) : false;
    });
    
    if (defs.length == 0) {
        return { flags: a_tf.IsUnknown, flagNames: [a_tf[a_tf.IsUnknown]] };
    } else {
        let defType: TokenFlags;
        let defTypeNames: string[] = [];

        defs.forEach((def) => {
            defType = defType | def.type;
            const t = a_tf[def.type]
            defTypeNames.push(t)
        });

        return { flags: defType, flagNames: defTypeNames };
    }
}

export type Token = {
    token: any;
    index: number;
    length: number;
    flags: TokenFlags;
    flagNames: string[];    
}

const parse = (text: string): TokenMap => {
    const tokens: Token[] = [];
    const matches = text.matchAll(tokenizer);

    for(const match of matches) {
        const token = match[0];
        const index = match.index;
        const { flags, flagNames } = mapFlagsToTokens(token);
        tokens.push({
            token: token,
            index: index,
            length: token.length,
            flags: flags,
            flagNames: flagNames
        });
    }
    
    return { tokens: tokens };
}

export type TokenMap = {
    tokens: Token[];
}

export default parse
export { TokenFlags, TokenFlagRegExMap }
