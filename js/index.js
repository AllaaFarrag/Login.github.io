let btnSignUp = document.getElementById("btnSignUp");
let btnLogin = document.getElementById("btnLogin");
let Name = document.getElementById("InputName");
let Email = document.getElementById("InputEmail");
let Password = document.getElementById("InputPassword");
let signUpLink = document.querySelector(".signUpLink");
let signInLink = document.querySelector(".signInLink");
let emailAlert = document.getElementById("emailAlert");

let userDataList = JSON.parse(localStorage.getItem("userDataList")) || [];
let existingEmails = userDataList.map(user => user.Email);

console.log(existingEmails);

function validateFields() {
  let isValid = true;

  // Name Validation
  const nameRegex = /^[a-zA-Z\s\-]+$/;
  if (!nameRegex.test(Name.value.trim())) {

    isValid = false;
  }

  // Email Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(Email.value.trim())) {
    isValid = false;
  } else if (existingEmails.includes(Email.value.trim())) {
    emailAlert.classList.remove("d-none");
    isValid = false;
  } else {
    emailAlert.classList.add("d-none");
  }

  // Password Validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!passwordRegex.test(Password.value)) {
    isValid = false;
  } 

  return isValid;
}

function signUp(e) {
  e.preventDefault();
  if (validateFields()) {
    const userData = {
      Name: Name.value.trim(),
      Email: Email.value.trim(),
      Password: Password.value,
    };

    userDataList.push(userData);
    localStorage.setItem("userDataList", JSON.stringify(userDataList));
    existingEmails.push(userData.Email);

    // Switch to login form
    showLoginForm();
    clearForm();
  }
}

btnSignUp.addEventListener("click", signUp);

function loginIn(e) {
  e.preventDefault();

  const enteredEmail = Email.value.trim();
  const enteredPassword = Password.value;

  const user = userDataList.find(
    user => user.Email === enteredEmail && user.Password === enteredPassword
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    showHomeSection(user.Name);
  } else {
    alert("Invalid email or password. Please try again.");
    Email.classList.add("is-invalid");
    Password.classList.add("is-invalid");
  }
}

btnLogin.addEventListener("click", loginIn);

function showHomeSection(userName) {
  document.querySelector(".container").classList.add("d-none");
  const homeSection = document.getElementById("home");
  homeSection.classList.remove("d-none");

  const welcomeName = document.getElementById("welcomeName");
  welcomeName.textContent = `Welcome, ${userName}!`;
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  document.getElementById("home").classList.add("d-none");
  document.querySelector(".container").classList.remove("d-none");
  clearForm();
});

function showSignUpForm(e) {
  if (e) e.preventDefault();

  btnSignUp.classList.remove("d-none");
  btnLogin.classList.add("d-none");
  HaveAccount.classList.remove("d-none");
  NoAccount.classList.add("d-none");
  Name.parentElement.classList.remove("d-none");
}

function showLoginForm(e) {
  if (e) e.preventDefault();

  btnSignUp.classList.add("d-none");
  btnLogin.classList.remove("d-none");
  HaveAccount.classList.add("d-none");
  NoAccount.classList.remove("d-none");
  Name.parentElement.classList.add("d-none");
}

signUpLink.addEventListener("click", showSignUpForm);
signInLink.addEventListener("click", showLoginForm);

function clearForm() {
  Name.value = "";
  Email.value = "";
  Password.value = "";
  Name.classList.remove("is-valid", "is-invalid");
  Email.classList.remove("is-valid", "is-invalid");
  Password.classList.remove("is-valid", "is-invalid");
}
