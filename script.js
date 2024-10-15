'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Nico Niels',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Beca Geda',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Tim Sa',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Erick Paul',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//
// currencies.forEach(function(value, key){

//   console.log(key, value);
// })

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const alphabet = ['a','b','c','d','e']

//slice works similar to the string slice method
// console.log(alphabet.slice(2,3))

// console.log(alphabet);

// console.log(alphabet.splice(0,2))

// console.log(alphabet);

//revers method will revers the array elements does not meant that will sort them

// let nums = [1,2,3,4,5];
// console.log(nums.reverse());

//contact

// console.log(alphabet.concat(nums));
// console.log([...alphabet, ...nums, 10])

//join it does not mean that will join like concatinating the array values

// console.log(alphabet.join('*'))

// console.log(nums.at(-1))

//for each  method

// const displayAccount = function(account, index){
//   console.log(`${index+1} ${account.owner} ${account.interestRate}`);
//   nums.forEach(function(n){

//     console.log(n);
//   })
// }

// accounts.forEach(displayAccount);

// const setOfData = new Set(['a','b','b','b','c','c','d','d']);

// console.log(setOfData);

// setOfData.forEach((value) =>{
// console.log(value);
// })

//create a display funciont to render the movemtns from a user

const displayMovements = function(movements, state=false){

  containerMovements.innerHTML = '';

  const movementsCopy = state ? movements.slice().sort((a, b) => a - b) : movements;

  movementsCopy.forEach(function(mov, i){

   

    const type = mov > 0 ? 'deposit':'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}💲</div>
        </div>`;
    

        containerMovements.insertAdjacentHTML("afterbegin",html);
  });
}

// displayMovements(account1.movements);

const calDisplaySummary = function(acc){

  const incomes = acc.movements.filter(move => move > 0).reduce((acc, mov) => acc += mov,0);
  labelSumIn.textContent = `${incomes}💲`;

  const outcomes = acc.movements.filter(move => move < 0).reduce((acc, mov) => acc += mov,0);
  labelSumOut.textContent = `${Math.abs(outcomes)}💲`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100).filter((dep, i, arr) => {
      console.log(arr);
      return dep >=1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}💲`;
}

// calDisplaySummary(account1.movements);


const displayCalBalance = function(account){

  const balance = account.movements.reduce((acc, mov) => acc+mov, 0);

  account.balance = balance;
  labelBalance.textContent =  `${balance} EUR`;


}

// displayCalBalance(account1.movements);

//DRY display UI

const updateUI = function(userAccount){

    //display movements
    displayMovements(userAccount.movements);
    //display summary
    calDisplaySummary(userAccount);
    //display cal balance
    displayCalBalance(userAccount);

}

//practice map with the example

const user = account1.owner;

// const userName = user.toLocaleLowerCase().split(' ').map(function(name){

//   return name[0];
// }).join('');

//convert it to array function

// const userName = user.toLocaleLowerCase().split(' ').map(name => name[0]).join('');
// console.log(userName);

//transform this on fucntion

// const createUserNames = function (user) {
//   const userName = user
//     .toLocaleLowerCase()
//     .split(' ')
//     .map(name => name[0])
//     .join('');

//     return userName;
// };


// console.log(createUserNames(user));

//tranform this on a function for all the accounts

const createUserNames = function (accs) {
  accs.forEach(function(ac){

    ac.username = ac.owner
    .toLocaleLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');

  })

};



createUserNames(accounts);

// console.log(accounts);





//implement log in

let currentAccount;


btnLogin.addEventListener('click', function(e){
  //prevent the default behavior of form submitting
  e.preventDefault();
let inputUser =inputLoginUsername.value;
// console.log('js' === inputUser)

currentAccount = accounts.find(function(element){
      return element.username === inputUser;
      })

      // console.log(currentAccount.owner);

      //log in process
//if the accounts exits read pin 
      if(currentAccount?.pin === Number(inputLoginPin.value)){

        console.log("correct");
        //clear fields

        inputLoginUsername.value = inputLoginPin.value = '';

        inputLoginPin.blur();

        //display welcome mesage
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ').at(0)}`;
        //display app container
        containerApp.style.opacity = '100';

        // //display movements
        // displayMovements(currentAccount.movements);
        // //display summary
        // calDisplaySummary(currentAccount);
        // //display cal balance
        // displayCalBalance(currentAccount);

        updateUI(currentAccount);

        // const sortedMovements= currentAccount.movements
        //   .sort((a, b) => b - a);
      
        // btnSort.addEventListener('click', displayMovements.bind(null, sortedMovements));
 
        // sortAcc(currentAccount.movements);//

      // sortAcc(currentAccount);


      }else{
        labelWelcome.textContent = `Invalid username and password`;
        
      }

});





//transfers

btnTransfer.addEventListener('click', function(e){

  e.preventDefault();

  let amount = Number(inputTransferAmount.value)
  let transferTo = accounts.find(function(acc){
return acc.username === inputTransferTo.value;
  })
//reset inputs to black string
  inputTransferAmount.value = inputTransferTo.value ='';

  if(transferTo && transferTo?.username !== currentAccount.username  && amount > 0 && currentAccount.balance > amount){

    console.log(amount, transferTo, 'valid transfer');

    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);
    updateUI(currentAccount);
  }else{
    console.log('invalid');
  }

 


})

//check if the account is the same to able to deleted

btnClose.addEventListener('click', function(e){

e.preventDefault();

let checkUser = inputCloseUsername.value;
let checkPin = Number(inputClosePin.value);

if(currentAccount.username === checkUser && currentAccount.pin === checkPin){

  console.log('delete');

  const index = accounts.findIndex(acc => acc.username === currentAccount.username);

  console.log(index);

  accounts.splice(index, 1);

  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Welcome';
}

inputCloseUsername.value = inputClosePin.value = '';

})

//write the code to request loan one of your deposits should be at least the 10%

btnLoan.addEventListener('click', function(e){

  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){


    console.log(amount);
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';

})

//sort
let togleVariable = false;
//sort

btnSort.addEventListener('click', function(e) {

  e.preventDefault();
  displayMovements(currentAccount.movements, !togleVariable);

  togleVariable = !togleVariable;


})

// const sortAcc = function(acc){
//   const sortedMovements= acc.movements
//   .sort((a, b) => b - a);
//   btnSort.addEventListener('click', displayMovements.bind(null, sortedMovements));

// }


//write a function to filter deposits and to filter withdrawls

const deposits = movements.filter(function(mov){

  return mov > 0;
})



const withdrawals = movements.filter(function(mov){
   return mov < 0;
})

console.log(deposits, withdrawals);

//write a function to sum the movements using reduce

// const balance = movements.reduce(function(acc, mov, i, arr){
// return acc + mov;
// }, 0)

// console.log(balance);

// labelBalance.textContent = `${balance} EUR`;

//render the balance to the dom

//write a function the return the max

const maximo = movements.reduce((acc, mov) => {

  if(acc < mov){
return mov;
  }else{
return acc;
  }

} ,movements[0]);

// console.log(maximo, movements);

//conver EUR to USD 1.1

const eurToUsd=1.1;

const totalDepositUsd = movements
  .filter(mov => mov > 0)
  .map(value => value * eurToUsd)
  .reduce((acc, val) => (acc += val))
  .toFixed(2);

// console.log(totalDepositUsd);


//use the fin method


// const query = accounts.find(function(element){
// return element.owner === 'Sarah Smith'
// })


// console.log(query)

// let userInUse = {};

// for(let u of accounts){

//   if(u.owner === 'Sarah Smith'){
//     userInUse= u;
//   }
// }

// console.log(userInUse);

//practice some and every

const reused = mov => mov > 0;

console.log(account1.movements.some(reused), account1.movements);

console.log(account4.movements.every(reused));

//practice flat and map / flatMap
let deeperNestedArray = [ 5, 2,
  [1, [2, 3]],
  [[4, 5], 6]
];

console.log(deeperNestedArray.flat(2));

console.log(deeperNestedArray.flatMap(num => num))

const allBalance = accounts.map(acc => acc.movements);

const cleanBalance = allBalance.flat();

const callAllBal = cleanBalance.reduce((acc, val) => acc + val);

console.log(callAllBal);

console.log(accounts.flatMap(acc => acc.movements).reduce((acc, val) => acc + val))


//exercise
//1. sum the deposits from all the accounts

const sumOfAllAccounts = accounts
  .flatMap(mov => mov.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);

console.log(sumOfAllAccounts);


