import { Parser } from "@sudo-nymd/text-parser";
import { PluginTokenSpec } from "@sudo-nymd/text-parser/lib/common/token-types";

/**
 * A class for representing a stylesheet for a CLI.
 */
class Stylesheet {

    private _styles =[];
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
    public addStyle(flags, callback): Stylesheet {
        this._styles.push({ flags: flags, stylize: callback });
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
            _self._parser.parse(text).forEach((token) => {
                const { value } = token;
                buffer.push(value);
            });

            return buffer.join('');
        }
    }
}

const ModuleName = 'stylesheet';

export { Stylesheet, ModuleName };