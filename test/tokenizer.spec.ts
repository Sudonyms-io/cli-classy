import * as mocha from 'mocha';
import { expect } from 'chai'
import parse, { TokenTypeOptions } from '../src/tokenizer/index';

import { countTokens, countTokenTypes, countTokenValues, tokensAreEqual, ftto, equals } from './tokenizer.spec.helper'

describe(`Tests the tokenizer module`, function () {
    it(`Tests phrases`, function(done) {
        const text = `This is "a test of a phrase".`
        const ast = parse(text);
        console.log(ast);
        done()
    }),
    it(`Tests bitwise parsing`, function(done){
        let text;

        text = `[11/24/1971] is my daughter's {"birthday"}.`;
        const ast = parse(text);
        const DATEINBRACKETS = TokenTypeOptions.IsDate | TokenTypeOptions.InBrackets;
        const DBLQUOTESINBRACES = TokenTypeOptions.InBraces | TokenTypeOptions.InDoubleQuotes;
        let tto: TokenTypeOptions;

        equals<TokenTypeOptions>(ast[0].type, DATEINBRACKETS);
        countTokenTypes(ast, DBLQUOTESINBRACES, 1);

        // Filter for 
        tto = TokenTypeOptions.InDoubleQuotes;
        expect(ast.filter((value) => value.type & tto).length).to.equal(1, `could not filter for ${TokenTypeOptions[tto]} bit.`)

        done();
    }),
    it(`Tests braces, whitespace, and parenthesis`, function(done) {
        const text = `The {request} is now (in-review)! Please (email) us for more information.`;
        const ast = parse(text);        

        // Test number of items that came back
        countTokens(ast, 23);

        // Check count of braces
        countTokenTypes(ast, TokenTypeOptions.InBraces, 1);
        countTokenValues(ast, '{request}', 1);

        // Check count of parenthesis
        countTokenTypes(ast, TokenTypeOptions.InParenthesis, 2);
        countTokenValues(ast, '(in-review)', 1);

        // Check count of whitespace
        countTokenTypes(ast, TokenTypeOptions.IsWhitespace, 10);

        done();
        
    }),
    it(`Tests dates, brackets, whitespace, and punctuation`, function (done) {
        const text = `The command [my-command] completed successfully on 12/25/2020.`;
        const ast = parse(text);
        let tto: TokenTypeOptions

        expect(ast, 'invalid array length').to.be.a('array').with.lengthOf(14);
        expect(ftto(ast[0].type)).to.equal(ftto(TokenTypeOptions.IsUnknown), 'invalid token type');
        tokensAreEqual(ast[0].token, 'The');

        expect(ftto(ast[1].type)).to.equal(ftto(TokenTypeOptions.IsWhitespace), 'invalid token type');
        tokensAreEqual(ast[1].token, ' ');

        expect(ftto(ast[4].type)).to.equal(ftto(TokenTypeOptions.InBrackets), 'invalid token type');
        tokensAreEqual(ast[4].token, '[my-command]');

        expect(ftto(ast[12].type)).to.equal(ftto(TokenTypeOptions.IsDate), 'invalid token type');
        tokensAreEqual(ast[12].token, '12/25/2020');

        expect(ftto(ast[13].type)).to.equal(ftto(TokenTypeOptions.IsPunctuation), 'invalid token type');
        tokensAreEqual(ast[13].token, '.');

        // Check count of whitespace
        countTokenTypes(ast, TokenTypeOptions.IsWhitespace, 6);

        // Check count of date
        countTokenTypes(ast, TokenTypeOptions.IsDate, 1);

        // Check count of brackets
        countTokenTypes(ast, TokenTypeOptions.InBrackets, 1);

        // Check count of puncuation
        countTokenTypes(ast, TokenTypeOptions.IsPunctuation, 1);

        done();
    });
});


