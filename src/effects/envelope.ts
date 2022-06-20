import { StyleFunction } from "../common";
import { ParsedToken } from "../stylesheet";
import * as cli from 'cli-color';

type StyleOptions = {
    style: cli.Format,
    padding: number,
    before?: {
        text: string,
        style: cli.Format
    },
    after?: {
        text: string,
        style: cli.Format
    }
}

const DEFAULT: StyleOptions = {
    style: cli.default.black.bgCyanBright,
    padding: 1
}

export const envelope = (options?: StyleOptions): StyleFunction => {
    const opt = Object.assign(DEFAULT, options);
    return (text: string, token?: ParsedToken) => {
        const before = (opt.before !== undefined) ? opt.before.style(opt.before.text) : '';
        const after = (opt.before !== undefined) ? opt.after.style(opt.after.text) : ''
        return before + opt.style(text) + after;
    }
}