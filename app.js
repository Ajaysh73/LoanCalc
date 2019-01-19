// Listen for submit
// document
//   .getElementById("loan-form")
//   .addEventListener("click", calculateResults);
document.getElementById("loan-form").addEventListener("submit", function(e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults(e) {
  console.log("calculate clicked");
  // UI Vars
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculateInterest, calculatedPayments);
  const monthly = (principal * x * calculateInterest) / (x - 1);
  console.log(monthly);
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show Results
    document.getElementById("results").style.display = "block";

    // Hide Loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
//   e.preventDefault();
}

function showError(error) {
  // Hide Results
  document.getElementById("results").style.display = "none";

  // Hide Loader
  document.getElementById("loading").style.display = "none";

  // Create Div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 2000);
}

//Clear Error

function clearError() {
  document.querySelector(".alert").remove();
}
