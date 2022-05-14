import { expect } from 'chai';
import parse,{ TokenFlags } from '../src/parser';
import { WORD_TOKEN_SPECs } from './parser.words.helper';
import { checkHasFlags } from './common';
import { PHRASE_TOKEN_SPECs } from './parser.phrases.helper';

//console.log(`Tip: Set ENV variable DEBUG_MOCHA to true to enable detailed test output.`)

// Have some fun...
const emoji = {
    fc: '🤞',  // Fingers crossed
}

describe(`Tests the parser module.`, function () {

    let logs = [];
    const log = (msg: any) => {
        logs.push(`\t${msg}`)
    }
    
    afterEach(() => {
        if (process.env.DEBUG_MOCHA || process.env.MOCHA_DEBUG) {
            while (logs.length > 0) {
                console.log(logs.shift());
            }
        }
    });

    it('Running Punctuation Tests', (done) => {
        const PUNCTUATION_TESTS = [
            {
                description: "Tests that the text has a period.",
                inputs: "A test.",
                tokens: [
                    {
                        token: "A",
                        flags: TokenFlags.Word,
                        index: 0,
                        length: 1
                    },
                    {
                        token: " ",
                        flags: TokenFlags.Whitespace,
                        index: 1,
                        length: 1
                    },
                    {
                        token: "test",
                        flags: TokenFlags.Word,
                        index: 2,
                        length: 4
                    },
                    {
                        token: ".",
                        flags: TokenFlags.Period,
                        index: 6,
                        length: 1
                    }
                ]
            },
            {
                description: "Tests that the text has a comma and period.",
                inputs: "And then, nothing.",
                tokens: [
                    {
                        token: "And",
                        flags: TokenFlags.Word,
                        index: 0,
                        length: 3
                    },
                    {
                        token: " ",
                        flags: TokenFlags.Whitespace,
                        index: 3,
                        length: 1
                    },
                    {
                        token: "then",
                        flags: TokenFlags.Word,
                        index: 4,
                        length: 4
                    },
                    {
                        token: ",",
                        flags: TokenFlags.Comma,
                        index: 8,
                        length: 1
                    },
                    {
                        token: " ",
                        flags: TokenFlags.Whitespace,
                        index: 9,
                        length: 1
                    },
                    {
                        token: "nothing",
                        flags: TokenFlags.Word,
                        index: 10,
                        length: 7
                    },
                    {
                        token: ".",
                        flags: TokenFlags.Period,
                        index: 17,
                        length: 1
                    }
                ]
            }
        ];

        PUNCTUATION_TESTS.forEach((test) => {
            const actual = parse(test.inputs);
            expect(actual.tokens, test.description).to.have.deep.equals(test.tokens)
        });

        done()
    })

    it(`Running Single Word Token Tests`, function () {
        WORD_TOKEN_SPECs.forEach((spec) => {
            // Grab a description and token from the test data inputs
            const { description, ...expected } = spec;

            // Run the spec's token text thru the parser
            const actual = parse(expected.token).tokens[0];

            expect(actual.token, `${description}: checking ${expected.token} = ${actual.token}`).to.equal(expected.token)
            expect(actual.index, `${description}: checking ${expected.token}.index`).to.equal(expected.index)
            expect(actual.length, `${description}: checking ${expected.token}.length`).to.equal(expected.length)

            // Parsed token flags should match spec token flags
            expected.flags.forEach((flag) => {
                checkHasFlags(description, actual.token, flag, actual.flags, log);
            })
            //expect(actual, description).to.have.deep.equals(expected, description)
        })
    });

    it(`Running Single Phrase Token Tests`, function () {
        PHRASE_TOKEN_SPECs.forEach((spec) => {
            // Grab a description and token from the test data inputs
            const { description, ...expected } = spec;

            let results = parse(expected.token);
            //console.log(results);

            // Run the spec's token text thru the parser
            const actual = parse(expected.token).tokens[0];

            // Parsed token flags should match spec token flags
            expected.flags.forEach((flag) => {
                checkHasFlags(description, actual.token, flag, actual.flags, log);
            })
            //expect(actual, description).to.have.deep.equals(expected, description)
        })
    });

});