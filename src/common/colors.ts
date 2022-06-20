import { Style } from "util";

const DEBUG = false;
type StyleStruct = [number, number];

interface Colors {
    black: StyleStruct,
    blackBright: StyleStruct,
    bgBlack: StyleStruct,
    bgBlackBright: StyleStruct,
    red: StyleStruct,
    redBright: StyleStruct,
    bgRed: StyleStruct,
    bgRedBright: StyleStruct,
    green: StyleStruct,
    greenBright: StyleStruct,
    bgGreen: StyleStruct,
    bgGreenBright: StyleStruct,
    yellow: StyleStruct,
    yellowBright: StyleStruct,
    bgYellow: StyleStruct,
    bgYellowBright: StyleStruct,
    blue: StyleStruct,
    blueBright: StyleStruct,
    bgBlue: StyleStruct,
    bgBlueBright: StyleStruct,
    magenta: StyleStruct,
    magentaBright: StyleStruct,
    bgMagenta: StyleStruct,
    bgMagentaBright: StyleStruct,
    cyan: StyleStruct,
    cyanBright: StyleStruct,
    bgCyan: StyleStruct,
    bgCyanBright: StyleStruct,
    white: StyleStruct,
    whiteBright: StyleStruct,
    bgWhite: StyleStruct,
    bgWhiteBright: StyleStruct
}

interface Modifiers {
    bold: StyleStruct;
    reset: StyleStruct;
    dim: StyleStruct;
    italic: StyleStruct;
    underline: StyleStruct;
    inverse: StyleStruct;
    hidden: StyleStruct;
    strikethrough: StyleStruct;
}

const modifiers: Modifiers = {
    bold: [1, 22],
    reset: [0, 0],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
}

const colors: Colors = {
    black: [30, 39],
    blackBright: [90, 39],
    bgBlack: [40, 49],
    bgBlackBright: [100, 49],
    red: [31, 39],
    redBright: [91, 39],
    bgRed: [41, 49],
    bgRedBright: [101, 49],
    green: [32, 39],
    greenBright: [92, 39],
    bgGreen: [42, 49],
    bgGreenBright: [102, 49],
    yellow: [33, 39],
    yellowBright: [93, 39],
    bgYellow: [43, 49],
    bgYellowBright: [103, 49],
    blue: [34, 39],
    blueBright: [94, 39],
    bgBlue: [44, 49],
    bgBlueBright: [104, 49],
    magenta: [35, 39],
    magentaBright: [95, 39],
    bgMagenta: [45, 49],
    bgMagentaBright: [105, 49],
    cyan: [36, 39],
    cyanBright: [96, 39],
    bgCyan: [46, 49],
    bgCyanBright: [106, 49],
    white: [37, 39],
    whiteBright: [97, 39],
    bgWhite: [47, 49],
    bgWhiteBright: [107, 49]
}

const style = (text: string, ...mods: StyleStruct[]) => {
    const buffer = [];

    const reducer = (initialValue, style: StyleStruct, index: number, styles: StyleStruct[]) => {

        const esc = (DEBUG) ? 'x1b' : '\x1b';
        return `${esc}[${style[0]}m${initialValue}${esc}[${style[1]}m`;
        //return '\x1b[' + style[0] + 'm' + initialValue + '\x1b[' + style[1] + 'm';
    }

    return mods.reduceRight(reducer, text)
}

class nzu {
    private stack: [];

    constructor() {
        this.stack = [];
        const styles = Object.assign({}, colors, modifiers);
        const keys = Object.keys(styles);
        keys.forEach(style => {
           console.log(style);
           const obj = {
            [style]: {
                get() {
                    this.stack.push(styles[style])
                }
            }
           };
        });
    }
}

const c = new nzu();

// console.log(style('yellow', colors.yellow));
// console.log(style('bold yellow', modifiers.bold, colors.yellow));
// console.log(style('bold green yellow', modifiers.bold, colors.bgGreen, colors.yellow));
// console.log('finished')
