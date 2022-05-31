import { ModuleName, Stylesheet } from '../src/stylesheet';

describe(`It tests the "${ModuleName}" module.`, function() {

    it(`Tests the apply() method`, function(done) {

        const classyfy = new Stylesheet()
            .apply();

        const text = `The quick, brown fox!`;
        console.log(classyfy(text));

        done();
    })

})