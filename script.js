const form = document.getElementById("booking-form");
const destination = document.getElementById("destination");
const vehicle = document.getElementById("vehicle");
const date = document.getElementById("date");
const nameInput = document.getElementById("name");
const message = document.getElementById("message");

// Filter the additional destinations.
const filters = document.querySelectorAll(".filters button");

filters.forEach(function (button) {
  button.onclick = function () {
    filters.forEach(function (filter) {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", active);
    });

    document.querySelectorAll("#trip-grid .card").forEach(function (card) {
      card.hidden =
        button.dataset.filter !== "all" &&
        card.dataset.category !== button.dataset.filter;

      if (card.hidden) card.querySelector("video").pause();
    });
  };
});

// Select a destination and close its overlay.
document.querySelectorAll(".trip-gallery > a").forEach(function (link) {
  link.onclick = function () {
    destination.value = link.closest(".card").querySelector("h3").textContent;
    link.closest("details").open = false;
    message.textContent = "";
  };
});

// Pause videos when their containing details close.
document.querySelectorAll("details").forEach(function (details) {
  details.addEventListener("toggle", function () {
    if (!details.open) {
      details.querySelectorAll("video").forEach(function (video) {
        video.pause();
      });
    }
  });
});

// Select a rental vehicle.
document.querySelectorAll(".rent").forEach(function (button) {
  button.onclick = function () {
    vehicle.value = button.dataset.vehicle;
    message.textContent = "";
    document.getElementById("booking").scrollIntoView();
  };
});

// Set the earliest travel date using the local date.
function setMinimumDate() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  date.min = today.getFullYear() + "-" + month + "-" + day;
}

setMinimumDate();

// Validate the form and display a demo confirmation.
form.oninput = function () {
  nameInput.setCustomValidity("");
  message.textContent = "";
};

form.onsubmit = function (event) {
  event.preventDefault();
  setMinimumDate();

  nameInput.setCustomValidity(
    nameInput.value.trim() ? "" : "Please enter your name.",
  );

  if (!form.reportValidity()) return;

  message.textContent =
    "Enquiry prepared for " +
    nameInput.value.trim() +
    ": " +
    destination.value +
    ", " +
    date.value +
    ", " +
    document.getElementById("travellers").value +
    " traveller(s)" +
    ", vehicle: " +
    vehicle.value +
    ". Demo only — no enquiry was sent.";
};
