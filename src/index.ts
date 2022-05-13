import  parse  from "./tokenizer/index";
const text = `"This is a quoted phrase" 'me too' {bracket phrase} {bracket} [brace phrase] [brace].    'another prhase'       this is a word.`
//const text = `"Quoted Phrase" [brace phrase]`
const tokenMap = parse(text);
console.log(tokenMap.tokens);