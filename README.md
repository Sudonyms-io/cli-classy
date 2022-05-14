![Sudo-Nymd](https://github.com/sudo-nymd/branding/blob/main/images/banner.png?raw=true)
# CLI Classé.

## Before (The Déclassé Way)

You've styled out your terminal -- ```bravo, by the way```. While coding, your console output looks underdressed... No style... ```déclassé```! You import your favorite ```colors``` library and begin bending over backward with string interpolation and now your console code is a twisted, spaghetti mess... ```you're trying too hard``` and that's ```just not classy```.

![Before](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/before.png?raw=true)

## After (Nouveau... Très Classé!)

![After](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/after.png?raw=true)

# Paths to Terminal Style 

Add library to your project:

``` bash
npm i cli-classy
``` 

Import into your module:

``` javascript
import Stylesheet, { TokenFlags } from 'cli-classy';
import * as colors from 'ansi-colors' // Use your preferred color lib
```

Create a stylesheet.

``` javascript
const stylesheet = new Stylesheet()
    .addStyle(TokenFlags.Braced, colors.greenBright)
    .addStyle(TokenFlags.Bracketed, colors.blueBright)
    .addStyle(TokenFlags.Punctuation, colors.cyan)
    .addStyle(TokenFlags.Quoted, colors.bgCyanBright.blue)
    .stylize();
```

Run your text (with tokens) through the stylesheet. ```Classé.```

``` javascript
console.log(stylesheet("The quick [brown] fox jumped over the 'lazy dog', and the {cow} jumped over the moon! Enough said."));
```

# How it Works

Not yet. 
# Extending with Your Own Style Functions

Not yet.

