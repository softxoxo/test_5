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
	  const operationFn = this.parser.getOperationFunction(operator);
	  if (!operationFn) {
		throw new Error(`Unsupported operator: ${operator}`);
	  }
	  return operationFn(...operands);
	}
  }
  
  module.exports = Calculator;