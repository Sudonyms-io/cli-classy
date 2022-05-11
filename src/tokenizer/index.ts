const tokenizer = /(["'{\[].*?["'}\]])|(\s)+|([^\s\.]+)|([\.,])+/g

enum TokenTypeOptions {
    InBraces = 1 << 0,
    InBrackets = 1 << 1,
    InDoubleQuotes = 1 << 2,
    InParenthesis = 1 << 3,
    InQuotes = 1 << 4,
    IsDate = 1 << 5,
    IsNumeric = 1 << 6,
    IsPunctuation = 1 << 7,
    IsEndPuncuation = 1 << 8,
    IsWhitespace = 1 << 9,
    IsFilePath = 1 << 10,
    IsUnknown = 1 << 16
}

const getFilePattern = () => {
    return /^([a-zA-Z]):[\\\/]((?:[^<>:"\\\/\|\?\*]+[\\\/])*)([^<>:"\\\/\|\?\*]+)\.([^<>:"\\\/\|\?\*\s]+)$/gim;
}

enum TokenFlags {
    IsWord = 1 << 0,
    IsPhrase = 1 << 1,
    IsWhitespace = 1 << 2,
    IsQuoted = 1 << 3,
    IsSingleQuoted = 1 << 4,
    IsDoubleQuoted = 1 << 5,
    IsBraced = 1 << 6,
    IsBracketed = 1 << 7,
    IsPunctuation = 1 << 15,

    // What the devil be ye?
    IsUnknown = 1 << 16
}

const TokenFlagMapDefs = [
    { type: TokenFlags.IsWord, pattern: /^[{\["']?[\w']+[}\]"']?$/ },
    { type: TokenFlags.IsPhrase, pattern: /\b(\s)+\b/ },
    { type: TokenFlags.IsWhitespace, pattern: /^[\s]+$/ },
    { type: TokenFlags.IsQuoted, pattern: /^['"](.)+['"]$/ },
    { type: TokenFlags.IsSingleQuoted, pattern: /^['](.)+[']$/ },
    { type: TokenFlags.IsDoubleQuoted, pattern: /^["](.)+["]$/ },
    { type: TokenFlags.IsBraced, pattern: /^[\[](.)+[\]]$/ },
    { type: TokenFlags.IsBracketed, pattern: /^[{](.)+[}]$/ },
    { type: TokenFlags.IsPunctuation, pattern: /^[.,]$/ }
]
type TokenFlagMap = {
    flags: TokenFlags,
    flagNames: string[]
}
const mapFlagsToTokens = (token): TokenFlagMap => {
    const defs = TokenFlagMapDefs.filter((def) => {
        const result = def.pattern.test(token);
        return result;
    });
    
    if (defs.length == 0) {
        return { flags: TokenFlags.IsUnknown, flagNames: [TokenFlags[TokenFlags.IsUnknown]] };
    } else {
        let defType: TokenFlags;
        let defTypeNames: string[] = [];

        defs.forEach((def) => {
            defType = defType | def.type;
            const t = TokenFlags[def.type]
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

export type TokenMap = {
    tokens: Token[];
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

export { TokenTypeOptions }
export default parse;