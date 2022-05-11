import * as mocha from 'mocha';
import { expect } from 'chai'
import parse, { TokenTypeOptions } from '../src/tokenizer/index';

//import { countTokens, countTokenTypes, countTokenValues, tokensAreEqual, ftto, equals } from './tokenizer.spec.helper'

describe(`Tests the tokenizer module`, function () {
    it(`TEST`, function () {
        const text = `"This is a quoted phrase" {bracket} [brace].           this is a word.`
        const ast = parse(text);
        console.log(ast);
    });
});


