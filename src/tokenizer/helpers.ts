const LETTER = /[a-zA-Z]/
const WHITESPACE = /\s+/
const NUMBER = /^[0-9]+$/
const OPERATORS = ["+", "-", "*", "/", "%"];

const isLetter = character => LETTER.test(character)
const isWhitespace = character => WHITESPACE.test(character)
const isNumber = character => NUMBER.test(character)
const isOpeneningParenthesis = character => character === "("
const isClosingParenthesis = character => character === ")"
const isParenthesis = character =>
    isOpeneningParenthesis(character) || isClosingParenthesis(character)
const isQuote = character => character === '"'
const isOperator = character => OPERATORS.includes(character)

const helpers = {
    isLetter,
    isWhitespace,
    isNumber,
    isOpeneningParenthesis,
    isClosingParenthesis,
    isParenthesis,
    isQuote,
    isOperator,
}

export default helpers