import * as mocha from 'mocha';
import { expect } from 'chai'
import parse, { TokenTypeOptions } from './index';

const ftto = (value: TokenTypeOptions) => {
    return TokenTypeOptions[value];
}

describe(`Tests the parser`, function () {
    it(`Tests bitwise parsing`, function(done){
        let text;

        text = `[11/24/1971] is my daughter's {"birthday"}.`;
        const ast = parse(text);
        const DATEINBRACKETS = TokenTypeOptions.IsDate | TokenTypeOptions.InBrackets;
        const DBLQUOTESINBRACES = TokenTypeOptions.InBraces | TokenTypeOptions.InDoubleQuotes;
        let tto: TokenTypeOptions;

        expect(ast[0].type).to.equal(DATEINBRACKETS);
        expect(ast.filter((value) => value.type == DBLQUOTESINBRACES).length).to.equal(1, `could not filter for ${DBLQUOTESINBRACES}`)

        // Filter for 
        tto = TokenTypeOptions.InDoubleQuotes;
        expect(ast.filter((value) => value.type & tto).length).to.equal(1, `could not filter for ${TokenTypeOptions[tto]} bit.`)

        done();
    }),
    it(`Tests braces, whitespace, and parenthesis`, function(done) {
        const text = `The {request} is now (in-review)! Please (email) us for more information.`;
        const ast = parse(text);
        let tto: TokenTypeOptions;
        let tv: string;

        // Test number of items that came back
        expect(ast, 'invalid array length').to.be.a('array').with.lengthOf(23);

        // Check count of braces
        tto = TokenTypeOptions.InBraces;
        expect(ast.filter((value) => value.type == tto).length).to.equal(1, `count of type ${ftto(tto)} didn't add up`);

        // Check count of parenthesis
        tto = TokenTypeOptions.InParenthesis;
        tv = '(in-review)';
        expect(ast.filter((value) => value.type == tto).length).to.equal(2, `count of type ${ftto(tto)} didn't add up`);
        expect(ast.filter((value) => value.token === tv).length).to.equal(1, `count of token ${tv} did not add up`);

        // Check count of whitespace
        tto = TokenTypeOptions.IsWhitespace;
        expect(ast.filter((value) => value.type == tto).length).to.equal(10, `count of type ${ftto(tto)} didn't add up`);

        done();
        
    }),
    it(`Tests dates, brackets, whitespace, and punctuation`, function (done) {
        const text = `The command [my-command] completed successfully on 12/25/2020.`;
        const ast = parse(text);
        let tto: TokenTypeOptions

        expect(ast, 'invalid array length').to.be.a('array').with.lengthOf(14);
        expect(ftto(ast[0].type)).to.equal(ftto(TokenTypeOptions.IsUnknown), 'invalid token type');
        expect(ast[0].token).to.equal('The', 'token does not match');

        expect(ftto(ast[1].type)).to.equal(ftto(TokenTypeOptions.IsWhitespace), 'invalid token type');
        expect(ast[1].token).to.equal(' ', 'token did not match');

        expect(ftto(ast[4].type)).to.equal(ftto(TokenTypeOptions.InBrackets), 'invalid token type');
        expect(ast[4].token).to.equal('[my-command]', 'token did not match');

        expect(ftto(ast[12].type)).to.equal(ftto(TokenTypeOptions.IsDate), 'invalid token type');
        expect(ast[12].token).to.equal('12/25/2020', 'token did not match');

        expect(ftto(ast[13].type)).to.equal(ftto(TokenTypeOptions.IsPunctuation), 'invalid token type');
        expect(ast[13].token).to.equal('.', 'token did not match');

        // Check count of whitespace
        tto = TokenTypeOptions.IsWhitespace;
        expect(ast.filter((value) => value.type == tto).length).to.equal(6, `count of type ${ftto(tto)} didn't add up`);

        // Check count of date
        tto = TokenTypeOptions.IsDate;
        expect(ast.filter((value) => value.type == tto).length).to.equal(1, `count of type ${ftto(tto)} didn't add up`);

        // Check count of brackets
        tto = TokenTypeOptions.InBrackets;
        expect(ast.filter((value) => value.type == tto).length).to.equal(1, `count of type ${ftto(tto)} didn't add up`);

        // Check count of puncuation
        tto = TokenTypeOptions.IsPunctuation;
        expect(ast.filter((value) => value.type == tto).length).to.equal(1, `count of type ${ftto(tto)} didn't add up`);

        done();
    });
});