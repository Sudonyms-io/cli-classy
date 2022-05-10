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

export { colors }
