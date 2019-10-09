//___________________________________________________________________________
//_______________________________Chaotic Language____________________________
/**                              WE LOVE JAVASCRIPT
 *                                 ALL RIGHT !!
 * 
 * values to proof:
 * syntax about our language
 * {showing 145 989}
 * {adding 2 4}
 * {isolated "foo" "any"}
 * ___________________________________________________________________________
 *                         Below you can find a lexer :)
 * ___________________________________________________________________________
 */
//We handled the onclick action in order to get of input of user
function ProcessLexer() {
    //let parameter = document.getElementById("inputValue").value;
    let parameter = "{add 123}";
    const resultTokenizer = lexer(parameter);
    console.log(resultTokenizer);

    //We initialize the parser  :)
    let antlr4 = require('antlr4/index');

    processParser(antlr4, resultTokenizer)

}

function processParser(antlr4Object, tokenizerResult) {
    console.warn(tokenizerResult);
    console.log(antlr4Object);
}

/**
 * 
 * @param {sentence of Language} inputValue 
 */
function lexer(inputValue) {

    // this variable: index let us know the position in a chain of input
    var index = 0;

    // value that we'll return (split of tokens)
    var tokens = [];

    //We created a loop in order to increment and road the input chain
    while (index < inputValue.length) {

        // We access char by char, when we found someone 
        //continue with the next character
        var char = inputValue[index];

        if (char === '{') {
            tokens.push({
                type: 'START KEYS', // In this case, I can know the begin of my program
                value: '{',
            });
            index++;
            continue;
        }

        let keywords = /[a-z]/i;
        if (keywords.test(char)) {
            let value = '';
            while (keywords.test(char)) {
                value += char;
                char = inputValue[++index];
            }
            tokens.push({ type: 'KEYWORD', value });
            continue;
        }

        if (char === '}') {
            tokens.push({
                type: 'CLOSE KEY', // I finished my program
                value: '}',
            });
            index++;
            continue;
        }

        //Right now, we're gonna check for whitespace
        const isThereAnWhiteSpace = /\s/;
        if (isThereAnWhiteSpace.test(char)) {
            tokens.push({ type: 'WHITESPACE' });
            index++;
            continue;
        }

        const isThereAnNewLine = /\|/;
        if (isThereAnNewLine.test(char)) {
            tokens.push({ type: 'NEW LINE' });
            index++;
            continue;
        }

        //Our language support the strings
        //for that reason, we'll validate if the chain 
        //begin with double quote
        if (char === '"') {
            var value = '';
            char = inputValue[++index];
            while (char !== '"') { // right n0w, we iterate until to found the end of string
                value += char;
                char = inputValue[++index];
            }
            char = inputValue[++index];
            tokens.push({ type: 'STRING', value });
            continue;
        }

        const isThereANumber = /[0-9]/;
        if (isThereANumber.test(char)) {
            var value = '';

            while (isThereANumber.test(char)) {
                value += char;
                char = inputValue[++index];
            }
            tokens.push({ type: 'NUMBER', value });
            continue;
        }
        //if we couldn't recognize any character, we'll throw an exception
        throw new TypeError(`I can't process this character: ${char}`);
    }
    return tokens; //Last but no least, we return the tokens like an Array :)
}

ProcessLexer();