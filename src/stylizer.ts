// import * as colors from 'ansi-colors';

import { StyleFunction } from "ansi-colors";
import { timeStamp } from "console";
import { StyleSheet } from "./stylesheet";
import parse from "./parser";
import { Stylesheet, TokenFlags } from "./types";

// type StyleBase = {
//     name: string;
//     styles: colors.StyleFunction
//     type: string;
// }

// type RegExStyle = StyleBase & {
//     pattern: RegExp;
//     type: "regex";
// }

// type KeywordStyle = StyleBase & {
//     keywords: string[];
//     type: "keyword";
// }

// type Style = KeywordStyle | RegExStyle;

// type StyleCollection = Style[];

// export const COMMON_STYLES: StyleCollection = [
//     {
//         name: "verbs",
//         type: "keyword",
//         styles: colors.bold.bgMagenta,
//         keywords: [
//             "updated",
//             "created",
//             "modified",
//             "deleted"
//         ]
//     },
//     {
//         name: "double quotes",
//         type: "regex",
//         styles: colors.blueBright,
//         pattern: /"([^"]*)"/
//     }
// ]

// export const Stylizer2 = (styles: StyleCollection) => {
//     return (text) => {
//         if(styles && styles.length) {
//             styles.forEach((style) => {
//                 if (style.type == 'keyword') {
//                     const re = new RegExp(`(${style.keywords.join("|")})`);
//                     text = text.replace(re, (match) => {
//                         return style.styles(match);
//                     });

//                 } else if (style.type == 'regex') {
//                     text = text.replace(style.pattern, (match) => {
//                         return style.styles(match);
//                     });
//                 }
//             })
//         }

//         return text;
//     }
// }

// class Stylizer {
//     private _styles: StyleCollection;
//     constructor(styles: StyleCollection) {
//         console.log(`Setting styles`)
//         this._styles = styles;
//         console.log(`Styles set. ${typeof this._styles}`)
//     }

//     public stylize(text: string) {
//         if (this._styles) {
//             this._styles.forEach((style) => {
//                 if (style.type == 'keyword') {
//                     const re = new RegExp(`(${style.keywords.join("|")})`);
//                     text = text.replace(re, (match) => {
//                         return style.styles(match);
//                     });

//                 } else if (style.type == 'regex') {
//                     text = text.replace(style.pattern, (match) => {
//                         return style.styles(match);
//                     });
//                 }
//             })

//             return text;
//         }
//     }
// }

// export default Stylizer;



class Stylizer {

    private styles: Stylesheet[] = []

    constructor() {
        this.styles = [];
    }

    find(flags: TokenFlags): Stylesheet {
        return this.styles.find((style) => {
            return style.flags & flags
        })

        //return (items.callback) ? items.callback : undefined
    };

    addStyle(flags: TokenFlags, callback: Function) {
        this.styles.push({ flags: flags, style: callback });
        return this;
    }

    stylize() {
        let _self = this;
        
        return function (text) {
            const items = parse(text).tokens.map((token) => {
                const map = _self.find(token.flags);
                if (map !== undefined) {
                    return map.style(token.token);
                } else {
                    return token.token
                }
            });

            return items.join('')
        }



        // this.foo();
        // const s = this.styles;
        // return parse(text).tokens.map((token) => {
        //     const formatter = findFormatter(s, token.flags);
        //     return (formatter) ? formatter(token.token) : token.token
        // }).join('');
    }
}

function findFormatter(styles, flags: TokenFlags) {
    return styles.find((style) => {
        return style.flags & flags
    }).callback;
}

export default Stylizer;