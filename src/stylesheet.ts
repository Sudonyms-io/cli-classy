import parse from "./parser";
import { StyleDefinition, TokenFlags } from "./types";

/**
 * A class for representing a stylesheet for a CLI.
 */
class Stylesheet {

    private styles: StyleDefinition[] = []

    /**
     * Initializes a new Stylesheet class.
     */
    constructor() {
        this.styles = [];
    }

    private find(flags: TokenFlags): StyleDefinition {
        return this.styles.find((style) => {
            return style.flags & flags
        });
    };

    /**
     * Adds a @type (StyleDefinition) to the stylesheet.
     * @param flags The flags to be matched.
     * @param callback The StyleFunction to be called.
     * @returns A reference.
     */
    public addStyle(flags: TokenFlags, callback: Function) {
        this.styles.push({ flags: flags, style: callback });
        return this;
    }

    public stylize() {
        let _self = this;
        
        return function (text) {
            const items = parse(text).tokens.map((token) => {
                const map = _self.find(token.flags);
                if (map !== undefined) {
                    return map.style(token.value);
                } else {
                    return token.value
                }
            });

            return items.join('')
        }
    }
}

export { TokenFlags };
export default Stylesheet;