import { ModuleName, Stylesheet } from '../src/stylesheet';
import * as colors from 'ansi-colors';
import { ParsedTokenFlags, ParsedTokenTypes } from '@sudo-nymd/text-parser';
import { expect } from 'chai';
import { Keywords } from '@sudo-nymd/text-parser/lib/plugins';

describe(`It tests the "${ModuleName}" module.`, function() {

    it(`Tests the apply() method`, function(done) {

        const classyfy = new Stylesheet()
            .addStyle(colors.yellowBright.bold, ParsedTokenTypes.Punctuation)
            .addStyle(colors.greenBright, ParsedTokenTypes.Phrase, ParsedTokenFlags.Quoted)
            .addStyle(colors.bgCyanBright.bold.blackBright, ParsedTokenTypes.Phrase)
            .use(new Keywords().add('fox').plugin())
            .apply();

        const text = `The quick, [brown] fox "jumped over" the [lazy] dog!`;
        console.log(classyfy(text));

        done();
    });

    it(`Tests the styles property.`, function(done) {

        const stylesheet = new Stylesheet();
        stylesheet
            .addStyle(colors.bgRed, ParsedTokenTypes.Word)
            .addStyle(colors.bgGreen, ParsedTokenTypes.Phrase)

        expect(stylesheet.styles.length).to.equal(2)
        done();
    })

})