// output "A" after a random time between 0 & 3 seconds
function outputA() {
  let randomTime = Math.floor(Math.random() * 3000) + 1;

  setTimeout(() => {
    console.log('A');
  }, randomTime);
}

// output "B" after a random time between 0 & 3 seconds
function outputB() {
  let randomTime = Math.floor(Math.random() * 3000) + 1;

  setTimeout(() => {
    console.log('B');
  }, randomTime);
}

// output "C" after a random time between 0 & 3 seconds
function outputC() {
  let randomTime = Math.floor(Math.random() * 3000) + 1;

  setTimeout(() => {
    console.log('C');
  }, randomTime);
}