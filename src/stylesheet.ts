
//import { Parser } from '@sudo-nymd/text-parser';
//import { PluginTokenSpec } from "@sudo-nymd/text-parser/lib/common/token-types";
//import { ParsedTokenTypes, ParsedTokenFlags, ParsedToken } from "@sudo-nymd/text-parser/lib/parser";


//import { ParsedToken, ParsedTokenFlags, ParsedTokenTypes, PluginTokenSpec } from "@sudo-nymd/text-parser/lib/common/token-types";
import { ParsedToken, ParsedTokenFlags, ParsedTokenTypes, Parser, PluginTokenSpec, StyleFunction, plugins } from "./common";

/**
 * A class for representing a stylesheet for a CLI.
 */
class Stylesheet {

    private _styles: StyleItem[];
    private _parser: Parser;

    /**
     * Initializes a new Stylesheet class.
     * @param styles An array of StyleDefinition objects.
     */
    constructor(styles?) {
        this._styles = [];
        this._parser = new Parser();
    }
    
    public get styles() {
        return this._styles;
    }   

    /**
     * Adds a @type (StyleDefinition) to the stylesheet.
     * @param flags The flags to be matched.
     * @param callback The StyleFunction to perform the styling.
     * @returns A reference to the current stylesheet (enables "function chaining".)
     */
    public addStyle(stylize, type: ParsedTokenTypes, flags: ParsedTokenFlags = ParsedTokenFlags.None): Stylesheet {
        this._styles.push({ type, flags, stylize });
        return this;
    }

    /**
     * 
     * @param plugin 
     * @returns 
     */
    public use(plugin: PluginTokenSpec) {
        this._parser.use(plugin);
        return this;
    }

    /**
     * 
     * @returns 
     */
    public apply() {
        // Just in case...
        let _self = this;
        
        return function (text: string) {
            const buffer = [];
            _self._parser.parse(text, (token) => {
                const { value, flags, type } = token;

                const styler = _self._styles.find((style)=> {
                    if(style.flags === ParsedTokenFlags.None) {
                        return style.type === type;
                    }
                    return style.type === type && style.flags & flags;
                });

                if(styler !== undefined && styler.stylize !== undefined && typeof styler.stylize === 'function') {
                    buffer.push(styler.stylize(value, token));
                } else {
                    buffer.push(value);
                }                
            })

            return buffer.join('');
        }
    }
}

export type StyleItem = {
    type: ParsedTokenTypes;
    flags: ParsedTokenFlags;
    stylize: StyleFunction;
}

const ModuleName = 'stylesheet';

export { Stylesheet, ModuleName, ParsedToken, ParsedTokenFlags, ParsedTokenTypes, plugins };