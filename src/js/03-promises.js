const refs = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  btn: document.querySelector('button'),
};
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
refs.btn.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();
  if (
    refs.amount.value === '' ||
    refs.delay.value === '' ||
    refs.step.value === ''
  ) {
    // preventDefault();
    return alert('Все поля должны быть заполнены');
  }
  createPromise(1, refs.delay.value)
    .then(({ position, delay }) =>
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
    )
    .catch(({ position, delay }) =>
      console.log(`❌ Rejected promise ${position} in ${delay}ms`)
    );

  makeMorePromises();
  clearInputs();
}

function makeMorePromises() {
  let time = Number(refs.delay.value);
  for (let i = 2; i <= refs.amount.value; i += 1) {
    createPromise(i, (time += Number(refs.step.value)))
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) =>
        console.log(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }
}

function clearInputs() {
  refs.amount.value = '';
  refs.delay.value = '';
  refs.step.value = '';
}
