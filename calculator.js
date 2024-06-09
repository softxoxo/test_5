class Calculator {
	constructor(parser) {
	  this.parser = parser;
	}
  
	calculate(expression) {
	  const parsedExpression = this.parser.parse(expression);
	  return this.evaluateExpression(parsedExpression);
	}
  
	evaluateExpression(expression) {
	  if (Array.isArray(expression)) {
		const [operator, ...operands] = expression;
		const evaluatedOperands = operands.map(operand => this.evaluateExpression(operand));
		return this.performOperation(operator, evaluatedOperands);
	  }
	  return parseFloat(expression);
	}
  
	performOperation(operator, operands) {
	  switch (operator) {
		case '+':
		  return operands.reduce((sum, operand) => sum + operand, 0);
		case '-':
		  return operands.reduce((difference, operand) => difference - operand);
		case '*':
		  return operands.reduce((product, operand) => product * operand, 1);
		case '/':
		  return operands.reduce((quotient, operand) => quotient / operand);
		default:
		  throw new Error(`Unsupported operator: ${operator}`);
	  }
	}
  }
  
  module.exports = Calculator;