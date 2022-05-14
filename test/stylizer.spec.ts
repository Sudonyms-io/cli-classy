import Stylizer from '../src/stylizer';
import { TokenFlags } from '../src/parser';
import * as c from 'ansi-colors'
import { expect } from 'chai';

describe(`Tests the stylizer module.`, function() {

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
        const s = new Stylizer()
            .addStyle(TokenFlags.Braced, c.greenBright)
            .addStyle(TokenFlags.Bracketed, c.blueBright)
            .addStyle(TokenFlags.Punctuation, c.cyan)
            .addStyle(TokenFlags.Quoted, c.bgCyanBright.blue)
            .stylize();

        const msg1 = (s("[generated] output at {4:10PM}."));
        log(msg1);
        expect(msg1).includes(c.greenBright('[generated]'));
        expect(msg1).includes(c.blueBright('{4:10PM}'));
        expect(msg1).includes(c.cyan('.'));

        const msg2 = (s("The quick [brown] fox jumped over the 'lazy dog', and the {cow} jumped over the moon! Enough said."));
        log(msg2);
        expect(msg2).includes(c.greenBright('[brown]'));
        expect(msg2).includes(c.bgCyanBright.blue("'lazy dog'"));
        expect(msg2).includes(c.blueBright('{cow}'));
        expect(msg2).includes(c.cyan("."));
        expect(msg2).includes(c.cyan("!"));
        expect(msg2).includes(c.cyan(","));

        done();
    })
})