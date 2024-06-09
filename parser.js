class Parser {
	parse(expression) {
	  const tokens = this.tokenize(expression);
	  return this.parseExpression(tokens);
	}
  
	tokenize(expression) {
	  const tokens = [];
	  let currentToken = '';
  
	  for (const char of expression) {
		if (this.isOperator(char) || this.isParenthesis(char)) {
		  if (currentToken !== '') {
			tokens.push(currentToken);
			currentToken = '';
		  }
		  tokens.push(char);
		} else if (this.isDigit(char) || char === '.') {
		  currentToken += char;
		} else if (char !== ' ') {
		  throw new Error(`Invalid character: ${char}`);
		}
	  }
  
	  if (currentToken !== '') {
		tokens.push(currentToken);
	  }
  
	  return tokens;
	}
  
	parseExpression(tokens) {
	  const operatorStack = [];
	  const operandStack = [];
  
	  for (const token of tokens) {
		if (this.isOperator(token)) {
		  while (
			operatorStack.length > 0 &&
			this.getPrecedence(token) <= this.getPrecedence(operatorStack[operatorStack.length - 1])
		  ) {
			const operator = operatorStack.pop();
			const right = operandStack.pop();
			const left = operandStack.pop();
			operandStack.push([operator, left, right]);
		  }
		  operatorStack.push(token);
		} else if (token === '(') {
		  operatorStack.push(token);
		} else if (token === ')') {
		  while (operatorStack[operatorStack.length - 1] !== '(') {
			const operator = operatorStack.pop();
			const right = operandStack.pop();
			const left = operandStack.pop();
			operandStack.push([operator, left, right]);
		  }
		  operatorStack.pop();
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
	  return ['+', '-', '*', '/'].includes(char);
	}
  
	isParenthesis(char) {
	  return ['(', ')'].includes(char);
	}
  
	isDigit(char) {
	  return /\d/.test(char);
	}
  
	getPrecedence(operator) {
	  switch (operator) {
		case '+':
		case '-':
		  return 1;
		case '*':
		case '/':
		  return 2;
		default:
		  return 0;
	  }
	}
  }
  
  module.exports = Parser;