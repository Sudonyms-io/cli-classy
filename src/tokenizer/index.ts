const tokenizer = /(?<words>[^\s\.,!]+)|(?<spaces>[\s]+)|(?<punc>[!\.,-])/gim;

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
    IsUnknown = 1 << 16
}

const TOKENTYPELIST = [
    {
        type: TokenTypeOptions.InDoubleQuotes,
        pattern: /\"[^"]*\"/gim
    },
    {
        type: TokenTypeOptions.IsWhitespace,
        pattern: /[\s]+/gim,
    },
    {
        type: TokenTypeOptions.InBrackets,
        pattern: /\[[^\]]*\]/gim
    },
    {
        type: TokenTypeOptions.InParenthesis,
        pattern: /\([^\)]*\)/gim
    },
    {
        type: TokenTypeOptions.InBraces,
        pattern: /\{[^\}]*\}/gim
    },
    {
        type: TokenTypeOptions.IsNumeric,
        pattern: /^\d+$(\.\d+)?/gim
    },
    {
        type: TokenTypeOptions.IsPunctuation,
        pattern: /[!,\.]+/gim
    },
    {
        type: TokenTypeOptions.IsDate,
        pattern: /([\d]+)([\-\./])([\d]+)([\-\./])([\d]+)|((Jan(|uary)|Feb(|ruary)|Mar(|ch)|Apr(|il)|May|Jun(|e)|Jul(|y)|Aug(|ust)|Sept(|ember)|Oct(|ober)|(Nov|Dec)(|ember))([\s\-])(|([\d]+){1,2}([\s\-]|\, ))([\d]+){4})/gim
    }
]

const findTokenType = (token: string) => {

    let match: TokenTypeOptions; //TokenTypeOptions.IsUnknown;

    TOKENTYPELIST.forEach((def) => {
        if(def.pattern.test(token)) match = match | def.type
    })

    return (match) ? match : TokenTypeOptions.IsUnknown;
}

type Parsed = {
    name: string;
    type: TokenTypeOptions,
    token: any;
}

const parse = (text: string): Parsed[] => {
    const ast = [];
    text.match(tokenizer).forEach((token) => {
        const tokenType = findTokenType(token);
        const name = TokenTypeOptions[tokenType];
        ast.push({
            type: tokenType,
            name: (name), //? name : 'combined',
            token: token
        });
    });
    return ast;
}

export { TokenTypeOptions }
export default parse;