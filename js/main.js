(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  let selectTopbar = select("#topbar");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
        if (selectTopbar) {
          selectTopbar.classList.add("topbar-scrolled");
        }
      } else {
        selectHeader.classList.remove("header-scrolled");
        if (selectTopbar) {
          selectTopbar.classList.remove("topbar-scrolled");
        }
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }
})();

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
  console.log("testing");
  formOpenBtn.addEventListener("click", () => {
    modal.classList.add("show");
    if (formOpenBtn.innerHTML === "Signup") {
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

const loginForm = document.getElementById("login-form"),
  signupForm = document.getElementById("signup-form"),
  loginError = document.querySelector(".login-error"),
  signupError = document.querySelector(".signup-error");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { email, password, user } = loginForm.elements;
  const postData = {
    email: email.value,
    password: password.value,
    user: user.value,
  };

  postRequest("login", postData).then((data) => {
    if (data.length > 0) {
      console.log(data);
      console.log("Successful");
      window.location.href = "/client/pages/admin.html";
    } else {
      loginError.classList.add("form-error-show");
    }
  });
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { full_name, email, phone, gender, age, password } =
    signupForm.elements;
  const postData = {
    full_name: full_name.value,
    email: email.value,
    phone: phone.value,
    gender: gender.value,
    age: age.value,
    password: password.value,
  };

  postRequest("signup", postData).then((data) => {
    formContainer.classList.remove("active");
  });
});

/**
 * Dashboard
 */
let menu = document.querySelector(".menu");
let sidebar = document.querySelector(".sidebar");
let mainContent = document.querySelector(".main--content");

menu.onclick = function () {
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("active");
};

/**
 * Request Functions
 */

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
