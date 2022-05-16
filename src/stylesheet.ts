import parse from "./parser";
import { Token } from "./types";
import { StyleDefinition, StyleFunction, TokenFlags } from "./types";

/**
 * A class for representing a stylesheet for a CLI.
 */
class Stylesheet {

    private styles: StyleDefinition[] = []

    /**
     * Initializes a new Stylesheet class.
     * @param styles An array of StyleDefinition objects.
     */
    constructor(styles?: StyleDefinition[]) {
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
     * @param callback The StyleFunction to perform the styling.
     * @returns A reference to the current stylesheet (enables "function chaining".)
     */
    public addStyle(flags: TokenFlags, callback: StyleFunction): Stylesheet {
        this.styles.push({ flags: flags, stylize: callback });
        return this;
    }

    /**
     * 
     * @returns 
     */
    public apply() {
        // Just in case...
        let _self = this;
        
        return function (text:string, strip: boolean=false) {
            const items = parse(text).tokens.map((token) => {
                // Do we have a style definition for the specified flags?
                const styleDef = _self.find(token.flags);
                if (styleDef !== undefined && styleDef.stylize !== undefined && typeof styleDef.stylize === 'function') {
                    // We do have a style definition for the specified flags!
                    
                    let tv = token.value;
                    if(strip == true) {
                        // Caller wants to remove the token characters
                        const re = /["'{}\[\]]/g;
                        tv = tv.replace(re, '')
                    }
                    // Call the style definition's stylize method
                    // and return the result.
                    return styleDef.stylize(tv, token);
                } else {
                    // No style definition for the specified flags... return the token's value
                    return token.value
                }
            });

            // Piece the parts of the string back together again
            return items.join('')
        }
    }
}

export { TokenFlags };
export default Stylesheet;