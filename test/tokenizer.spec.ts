import { expect } from 'chai';
import parse,{ TokenFlags } from '../src/tokenizer';
import { WORD_TOKEN_SPECs } from './tokenizer.words.helper';
import { dec2bin} from './common';


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
            while (logs.length > 0) {
                console.log(logs.shift());
            }
        }
    });

    it(`Running Single Word Token Tests`, function () {
        WORD_TOKEN_SPECs.forEach((spec) => {
            // Grab a description and token from the test data inputs
            const { description, ...expected } = spec;

            let results = parse(expected.token);
            //console.log(results);

            // Run the spec's token text thru the parser
            const actual = parse(expected.token).tokens[0];

            // Parsed token flags should match spec token flags
            expected.flags.forEach((flag) => {
                const binExpected = dec2bin(flag);
                const binActual = dec2bin(actual.flags);
                const bit = flag & actual.flags;
                log(`${actual.token} has bit ${TokenFlags[flag].padEnd(20,' ')}  (${binExpected}} & ${dec2bin(binActual)}): ${bit == flag}`)
                expect(bit === flag, `Has`).to.be.true
            })
            //expect(actual, description).to.have.deep.equals(expected, description)
        })
    });

});