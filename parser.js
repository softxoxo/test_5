class Parser {
  constructor() {
    this.precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };
  }

  parse(expression) {
    const tokens = this.tokenize(expression);
    return this.parseExpression(tokens);
  }


  tokenize(expression) {
    const tokens = [];
    let currentToken = "";
    let isNegative = false;
  
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
  
      if (this.isOperator(char)) {
        if (currentToken !== "") {
          tokens.push(isNegative ? `-${currentToken}` : currentToken);
          currentToken = "";
          isNegative = false;
        }
  
        if ((char === "+" || char === "-") && tokens.length === 0) {
          tokens.push("0");
        }
  
        if (char === "-" && (this.isOperator(tokens[tokens.length - 1]) || tokens[tokens.length - 1] === "(")) {
          isNegative = true;
          continue;
        }
  
        tokens.push(char);
      } else if (this.isParenthesis(char)) {
        if (currentToken !== "") {
          tokens.push(isNegative ? `-${currentToken}` : currentToken);
          currentToken = "";
          isNegative = false;
        }
  
        tokens.push(char);
      } else if (this.isDigit(char) || char === ".") {
        currentToken += char;
      } else if (char === " ") {
        if (currentToken !== "") {
          tokens.push(isNegative ? `-${currentToken}` : currentToken);
          currentToken = "";
          isNegative = false;
        }
      } else {
        throw new Error(`Invalid character: ${char}`);
      }
    }
  
    if (currentToken !== "") {
      tokens.push(isNegative ? `-${currentToken}` : currentToken);
    }
  
    return tokens;
  }

  parseExpression(tokens) {
    const operatorStack = [];
    const operandStack = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (this.isOperator(token)) {
        while (
          operatorStack.length > 0 &&
          this.getPrecedence(token) <=
            this.getPrecedence(operatorStack[operatorStack.length - 1])
        ) {
          const operator = operatorStack.pop();
          const right = operandStack.pop();
          const left = operandStack.pop();
          operandStack.push([operator, left, right]);
        }
        operatorStack.push(token);
      } else if (token === "(") {
        operatorStack.push(token);
      } else if (token === ")") {
        while (operatorStack[operatorStack.length - 1] !== "(") {
          const operator = operatorStack.pop();
          const right = operandStack.pop();
          const left = operandStack.pop();
          operandStack.push([operator, left, right]);
        }
        operatorStack.pop();

        if (i > 0 && tokens[i - 1] === "-") {
          const negatedExpression = operandStack.pop();
          operandStack.push(["unary-", negatedExpression]);
        }
      } else {
        operandStack.push(token);
      }
    }

    while (operatorStack.length > 0) {
      const operator = operatorStack.pop();
      const right = operandStack.pop();
      const left = operandStack.pop();
      operandStack.push([operator, left, right]);
    }

    return operandStack[0];
  }
  isOperator(char) {
    return char in this.precedence;
  }

  isParenthesis(char) {
    return ["(", ")"].includes(char);
  }

  isDigit(char) {
    return /\d/.test(char);
  }

  getPrecedence(operator) {
    return this.precedence[operator] || 0;
  }
}

module.exports = Parser; 