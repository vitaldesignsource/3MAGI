const cartButton = document.querySelector("[data-cart-button]");
const closeCartButton = document.querySelector("[data-close-cart]");
const drawer = document.querySelector("[data-cart-drawer]");
const count = document.querySelector("[data-cart-count]");
const itemsList = document.querySelector("[data-cart-items]");
const addButtons = document.querySelectorAll("[data-add-book]");
const signup = document.querySelector("[data-signup]");
const humanForms = document.querySelectorAll("[data-human-form]");

const cart = [];

function renderCart() {
  count.textContent = String(cart.length);
  itemsList.innerHTML = "";

  if (cart.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "Your cart is empty.";
    itemsList.append(empty);
    return;
  }

  cart.forEach((title) => {
    const item = document.createElement("li");
    item.textContent = title;
    itemsList.append(item);
  });
}

function setDrawer(open) {
  drawer.classList.toggle("is-open", open);
  drawer.setAttribute("aria-hidden", String(!open));
}

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cart.push(button.dataset.addBook);
    renderCart();
    setDrawer(true);
  });
});

if (cartButton && closeCartButton && drawer) {
  cartButton.addEventListener("click", () => setDrawer(true));
  closeCartButton.addEventListener("click", () => setDrawer(false));
}

humanForms.forEach((form) => {
  const firstNumber = Math.floor(Math.random() * 6) + 2;
  const secondNumber = Math.floor(Math.random() * 6) + 2;
  const expectedAnswer = firstNumber + secondNumber;
  const question = form.querySelector("[data-human-question]");
  const answer = form.querySelector("[data-human-answer]");
  const note = form.querySelector("[data-form-note], [data-contact-note]");

  question.textContent = `What is ${firstNumber} + ${secondNumber}?`;

  form.addEventListener("submit", (event) => {
    if (Number(answer.value) !== expectedAnswer) {
      event.preventDefault();
      answer.setCustomValidity("Please answer the human check correctly.");
      answer.reportValidity();
      note.textContent = "Please complete the human check before sending.";
      return;
    }

    answer.setCustomValidity("");
    note.textContent = form === signup
      ? "Verifying your subscription..."
      : "Verifying and sending your message...";
  });

  answer.addEventListener("input", () => {
    answer.setCustomValidity("");
    note.textContent = "";
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && drawer) {
    setDrawer(false);
  }
});
