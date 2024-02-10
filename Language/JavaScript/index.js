/*--------------------------------------------

BNF for Parentheses, Multiplication, Division, Addition, and Subtraction

Additive 
    :Multiplicative Additive'
    ;

Additive'
    : + Factor Additive'
    | - Factor Additive'
    | ε
    ;

Multiplicative
    : Factor Multiplicative'
    ;

Multiplicative'
    : * Factor Multiplicative'
    | / Factor Multiplicative'
    | ε
    ;

Factor
    : ( Additive )
    | number

----------------------------------------------*/
const assert = require('assert');

// Additive 
//     :Multiplicative Additive'
//     ;
function additive() {
    return multiplicative() && _additive();
}

// Additive'
//     : + Factor Additive'
//     | - Factor Additive'
//     | ε
//     ;
function _additive() {
    if (lookahead(0) === '+') {
        return term('+') && multiplicative() && _additive();
    } else if (lookahead(0) === '-') {
        return term('-') && multiplicative() && _additive();
    } else {
        return true;
    }
}

// Multiplicative
//      : Factor Multiplicative'
//      ;
function multiplicative() {
    return factor() && _multiplicative();
}

// Multiplicative'
//     : * Factor Multiplicative'
//     | / Factor Multiplicative'
//     | ε
//     ;
function _multiplicative() {
    if (lookahead(0) === '*') {
        return term('*') && factor() && _multiplicative();
    } else if (lookahead(0) === '/') {
        return term('/') && factor() && _multiplicative();
    } else {
        return true;
    }
}

// Factor
//     : ( Additive )
//     | number
function factor() {
    if (lookahead(0) === '(') {
        return term('(') && additive() && term(')');
    } else {
        return term('a');
    }
}

function term(expected) {
    // Token value is equal to expected
    return source[cursor++] === expected;
}

function lookahead(offset) {
    // Return the character at the current cursor position plus the offset
    return source[(cursor + offset)];
}

// Start parsing the source code
function parse(s) {
    cursor = 0;
    source = s;
    return additive() && cursor === source.length;
}

assert.equal(parse('a'), true, "Test Case 1 Failed");
assert.equal(parse('a+a'), true, "Test Case 2 Failed");
assert.equal(parse('a+a+a'), true, "Test Case 3 Failed");
assert.equal(parse('a*a'), true, "Test Case 4 Failed");
assert.equal(parse('a*a*a'), true, "Test Case 5 Failed");
assert.equal(parse('a*a+a'), true, "Test Case 6 Failed");
assert.equal(parse('a-a*a'), true, "Test Case 7 Failed");
assert.equal(parse('a-a/a'), true, "Test Case 8 Failed");
assert.equal(parse('(a-a)/a'), true, "Test Case 9 Failed");