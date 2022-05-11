import * as mocha from 'mocha';
import { expect } from 'chai'
import parse, { TokenFlagRegExMap, TokenFlags } from '../src/tokenizer/index';
import { WORD_TOKEN_SPECs } from './tokenizer.words.helper';
import { PHRASE_TOKEN_SPECs } from './tokenizer.phrases.helper';
import { getEnumKeys } from './common';

console.log(`Tip: Set ENV variable DEBUG_MOCHA to true to enable detailed test output.`)

// Have some fun...
const emoji = {
    fc: '🤞',  // Fingers crossed
}

describe(`Tests the tokenizer module`, function () {
    let logs = [];
    const log = (msg: any) => {
        logs.push(`\t${msg}`)
    }
    beforeEach(() => {
        
    });
    afterEach(() => {
        if (process.env.DEBUG_MOCHA || process.env.MOCHA_DEBUG) {
            while(logs.length > 0) {
                console.log(logs.shift());
            }
        }
    })

    it(`Ensure each TokenFlag has a corresponding RegEx mapping.`, (done) => {
        const flags = getEnumKeys(TokenFlags).sort();
        
        const regexs = TokenFlagRegExMap.map((item) => {
            return TokenFlags[item.type];
        }).sort();
        
        const msg = (flags.length > regexs.length) ? `You have more flags than regex mappings!` : `You have more regex mappings than flags!`

        const flagsNotInRegExs = flags.filter((item) => {
            return !regexs.includes(item)
        });

        const regExFlagsNotInFlags = regexs.filter((item) => {
            return !flags.includes(item)
        })

        expect(regExFlagsNotInFlags).have.deep.equals(flagsNotInRegExs, msg);
        
        done();
    })

    it(`Running Single Phrase Token Tests`, function () {
        PHRASE_TOKEN_SPECs.forEach((spec) => {
            // Grab a description and token from the test data inputs
            const { description, ...expected } = spec;

            // Run the spec's token text thru the parser
            const actual = parse(expected.token).tokens[0];

            logs.push(`\t${emoji.fc} ${description}`);

            // Parsed token should deep match spec token 
            expect(actual, description).to.have.deep.equals(expected, description)
        })
    });

    it.only(`Running Single Word Token Tests`, function () {
        WORD_TOKEN_SPECs.forEach((spec) => {
            // Grab a description and token from the test data inputs
            const { description, ...expected } = spec;

            // Run the spec's token text thru the parser
            const actual = parse(expected.token).tokens[0];

            logs.push(`\t${emoji.fc} ${description}`);

            // Parsed token should deep match spec token 
            expect(actual, description).to.have.deep.equals(expected, description)
        })
    });
});


