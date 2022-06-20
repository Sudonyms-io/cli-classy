import { bgBlackBright, blackBright, Format, white } from "cli-color";

export type Segment = {
    format: Format;
    value: string;
}

export const DEFAULT_FORMAT = bgBlackBright.white;

export const create = (value: string, format = DEFAULT_FORMAT) => {
    return {
        format: format,
        value
    }
}