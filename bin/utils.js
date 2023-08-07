export const askQuestion = (question, fn1, fn2, cmd) => {
  cmd.question(question, (input) => {
    if (input === 'y' || input === 'yes') {
      fn1();
    } else {
      fn2();
    }
  });
};

export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
