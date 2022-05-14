![Sudo-Nymd](https://github.com/sudo-nymd/branding/blob/main/images/banner.png?raw=true)
# CLI Classé.

## Before (The Déclassé Way)

You've styled out your terminal -- ```bravo, by the way```. While coding, your console output looks underdressed... No style... ```déclassé```! You import your favorite ```colors``` library and begin bending over backward with string interpolation and now your console code is a twisted, spaghetti mess... ```you're trying too hard``` and that's ```just not classy```.

![Before](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/before.png?raw=true)

## After (Nouveau... Très Classé!)

![After](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/after.png?raw=true)

# Path to Terminal Style and Eternal Classiness

### Add library to your Project

``` bash
npm i cli-classy
``` 

### Import Into Your Module

If using ```TypeScript```, use the following ```import``` statements at the top of your ```*.ts*``` file:

``` javascript
import { Stylesheet, TokenFlags } from 'cli-classy';
import * as colors from 'ansi-colors' // Use your preferred color lib
```

If using ```JavaScript```, use the following ```require``` statements at the top of your ```*.js*``` file:

``` javascript
const { Stylesheet, TokenFlags } = require('cli-classy');

// Pull style functions from your preferred color lib
const colors = require('ansi-colors');
```

### Create a stylesheet.

``` javascript
const stylesheet = new Stylesheet()
    .addStyle(TokenFlags.Braced, colors.greenBright)
    .addStyle(TokenFlags.Bracketed, colors.blueBright)
    .addStyle(TokenFlags.Punctuation, colors.cyan)
    .addStyle(TokenFlags.Quoted, colors.bgCyanBright.blue)
    .stylize();

const ss = stylesheet; // Alias for shorter code
```

Run your text (with tokens) through the stylesheet. ```Classé.```

``` javascript
console.log(ss("The quick [brown] fox jumped over the 'lazy dog', and the {cow} jumped over the moon! Enough said."));
```

# How it Works

Not yet, but coming soon.
# Extending with Your Own Style Functions

Not yet, but coming soon.

