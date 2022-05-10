import parse from "./tokenizer";

const tokens = parse(`(15) ("hi") The    {quick} "brown" fox 'jumped' over the         (lazy) dog, and then on 11/19/1973 (7/4/1776) [444] sang 123456 about [nothing].`);

console.log(tokens);