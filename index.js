const readline = require('readline');
const Calculator = require('./calculator');
const Parser = require('./parser');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const calculator = new Calculator(new Parser());

function promptExpression() {
  rl.question('Введите выражение (или "exit" для выхода): ', (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    try {
      const result = calculator.calculate(input);
      console.log(`Результат: ${result}`);
    } catch (error) {
      console.error(`Ошибка: ${error.message}`);
    }

    promptExpression();
  });
}

promptExpression();