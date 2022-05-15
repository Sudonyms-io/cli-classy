![Sudo-Nymd](https://github.com/sudo-nymd/branding/blob/main/images/cli-classy.png?raw=true)
# Stylish CLI. Classy.

Add color and style to your console output -- the ```classy``` way.

## Before (The Déclassé Way)

You've styled out your terminal -- ```bravo, by the way```. While coding, you notice your console output looks underdressed... No style... ```déclassé```! 

You import your favorite ```colors``` library and begin bending over backward with string interpolation, and now your console code is a twisted, spaghetti mess... 

You're trying ```too hard``` and that's ```just not classy```.

![Before](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/before.png?raw=true)

## After (The New, Classy Way)

![After](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/after.png?raw=true)

# Path to Terminal Style and Eternal Classiness

### 1. Add the ```cli-classy``` library to your project.

``` bash
npm i cli-classy
``` 

### 2. Import ```cli-classy``` into your module.

If using ```TypeScript```, use the following ```import``` statements at the top of your ```.ts``` file:

``` javascript
import { Stylesheet, TokenFlags } from 'cli-classy';

// Pull style functions from your preferred color lib
import * as colors from 'ansi-colors';
```

If using ```JavaScript```, use the following ```require``` statements at the top of your ```.js``` file:

``` javascript
const { Stylesheet, TokenFlags } = require('cli-classy');

// Pull style functions from your preferred color lib
const colors = require('ansi-colors');
```

### 3. Create a stylesheet. ```Getting Classier```

``` javascript
const stylesheet = new Stylesheet()
    .addStyle(TokenFlags.Braced, colors.greenBright)
    .addStyle(TokenFlags.Bracketed, colors.blueBright)
    .addStyle(TokenFlags.Punctuation, colors.cyan)
    .addStyle(TokenFlags.Quoted, colors.bgCyanBright.blue)
    .stylize();

const ss = stylesheet; // Alias for shorter code
```

### 4. Run your text (with tokens) through the stylesheet. 

``` javascript
console.log(ss("The quick [brown] fox jumped over the 'lazy dog', and the {cow} jumped over the moon! Enough said."));
```

### 5. Bask in the glow of colorful console output... the easy (and, ```classy```!) way.

![After](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/after-small.png?raw=true)

# How it Works

Not yet, but coming soon.
# Extending with Your Own Style Functions

Not yet, but coming soon.

