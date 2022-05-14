![Sudo-Nymd](https://github.com/sudo-nymd/branding/blob/main/images/banner.png?raw=true)
# Stylesheets for your CLI!

## Before (The Déclassé Way)

You've styled out your terminal -- ```bravo, by the way```. While coding, your console output looks underdressed... No style... ```déclassé```! You import your favorite ```colors``` library and begin bending over backward with string interpolation and now your console code is a twisted, spaghetti mess... ```you're trying too hard``` and that's ```just not classy```.

![Before](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/before.png?raw=true)

## After (Très Classé!)

![After](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/after.png?raw=true)

# Paths to Terminal Style 

Add library to your project:

```
npm i @sudo-nymd/cli-stylesheet
```

Import into your module:

``` javascript
import Stylizer from '@sudo-nymd/cli-stylesheets';
import { TokenFlags } from '../src/types';
import * as colors from 'ansi-colors'
```

Create a stylesheet.

``` javascript
const stylesheet = new Stylizer()
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

