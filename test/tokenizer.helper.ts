import { expect } from 'chai'
import { Parsed, TokenTypeOptions } from '../src/tokenizer/index';

export function countTokens(ast: Parsed[], tto: TokenTypeOptions, count: number) {
    expect(ast.filter((value) => value.type == tto).length).to.equal(count, `Count of type ${ftto(tto)} didn't add up!`);
}

export const ftto = (value: TokenTypeOptions) => {
    return TokenTypeOptions[value];
}