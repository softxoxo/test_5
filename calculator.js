const Parser = require('./parser');

class Calculator {
	constructor() {
	  this.parser = new Parser();
	  this.operatorFunctions = {
		"+": (a, b) => a + b,
		"-": (a, b) => a - b,
		"*": (a, b) => a * b,
		"/": (a, b) => a / b,
	  };
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
	  const operationFn = this.operatorFunctions[operator];
	  if (!operationFn) {
		throw new Error(`Unsupported operator: ${operator}`);
	  }
	  return operationFn(...operands);
	}
  
	addOperator(operator, operationFn) {
	  this.operatorFunctions[operator] = operationFn;
	  this.parser.precedence[operator] = Object.keys(this.parser.precedence).length + 1;
	}
  }
  
  module.exports = Calculator;