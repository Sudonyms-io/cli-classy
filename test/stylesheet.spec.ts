import Stylesheet, { TokenFlags } from '../src/stylesheet';
import * as c from './colors'
import { expect } from 'chai';

describe(`Tests the Stylesheet Module.`, function() {

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

    it(`Tests Stylizing Console Output`, function (done) {
        const s = new Stylesheet()
            .addStyle(TokenFlags.Braced, c.greenBright)
            .addStyle(TokenFlags.Bracketed, c.magentaBright)
            .addStyle(TokenFlags.Punctuation, c.yellowBright)
            .addStyle(TokenFlags.Quoted, c.cyanBright)
            .stylize();

        const msg1 = (s("[generated] output at {4:10PM}."));
        log(msg1);
        expect(msg1).includes(c.greenBright('[generated]'));
        expect(msg1).includes(c.magentaBright('{4:10PM}'));
        expect(msg1).includes(c.yellowBright('.'));

        const msg2 = (s("The quick [brown] fox jumped over the 'lazy dog', and the {cow} jumped over the moon! Enough said."));
        log(msg2);
        expect(msg2).includes(c.greenBright('[brown]'));
        expect(msg2).includes(c.cyanBright("'lazy dog'"));
        expect(msg2).includes(c.magentaBright('{cow}'));
        expect(msg2).includes(c.yellowBright("."));
        expect(msg2).includes(c.yellowBright("!"));
        expect(msg2).includes(c.yellowBright(","));

        done();
    });
});