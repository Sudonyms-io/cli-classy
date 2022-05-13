//const tokenizer = /(?<DoubleQuotedPhrase>["'].*["'])|(?<Whitespace>[\s]+)/gm
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
    Parenthesis = 128
}

const TokenFlagsRegExMap = [
    { flags: TokenFlags.Word, pattern: `(?<Word>[\\w]+[']*[\\w]+)` },
    { flags: TokenFlags.DoubleQuotedWord, pattern: `(?<DoubleQuotedWord>"[\\w']+")` },
    { flags: TokenFlags.SingleQuotedWord, pattern: `(?<SingleQuotedWord>'[\\w']+')` },
    { flags: TokenFlags.BracedWord, pattern: `(?<BracedWord>\\[[\\w']+\\])` },
    { flags: TokenFlags.BracketedWord, pattern: `(?<BracketedWord>{[\\w']+})` }
]

const TokenFlagsRegEx = new RegExp(TokenFlagsRegExMap.map((item) => {
    return item.pattern;
}).join("|"), 'giy');

//console.log(TokenFlagsRegEx)

const init = (input) => {
    return {
        token: undefined,
        flags: TokenFlags.Token,
        index: 0,
        length: 0
    }
}

const parse = (text: string) => {
    let matches = TokenFlagsRegEx.exec(text);
    let results = [];
    

    while (matches != null) {
        const groups = matches.groups;
        for (const group in groups) {
            const token = groups[group];
            if (token !== undefined) {
                let flags = TokenFlags[group];
                //flags = (flags & (TokenFlags.SingleQuoted && TokenFlags.Word)) ? TokenFlags.QuotedWord : flags
                if ((flags & TokenFlags.Word) && (flags & TokenFlags.SingleQuoted || flags & TokenFlags.DoubleQuoted)) {
                    flags = TokenFlags.QuotedWord
                }
                results.push({
                    token: token,
                    flags: flags,
                    index: matches.index,
                    length: token.length
                });
            }
        }
        matches = TokenFlagsRegEx.exec(text);
    }

    return { tokens: results }
}

export default parse;