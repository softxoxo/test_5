const Calculator = require('./calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
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

  test('Выражения с отрицательными числами', () => {
    expect(calculator.calculate('-5 + 3')).toBe(-2);
    expect(calculator.calculate('2 + -3')).toBe(-1);
    expect(calculator.calculate('-2 * 4')).toBe(-8);
    expect(calculator.calculate('6 / -2')).toBe(-3);
  });

  test('Выражения с унарным минусом и плюсом', () => {
    expect(calculator.calculate('-(2 + 3)')).toBe(-5);
    expect(calculator.calculate('-2 * (3 + 4)')).toBe(-14);
    expect(calculator.calculate('+(2 - 3) * 4')).toBe(-4);
    expect(calculator.calculate('+(-2 + 3)')).toBe(1);
  });

  test('Создание нового оператора', () => {
    calculator.addOperator('^', (a, b) => Math.pow(a, b));

    expect(calculator.calculate('2 ^ 3')).toBe(8);
    expect(calculator.calculate('2 + 3 ^ 2 * 4')).toBe(38);
  });
});