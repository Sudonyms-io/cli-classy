import { ModuleName, ParsedTokenFlags, ParsedTokenTypes, Stylesheet, plugins } from '../src/stylesheet';
import * as colors from 'ansi-colors';

import { expect } from 'chai';
import { envelope } from '../src/effects/envelope';
import { arrow } from '../src/effects/arrow'

describe(`It tests the "${ModuleName}" module.`, function() {

    it(`Tests the apply() method`, function(done) {
        const colors = require('ansi-colors');

        const classyfy = new Stylesheet()
            .addStyle(colors.greenBright, ParsedTokenTypes.Phrase)
            .addStyle(colors.blueBright, ParsedTokenTypes.Phrase, ParsedTokenFlags.Bracketed)
            .addStyle(colors.cyan, ParsedTokenTypes.Punctuation)
            .addStyle(colors.bgCyanBright.blue, ParsedTokenTypes.Phrase, ParsedTokenFlags.Quoted)
            .apply();

        console.log(classyfy("The quick [brown] fox jumped over the 'lazy dog', and the {cow} jumped over the moon! Enough said."));

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

    it(`Tests the envelop`, function(done) {
        
        const classyfy = new Stylesheet()
            .addStyle(arrow(), ParsedTokenTypes.Phrase)
            .apply();

        console.log(classyfy("The quick a [brown] fox jumped over the 'lazy dog', and the {cow} jumped over the moon! Enough said."));
        console.log(classyfy("This is a [phrase]."))

        done();
    })

})