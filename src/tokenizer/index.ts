//const tokenizer = /(["'{\[].*?["'}\]])|(\s)+|([^\s\.]+)|([\.,])+/g
const tokenizer = /(?<Word>[\w']+)|(?<DoubleQuotedWord>"[\w]+")|(?<SingleQuotedWord>'[\w']+')|(?<BracedWord>\[[\w']+\])|(?<BracketedWord>{[\w']+})|(?<dqphrase>["'].*["'])|(?<Whitespace>[\s]+)/g

const getFilePattern = () => {
    return /^([a-zA-Z]):[\\\/]((?:[^<>:"\\\/\|\?\*]+[\\\/])*)([^<>:"\\\/\|\?\*]+)\.([^<>:"\\\/\|\?\*\s]+)$/gim;
}

enum RegExTokenFlags {
    IsWord = 1 << 0,
    IsPhrase = 1 << 1,
    IsWhitespace = 1 << 2,
    IsSingleQuoted = 1 << 3,
    IsDoubleQuoted = 1 << 4,
    IsBraced = 1 << 5,
    IsBracketed = 1 << 6,
    IsPunctuation = 1 << 15,
}

enum CompositeTokenFlags {
    IsQuoted = RegExTokenFlags.IsDoubleQuoted | RegExTokenFlags.IsSingleQuoted,
    SingleQuotedPhrase = RegExTokenFlags.IsPhrase | RegExTokenFlags.IsSingleQuoted,
    DoubleQuotedPhrase = RegExTokenFlags.IsPhrase | RegExTokenFlags.IsDoubleQuoted,
    QuotedPhrase = RegExTokenFlags.IsPhrase | IsQuoted,
    SingleQuotedWord = RegExTokenFlags.IsWord | RegExTokenFlags.IsSingleQuoted,
    DoubleQuotedWord = RegExTokenFlags.IsWord | RegExTokenFlags.IsDoubleQuoted,
    QuotedWord = RegExTokenFlags.IsWord | IsQuoted,

    // What the devil be ye?
    IsUnknown = 0
}

const TokenFlags = { ...CompositeTokenFlags, ...RegExTokenFlags }

type TokenFlags = RegExTokenFlags | CompositeTokenFlags;

const TokenFlagRegExMap = [
    { isComposite: false, flags: RegExTokenFlags.IsWord, pattern: /^[{\["']?[\w']+[}\]"']?$/ },
    { isComposite: false, flags: RegExTokenFlags.IsPhrase, pattern: /\b(\s)+\b/ },
    { isComposite: false, flags: RegExTokenFlags.IsWhitespace, pattern: /^[\s]+$/ },
    { isComposite: false, flags: RegExTokenFlags.IsSingleQuoted, pattern: /^['](.)+[']$/ },
    { isComposite: false, flags: RegExTokenFlags.IsDoubleQuoted, pattern: /^["](.)+["]$/ },
    { isComposite: false, flags: RegExTokenFlags.IsBraced, pattern: /^[\[](.)+[\]]$/ },
    { isComposite: false, flags: RegExTokenFlags.IsBracketed, pattern: /^[{](.)+[}]$/ },
    { isComposite: false, flags: RegExTokenFlags.IsPunctuation, pattern: /^[.,]$/ }
];

const TokenFlagCompositeMap = [
    { isComposite: true, flags: CompositeTokenFlags.IsUnknown, pattern: null },
    { isComposite: true, flags: CompositeTokenFlags.IsQuoted, pattern: RegExTokenFlags.IsSingleQuoted | RegExTokenFlags.IsDoubleQuoted }, ///^['"](.)+['"]$/ },
    { isComposite: true, flags: CompositeTokenFlags.SingleQuotedPhrase, pattern: null },
    { isComposite: true, flags: CompositeTokenFlags.DoubleQuotedPhrase, pattern: null },
    { isComposite: true, flags: CompositeTokenFlags.SingleQuotedWord, pattern: RegExTokenFlags.IsWord | CompositeTokenFlags.IsQuoted },
    { isComposite: true, flags: CompositeTokenFlags.DoubleQuotedWord, pattern: null },
    { isComposite: true, flags: CompositeTokenFlags.QuotedPhrase, pattern: null },
    { isComposite: true, flags: CompositeTokenFlags.QuotedWord, pattern: null }
];

type TokenFlagMap = {
    flags: TokenFlags;
    flagNames: string[]
}

const mapFlagsToTokens = (token): TokenFlagMap => {
    let flags: TokenFlags = TokenFlags.IsUnknown;
    const flagNames: string[] = [];

    // Process regex flags
    TokenFlagRegExMap.filter((def) => {
        return (def.isComposite === false) ? def.pattern.test(token) : false;
    }).forEach((tokenMap) => {
        flags = flags | tokenMap.flags;
        flagNames.push(TokenFlags[tokenMap.flags]);
    });

    // Process composite flags
    TokenFlagCompositeMap.filter((tokenMap) => {
        return tokenMap.flags === flags;
    }).forEach((tokenMap) => {
        flags = flags | tokenMap.flags;
        flagNames.push(TokenFlags[tokenMap.flags]);
    });

    return { flags, flagNames };
}

export type Token = {
    token: any;
    index: number;
    length: number;
    flags: RegExTokenFlags | CompositeTokenFlags;
    flagNames: string[];
}

const parse = (text: string): TokenMap => {
    const tokens: Token[] = [];
    const matches = text.matchAll(tokenizer);
    console.log(matches);
    return;

    for (const match of matches) {
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
