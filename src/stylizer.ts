import * as colors from 'ansi-colors';

type StyleBase = {
    name: string;
    styles: colors.StyleFunction
    type: string;
}

type RegExStyle = StyleBase & {
    pattern: RegExp;
    type: "regex";
}

type KeywordStyle = StyleBase & {
    keywords: string[];
    type: "keyword";
}

type Style = KeywordStyle | RegExStyle;

type StyleCollection = Style[];

export const COMMON_STYLES: StyleCollection = [
    {
        name: "verbs",
        type: "keyword",
        styles: colors.bold.bgMagenta,
        keywords: [
            "updated",
            "created",
            "modified",
            "deleted"
        ]
    },
    {
        name: "double quotes",
        type: "regex",
        styles: colors.blueBright,
        pattern: /"([^"]*)"/
    }
]

export const Stylizer2 = (styles: StyleCollection) => {
    return (text) => {
        if(styles && styles.length) {
            styles.forEach((style) => {
                if (style.type == 'keyword') {
                    const re = new RegExp(`(${style.keywords.join("|")})`);
                    text = text.replace(re, (match) => {
                        return style.styles(match);
                    });

                } else if (style.type == 'regex') {
                    text = text.replace(style.pattern, (match) => {
                        return style.styles(match);
                    });
                }
            })
        }

        return text;
    }
}

class Stylizer {
    private _styles: StyleCollection;
    constructor(styles: StyleCollection) {
        console.log(`Setting styles`)
        this._styles = styles;
        console.log(`Styles set. ${typeof this._styles}`)
    }

    public stylize(text: string) {
        if (this._styles) {
            this._styles.forEach((style) => {
                if (style.type == 'keyword') {
                    const re = new RegExp(`(${style.keywords.join("|")})`);
                    text = text.replace(re, (match) => {
                        return style.styles(match);
                    });

                } else if (style.type == 'regex') {
                    text = text.replace(style.pattern, (match) => {
                        return style.styles(match);
                    });
                }
            })

            return text;
        }
    }
}

export default Stylizer;