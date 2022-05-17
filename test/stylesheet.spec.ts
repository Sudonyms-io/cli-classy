import Stylesheet, { TokenFlags } from '../src/stylesheet';
import * as c from './colors'
import { expect } from 'chai';
import * as logger from './lib/logger';

const LOGENTRY = logger.create(`STYLESHEET`);
const log = (msg: string | object) => logger.log(LOGENTRY, msg);
const debug = (msg: object) => logger.debug(LOGENTRY, msg);
const error = (msg: string | object) => logger.error(LOGENTRY, msg);
const warn = (msg: string | object) => logger.warn(LOGENTRY, msg);

describe(`Tests the Stylesheet Module.`, function() {

    afterEach(() => {
        // Flush logging buffer after every test!
        logger.flush(LOGENTRY);
    });

    it.only(`Tests the 'strip' parameter of apply()`, (done) => {
        const classyfy = new Stylesheet()
            .addStyle(TokenFlags.Braced, c.greenBright)
            .addStyle(TokenFlags.Bracketed, c.magentaBright)
            .addStyle(TokenFlags.Punctuation, c.yellowBright)
            .addStyle(TokenFlags.Quoted, c.cyanBright)
            .apply();

        const TEST_TOKENS = [
            { token: `This` },
            { token: ` ` },
            { token: `"is"`, flags: TokenFlags.Quoted },
            { token: ` ` },
            { token: `a` },
            { token: ` ` },
            { token: `test` },
            { token: ` ` },
            { token: `{bracket}`, flags: TokenFlags.Bracketed },
            { token: ` ` },
            { token: `{bracket phrase}`, flags: TokenFlags.Bracketed },
            { token: ` ` },
            { token: '[brace]', flags: TokenFlags.Braced },
            { token: ` ` },
            { token: '[brace phrase]', flags: TokenFlags.Braced },
            { token: ` ` },
            { token: `"quote"` },
            { token: ` ` },
            { token: `"quote phrase"` },
            { token: ` ` },
            { token: `'quote'` },
            { token: ` ` },
            { token: `'quote phrase'` },
        ]
        const input = TEST_TOKENS.map((item) => {
            return item.token
        }).join('');

        const output = TEST_TOKENS.map((item) => {
            if(item.flags != undefined) {
                
            }
            return item.token;
        }).join('')
        const classyfied = classyfy(input, true);    
        log(classyfied);
        done();
    })


    it(`Tests Stylizing Console Output`, function (done) {
        const s = new Stylesheet()
            .addStyle(TokenFlags.Braced, c.greenBright)
            .addStyle(TokenFlags.Bracketed, c.magentaBright)
            .addStyle(TokenFlags.Punctuation, c.yellowBright)
            .addStyle(TokenFlags.Quoted, c.cyanBright)
            .apply();

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