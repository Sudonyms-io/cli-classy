import { StyleFunction, StylesType } from 'ansi-colors';
import { RegExStyle, KeywordStyle, colors } from './types';

const doubleQuote = (colors: colors.StyleFunction): RegExStyle => {
    return {
        name: "double-quote",
        type: "regex",
        styles: colors,
        pattern: /"([^"]*)"/gim
    }
}

const quote = (colors: colors.StyleFunction): RegExStyle => {
    return {
        name: "quote",
        type: "regex",
        styles: colors,
        pattern: /('(?:\.|[^'\n])*'|"(?:\.|[^"\n])*")/gim
    }
}

const singleQuote = (colors: colors.StyleFunction) => {
    return {
        name: "single-quote",
        type: "regex",
        styles: colors,
        pattern: /'(?:\.|(\\\')|[^\''\n])*'/gim
    }
}