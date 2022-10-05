function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let num = 1;
  while (true) {
    if (num % 3 === 0 && num % 5 === 0) yield 'Fizz Buzz';
    else if (num % 3 === 0) yield 'Fizz';
    else if (num % 5 === 0) yield 'Buzz';
    else yield num;
    if (max && num === max) return;
    num++;
  }
}

// n = fizzBuzzGenerator(7);

module.exports = fizzBuzzGenerator;
