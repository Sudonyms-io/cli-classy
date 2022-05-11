import { expect } from 'chai'
import { Parsed, TokenTypeOptions } from '../src/tokenizer/index';

export function equals<T>(actual: T, expected: T) {
    expect(actual).to.equal(expected, `Values of type "${typeof actual}" do not match!`);
}

export function countTokens(ast: Parsed[], exepcted: number) {
    expect(ast, 'invalid array length').to.be.a('array').with.lengthOf(exepcted);
}

export function countTokenTypes(ast: Parsed[], tto: TokenTypeOptions, expected: number) {
    expect(ast.filter((value) => value.type == tto).length).to.equal(expected, `Count of type ${ftto(tto)} didn't add up!`);
}

export function countTokenValues(ast: Parsed[], token: any, expected: number) {
    expect(ast.filter((value) => value.token === token).length).to.equal(expected, `Count of token ${token} did not add up`);
}

export function tokensAreEqual(expected: string, actual: string) {
    expect(expected).to.equal(actual, "Tokens did not match!");
}

export const ftto = (value: TokenTypeOptions) => {
    return TokenTypeOptions[value];
}