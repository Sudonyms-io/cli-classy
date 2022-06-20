
import { bgBlack, bgBlackBright, bgCyan, black, Color, cyan, Format, white } from "cli-color";
import { left } from "cli-color/move";
import { StyleFunction } from "../common";
import { Segment, create, DEFAULT_FORMAT } from "./segment";

export enum ArrowDirection {
    Left,
    Right
}

type ArrowOptions = {
    format: Format;
    direction?: ArrowDirection;
}

const DEFAULT: ArrowOptions = {
    format: DEFAULT_FORMAT
}


export const arrow = (value: string, options: ArrowOptions) => {
    const { color, format } = Object.assign(DEFAULT, options);
    const segments = [
        //create(''),
        create(value, format),
        create('\ue0b0', format)
    ]

    const reducer = (segment: Segment, value) => {
        value += 
    }

    segments.reduce
}                          