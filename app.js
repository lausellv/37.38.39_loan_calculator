// add event listeners  
// FINAL STEP -after hiding the gif and the results table we are going to change calculate results to a function 
// basically we want to DELAY calculate results so that the gif goes on before user gets an instant result
// document.getElementById('loan-form').addEventListener('submit', calculateResults);
document.getElementById('loan-form').addEventListener('submit', function(e){
//hide results , eventhough they are already hidden by default we want them to be hidden right away
document.getElementById('results').style.display = 'none';
//show loader
document.getElementById('loading').style.display = 'block';
setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults(){
console.log('Calculating...');
//UI variables
const amount =  document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

//parseFloat will create a number with decimal
const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calculatedPayments = parseFloat(years.value)*12;

// computing the mo payments
const x = Math.pow(1+calculatedInterest, calculatedPayments);
const monthly = (principal*x*calculatedInterest)/(x-1);

if (isFinite(monthly)){
monthlyPayment.value = monthly.toFixed(2);  // toFixed sets the decimal value to two
totalPayment.value = (monthly*calculatedPayments).toFixed(2);
totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
//show results
document.getElementById('results').style.display = 'block';
//hide loader gif
document.getElementById('loading').style.display = 'none';

}else{
showError('Please check your numbers');
//hide loader gif
document.getElementById('loading').style.display = 'none';
}

  
}


//Show error
function showError(error){
//create a div
const errorDiv = document.createElement('div');

// STEP 2 - we have appended the text to the div we created but now we need to append the div to the DOM
// we need to grab the element where we want to append this div to
// in this case we want the card as the parent div and place it before the h1 Loan Calculator heading
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');

// add alert class
errorDiv.className ='alert alert-danger';
// STEP 1 - create textnode and append to div
errorDiv.appendChild(document.createTextNode(error));



//STEP 3 -  insert error above heading by taking the parent , which is the card, and using this method
//inserting the error div in the card before the heading
card.insertBefore(errorDiv, heading);

 // Clear error after 3 seconds  setTimeout takes two parameters a callback function and the time
 setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
}









// // Calculate Results
// function calculateResults(e){
//   console.log('Calculating...');
//   // UI Vars
//   const amount = document.getElementById('amount');
//   const interest = document.getElementById('interest');
//   const years = document.getElementById('years');
//   const monthlyPayment = document.getElementById('monthly-payment');
//   const totalPayment = document.getElementById('total-payment');
//   const totalInterest = document.getElementById('total-interest');

//   const principal = parseFloat(amount.value);
//   const calculatedInterest = parseFloat(interest.value) / 100 / 12;
//   const calculatedPayments = parseFloat(years.value) * 12;

//   // Compute monthly payment
//   const x = Math.pow(1 + calculatedInterest, calculatedPayments);
//   const monthly = (principal*x*calculatedInterest)/(x-1);

//   if(isFinite(monthly)) {
//     monthlyPayment.value = monthly.toFixed(2);
//     totalPayment.value = (monthly * calculatedPayments).toFixed(2);
//     totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
//   } else {
//     showError('Please check your numbers');
//   }

//   e.preventDefault();
// }