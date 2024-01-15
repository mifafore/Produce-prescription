let menu = document.querySelector(".menu");
let sidebar = document.querySelector(".sidebar");
let mainContent = document.querySelector(".main--content");

menu.onclick = function () {
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("active");
};

/**
 * Modal
 */

const formOpenBtns = document.querySelectorAll(".form-open"),
  modal = document.querySelector(".modal-view"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtns.forEach((formOpenBtn) => {
  console.log("working");
  formOpenBtn.addEventListener("click", () => {
    modal.classList.add("show");
    if (formOpenBtn.classList.contains("login-btn")) {
      formContainer.classList.add("active");
    } else {
      formContainer.classList.remove("active");
    }
  });
});

formCloseBtn.addEventListener("click", () => modal.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

const patientForm = document.getElementById("patient-form");

patientForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { full_name, email, phone, gender, age, password } =
    patientForm.elements;
  const postData = {
    full_name: full_name.value,
    email: email.value,
    phone: phone.value,
    gender: gender.value,
    age: age.value,
    password: "undefined",
  };

  postRequest("/add-patient", postData).then((data) => {
    formContainer.classList.remove("active");
  });
});

const doctorForm = document.getElementById("doctor-form");

doctorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { full_name, specialization, phone, email, work_schedule } =
    doctorForm.elements;

  const postData = {
    full_name: full_name.value,
    specialization: specialization.value,
    phone: phone.value,
    email: email.value,
    work_schedule: work_schedule.value,
    password: "undefined",
  };

  postRequest("/add-doctor", postData).then((data) => {
    formContainer.classList.remove("active");
  });
});

async function postRequest(url, postData) {
  const res = await fetch(`http://localhost:4000/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const data = await res.json();

  return data;
}

async function getRequest(url) {
  const res = await fetch(`http://localhost:4000/api/${url}`);

  const data = await res.json();

  return data;
}
