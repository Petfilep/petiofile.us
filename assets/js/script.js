'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navToggler = document.querySelector("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);


const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Handle form submission
  const form = document.querySelector('.contact-form form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Grab form data
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const message = form.querySelector('#message').value;
    const orderNumber = form.querySelector('#orderNumber').value;
    const product = form.querySelector('#product').value;

    // Validate required fields
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Prepare the data for submission (example for AJAX request)
    const formData = {
      name,
      email,
      message,
      orderNumber: orderNumber || 'Not provided', // Optional field
      product: product || 'Not provided' // Optional field
    };

    console.log('Form submitted:', formData);

    // Example: Simulate successful submission
    alert('Your message has been sent successfully!');
    form.reset(); // Reset form after submission
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.querySelector("[aria-label='cart']");
  if (cartButton) {
    cartButton.addEventListener("click", function () {
      window.location.href = "/pages/cart.html";  // Redirect to cart page
    });
  }
});

//userbutton
document.addEventListener("DOMContentLoaded", function () {
  const userButton = document.getElementById("user-btn");
  const userNameSpan = document.getElementById("user-name");

  // Check if user is logged in
  const userId = localStorage.getItem("user_id");
  const userName = localStorage.getItem("user_name");

  // If user is logged in, display their name and options
  if (userId && userName) {
    userNameSpan.textContent = userName;  // Display the logged-in user's name
    userButton.addEventListener("click", function () {
      // Show options when user clicks on their name
      const isAccount = confirm(`Welcome, ${userName}! Do you want to view your account or sign out?`);

      if (isAccount) {
        window.location.href = "/pages/account.html";  // Redirect to account page (if you have one)
      } else {
        // Sign out the user
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        window.location.href = "index.html";  // Redirect to home after sign-out
      }
    });
  } else {
    // If user is not logged in, redirect to the login page
    userButton.addEventListener("click", function () {
      window.location.href = "/pages/login.html";  // Redirect to login page if not logged in
    });
  }
});

// login
const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = this.email.value;
    const password = this.password.value;

    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("jwt", data.token);
      window.location.href = "/index.html";
    } else {
      alert(data.message || "Login failed");
    }
  });
}



//Detect Logged-in User
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwt");
  const userBtn = document.getElementById("user-btn");
  const userName = document.getElementById("user-name");

  if (token && userBtn && userName) {
    fetch(`${API}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(user => {
      userName.textContent = `Hi, ${user.username}`;
      userBtn.onclick = () => window.location.href = "/pages/profile.html";
    })
    .catch(() => {
      localStorage.removeItem("jwt");
      userBtn.onclick = () => window.location.href = "/pages/login.html";
    });
  } else {
    userBtn.onclick = () => window.location.href = "/pages/login.html";
  }
});


