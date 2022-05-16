// define('blackBright', [90, 39], 'bright');
// define('redBright', [91, 39], 'bright');

export const greenBright = (text: string) => {
    return color(92, text, 39);
}

export const yellowBright = (text: string) => {
    return color(93, text, 39);
}

export const magentaBright = (text: string) => {
    return color(95, text, 39);
}

export const cyanBright = (text: string) => {
    return color(96, text, 39);
}

const color = (start: number, text: string, end: number) => {
    return `\x1b[${start}m${text}\x1b[${end}m`
}


// define('whiteBright', [97, 39], 'bright');

console.log('before')
console.log(magentaBright('Hi!'));
console.log('after')