import parse from "./parser";
import { StyleDefinition, TokenFlags } from "./types";

class Stylesheet {

    private styles: StyleDefinition[] = []

    constructor() {
        this.styles = [];
    }

    find(flags: TokenFlags): StyleDefinition {
        return this.styles.find((style) => {
            return style.flags & flags
        });
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
    }
}

export { TokenFlags };
export default Stylesheet;