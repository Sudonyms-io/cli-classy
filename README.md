![Sudo-Nymd](https://github.com/sudo-nymd/branding/blob/main/images/banner.png?raw=true)
# cli-stylesheets

## Before

![Before](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/before.png?raw=true)

## After

![After](https://github.com/sudo-nymd/cli-stylesheets/blob/master/images/after.png?raw=true)

# 

```
npm i @sudo-nymd/cli-stylesheet
```

```
import Stylizer from '../src/stylizer';
import { TokenFlags } from '../src/types';
import * as colors from 'ansi-colors'
```

```
const s = new Stylizer()
    .addStyle(TokenFlags.Braced, colors.greenBright)
    .addStyle(TokenFlags.Bracketed, colors.blueBright)
    .addStyle(TokenFlags.Punctuation, colors.cyan)
    .addStyle(TokenFlags.Quoted, colors.bgCyanBright.blue)
    .stylize();
```

```
console.log(s("The quick [brown] fox jumped over the 'lazy dog', and the {cow} jumped over the moon! Enough said."));
```

