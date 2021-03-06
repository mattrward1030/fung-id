const submitButton = document.querySelector("#submit-button");
const mushroomNameInput = document.querySelector("#mushroom-name");
const descriptionInput = document.querySelector("#description");
const mushroomForm = document.querySelector("#mushroom-form");
const urlInput = document.querySelector("#image-url");

const postFormHandler = async (e) => {
  e.preventDefault();
  const mushroomName = mushroomNameInput.value.trim();
  const description = descriptionInput.value.trim();
  const lat = document.querySelector("#lat").value.trim();
  const lon = document.querySelector("#lon").value.trim();
  const url = urlInput.value.trim();
  console.log(lat + lon);
  if (mushroomName && description) {
    const response = await fetch("/api/users/post", {
      method: "POST",
      body: JSON.stringify({ mushroomName, description, url, lat, lon }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/mush-room");
    } else {
      alert("Failed to add mushroom.");
    }
  }
};

mushroomForm.addEventListener("submit", postFormHandler);
