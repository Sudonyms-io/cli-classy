// import * as colors from 'ansi-colors';

import { StyleFunction } from "ansi-colors";

import parse from "./parser";
import { Stylesheet, TokenFlags } from "./types";

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