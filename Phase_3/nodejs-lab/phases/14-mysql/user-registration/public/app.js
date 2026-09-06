const form = document.querySelector("#registration-form");
const message = document.querySelector("#message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.name.value;
  const email = form.email.value;

  try {
    const response = await fetch("/api/users", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
      }),
    });

    const data = await response.json();

    console.log("Server response:", data);

    message.textContent = data.message;
  } catch (error) {
    console.error("Request failed:", error);

    message.textContent =
      "Something went wrong while connecting to the server.";
  }
});
