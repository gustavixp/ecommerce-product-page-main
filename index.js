// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-        H A M B U R G U E R   M E N U        -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const hamburger = document.querySelector(".hamb");
const HambClose = document.querySelector(".hamb-close");
const menu = document.querySelector(".nav__links");
const overlay = document.querySelector(".nav__overlay");
hamburger.addEventListener("click", () => {
  menu.classList.toggle("menu-open");
  hamburger.classList.toggle("hide");
  HambClose.classList.toggle("show");
  overlay.classList.toggle("show");
});

HambClose.addEventListener("click", () => {
  menu.classList.remove("menu-open");
  hamburger.classList.remove("hide");
  HambClose.classList.remove("show");
  overlay.classList.remove("show");
});

document.addEventListener("click", (event) => {
  if (
    !menu.contains(event.target) &&
    event.target !== hamburger &&
    event.target !== HambClose
  ) {
    menu.classList.remove("menu-open");
    hamburger.classList.remove("hide");
    HambClose.classList.remove("show");
    overlay.classList.remove("show");
  }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-                   C A R T                   -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const addToCartButton = document.querySelector(".add-btn");
const cartButton = document.querySelector(".cart-btn");
const amount = document.querySelector(".amount");
const minusButton = document.querySelector(".minus");
const plusButton = document.querySelector(".plus");
const indicator = document.querySelector(".indicator");
const cartText = document.querySelector(".cart__text");
const emptyCartText = document.createElement("p");
const cartContent = document.querySelector(".cart__content");
const cartProduct = document.querySelector(".cart__product--on");
const cartNumber = document.querySelector(".number");
const cartTotal = document.querySelector(".total");
const checkoutButton = document.querySelector(".checkout-btn");
emptyCartText.innerText = "Your cart is empty";
cartText.appendChild(emptyCartText);

// Initialize cart quantity and state
let cartQuantity = 0;

// Update cart state and related elements
function updateCartState() {
  if (cartQuantity === 0) {
    indicator.style.display = "none";
  } else {
    indicator.innerText = cartQuantity;
    indicator.style.display = "flex";
  }
  emptyCartText.style.display = cartQuantity === 0 ? "block" : "none";
  cartProduct.style.display = cartQuantity === 0 ? "none" : "flex";
  checkoutButton.style.display = cartQuantity === 0 ? "none" : "block";
}
updateCartState();

// Add to cart functionality
addToCartButton.addEventListener("click", () => {
  cartQuantity += parseInt(amount.innerText);
  cartNumber.innerText = cartQuantity;
  cartTotal.innerText = `$${cartQuantity * 125}.00`;
  updateCartState();
});

// Minus button functionality
minusButton.addEventListener("click", () => {
  if (parseInt(amount.innerText) > 0) {
    amount.innerText = parseInt(amount.innerText) - 1;
  }
});

// Plus button functionality
plusButton.addEventListener("click", () => {
  amount.innerText = parseInt(amount.innerText) + 1;
});

// Delete button functionality
const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartQuantity = 0;
    cartNumber.innerText = cartQuantity;
    cartTotal.innerText = `$${cartQuantity * 125}.00`;
    updateCartState();
  });
});

// Cart button functionality
cartButton.addEventListener("click", () => {
  cartContent.style.display =
    cartContent.style.display === "block" ? "none" : "block";
});

// Close cart content when user clicks outside of it
document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".cart__content") &&
    !event.target.closest(".cart-btn")
  ) {
    cartContent.style.display = "none";
  }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-               L I G H T B O X               -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Get elements
const bigImage = document.querySelector(".big-pic-product");
const thumbnails = document.querySelectorAll(".gallery__thumbs img");

// Function to update thumbnail outline
function updateThumbnailOutline() {
  thumbnails.forEach((thumbnail, index) => {
    if (index === parseInt(bigImage.dataset.index)) {
      thumbnail.style.outline = "2px solid var(--primary-orange-400)";
      thumbnail.style.outlineOffset = "2px";
    } else {
      thumbnail.style.outline = "none";
    }
  });
}

// Thumbnails click event
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    bigImage.src = thumbnail.src.replace("-thumbnail", "");
    bigImage.dataset.index = index;
    bigImage.dataset.tapped = "true";
    updateThumbnailOutline();
  });
});

// Lightbox elements
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
document.body.appendChild(lightbox);

const lightboxContent = document.createElement("div");
lightboxContent.classList.add("lightbox-content");
lightbox.appendChild(lightboxContent);

const lightboxImg = document.createElement("img");
lightboxContent.appendChild(lightboxImg);

const closeButton = document.createElement("span");
closeButton.classList.add("close");
closeButton.innerHTML = "×";
lightboxContent.appendChild(closeButton);

const prevButton = document.createElement("a");
prevButton.classList.add("prev");
prevButton.innerHTML = "❮";
lightboxContent.appendChild(prevButton);

const nextButton = document.createElement("a");
nextButton.classList.add("next");
nextButton.innerHTML = "❯";
lightboxContent.appendChild(nextButton);

// Big image click event
bigImage.addEventListener("click", () => {
  if (bigImage.dataset.tapped !== "true") {
    // Open desktop lightbox only if the image was not tapped
    lightbox.style.display = "block";
    lightboxImg.src = bigImage.src;
  } else {
    // Reset tapped attribute
    bigImage.dataset.tapped = "false";
  }
});

// Close button click event
closeButton.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Prev and next buttons click events
prevButton.addEventListener("click", () => {
  const currentIndex = parseInt(bigImage.dataset.index);
  const newIndex =
    currentIndex === 0 ? thumbnails.length - 1 : currentIndex - 1;
  bigImage.src = thumbnails[newIndex].src.replace("-thumbnail", "");
  bigImage.dataset.index = newIndex;
  lightboxImg.src = bigImage.src;
  updateThumbnailOutline();
});

nextButton.addEventListener("click", () => {
  const currentIndex = parseInt(bigImage.dataset.index);
  const newIndex = (currentIndex + 1) % thumbnails.length;
  bigImage.src = thumbnails[newIndex].src.replace("-thumbnail", "");
  bigImage.dataset.index = newIndex;
  lightboxImg.src = bigImage.src;
  updateThumbnailOutline();
});

// Click outside of image to close lightbox
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.style.display = "none";
  }
});

updateThumbnailOutline();

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-      M O B I L E   " L I G H T B O X "      -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Touch event variables
let touchStartX = null;
let touchEndX = null;
const prevArrow = document.getElementById("prev-arrow");
const nextArrow = document.getElementById("next-arrow");
// Touchstart event listener
bigImage.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});
// Touchmove event listener
bigImage.addEventListener("touchmove", (event) => {
  touchEndX = event.changedTouches[0].screenX;
});
// Touchcancel and touchend event listeners
bigImage.addEventListener("touchcancel", resetTouch);
bigImage.addEventListener("touchend", () => {
  if (touchStartX && touchEndX) {
    const swipeDirection = touchEndX - touchStartX;
    if (swipeDirection > 0) {
      // Right swipe
      prevImage();
    } else {
      // Left swipe
      nextImage();
    }
  }
  resetTouch();
});
// Functions to change the image
function prevImage() {
  const currentIndex = parseInt(bigImage.dataset.index);
  const newIndex =
    currentIndex === 0 ? thumbnails.length - 1 : currentIndex - 1;
  bigImage.src = thumbnails[newIndex].src.replace("-thumbnail", "");
  bigImage.dataset.index = newIndex;
  bigImage.dataset.tapped = "true"; // Set tapped attribute to true
}
function nextImage() {
  const currentIndex = parseInt(bigImage.dataset.index);
  const newIndex = (currentIndex + 1) % thumbnails.length;
  bigImage.src = thumbnails[newIndex].src.replace("-thumbnail", "");
  bigImage.dataset.index = newIndex;
  bigImage.dataset.tapped = "true"; // Set tapped attribute to true
}
// Function to reset touch variables
function resetTouch() {
  touchStartX = null;
  touchEndX = null;
}
// Add event listeners for the arrows
prevArrow.addEventListener("click", prevImage);
nextArrow.addEventListener("click", nextImage);
