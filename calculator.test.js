const Calculator = require('./calculator');
const Parser = require('./parser');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    const parser = new Parser();
    calculator = new Calculator(parser);
  });

  test('Простые выражения', () => {
    expect(calculator.calculate('2 + 3')).toBe(5);
    expect(calculator.calculate('5 - 2')).toBe(3);
    expect(calculator.calculate('4 * 6')).toBe(24);
    expect(calculator.calculate('10 / 2')).toBe(5);
  });

  test('Сложные выражения', () => {
    expect(calculator.calculate('2 + 3 * 4')).toBe(14);
    expect(calculator.calculate('(2 + 3) * 4')).toBe(20);
    expect(calculator.calculate('10 - 2 * 3 + 4 / 2')).toBe(6);
  });

  test('Создание нового оператора', () => {
    const parser = new Parser();
    parser.addOperator('^', (a, b) => Math.pow(a, b), 3);
    calculator = new Calculator(parser);

    expect(calculator.calculate('2 ^ 3')).toBe(8);
    expect(calculator.calculate('2 + 3 ^ 2 * 4')).toBe(38);
  });
});