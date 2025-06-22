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


// ✅ FINAL FIX: Remove default button behavior completely

const token = localStorage.getItem("jwt");

function toggleDropdown() {
  const dropdown = document.getElementById("user-dropdown");
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }
}

function hideDropdown() {
  const dropdown = document.getElementById("user-dropdown");
  if (dropdown) dropdown.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("navbar-login");
  const profileWrapper = document.getElementById("user-menu-wrapper");
  let userBtn = document.getElementById("user-btn");
  const userName = document.getElementById("user-name");
  const dropdownUsername = document.getElementById("dropdown-username");
  const logoutBtn = document.getElementById("logout-btn");
  const dropdown = document.getElementById("user-dropdown");

  let isLoggedIn = false;

  if (loginBtn) loginBtn.style.display = "inline-block";
  if (profileWrapper) profileWrapper.style.display = "inline-block";
  if (userName) userName.style.display = "none";

  // Completely replace userBtn to remove ALL listeners and attributes
  if (userBtn) {
    const clone = userBtn.cloneNode(true);
    userBtn.parentNode.replaceChild(clone, userBtn);
    userBtn = document.getElementById("user-btn");
  }

  // Set safe handler
  userBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoggedIn) {
      toggleDropdown();
    } else {
      window.location.href = "/pages/login.html";
    }
  });

  document.addEventListener("click", (e) => {
    if (!profileWrapper?.contains(e.target)) {
      hideDropdown();
    }
  });

  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    window.location.href = "/pages/login.html";
  });

  if (token) {
    fetch(`${API}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(user => {
        isLoggedIn = true;
        if (loginBtn) loginBtn.style.display = "none";
        if (profileWrapper) profileWrapper.style.display = "inline-block";
        if (userName) {
          userName.textContent = `Hi, ${user.username}`;
          userName.style.display = "inline";
        }
        if (dropdownUsername) dropdownUsername.textContent = user.username;
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      });
  }
});














//cart


document.querySelectorAll('.card-action-btn').forEach(button => {
  button.addEventListener('click', function () {
    const productCard = this.closest('.product-card');
    const title = productCard.querySelector('.card-title').textContent;
    const price = productCard.querySelector('.card-price').getAttribute('value');
    const image = productCard.querySelector('.default').getAttribute('src');

    const product = { title, price, image };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Item added to cart!");
  });
});

//cart increase amt
// Cart Badge Updater
// Cart Badge Updater
function updateCartBadge() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.qty) || 1), 0);
    const badge = document.querySelector('.btn-badge');
    if (badge) badge.textContent = totalItems;
  } catch (err) {
    console.error("Failed to update cart badge:", err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  const buttons = document.querySelectorAll('[data-add-to-cart]');
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
const productCard = btn.closest('.product-card') || btn.closest('.product-card-ui');

const title =
  productCard.querySelector('.card-title')?.textContent?.trim() ||
  productCard.querySelector('.product-title')?.textContent?.trim() ||
  'Untitled';

const priceText =
  productCard.querySelector('.card-price')?.getAttribute('value') ||
  productCard.querySelector('.product-price')?.textContent ||
  '0';
const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;

const image =
  productCard.querySelector('img.img-cover.default')?.getAttribute('src') ||
  productCard.querySelector('img')?.getAttribute('src') ||
  '';


      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(p => p.title === title);

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ title, price, qty: 1, image });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartBadge();
    });
  });
});



var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6857aa29a2278f190d24fc8d/1iub71cs9';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();



document.addEventListener('DOMContentLoaded', () => {
  fetch(`${API}/api/products`)
    .then(res => res.json())
    .then(products => {
      const grid = document.querySelector('.product-grid');
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = `product-card-ui${product.sale ? ' sale' : ''}`;
        card.innerHTML = `
          ${product.sale ? `<span class="badge">Sale</span>` : ''}
          <img src="${product.image}" alt="${product.title}">
          <p class="product-title">${product.title}</p>
          ${product.oldPrice ? `<p class="product-old-price">LE ${product.oldPrice}.00 EGP</p>` : ''}
          <p class="product-price">LE ${product.price}.00 EGP</p>
          <button class="card-action-btn" data-add-to-cart>
            <ion-icon name="cart-outline"></ion-icon>
            <span>Add to Cart</span>
          </button>
        `;
        grid.appendChild(card);
      });

      attachAddToCartEvents();
    });
});

function attachAddToCartEvents() {
  document.querySelectorAll('[data-add-to-cart]').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card-ui') || button.closest('.product-card');

      const title =
        card.querySelector('.product-title')?.innerText ||
        card.querySelector('.card-title')?.innerText ||
        'Unknown';

      const priceText =
        card.querySelector('.product-price')?.innerText ||
        card.querySelector('.card-price')?.getAttribute('value') ||
        '0';

      const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;

      addToCart({ title, price });
    });
  });
}


