const form = document.querySelector("#registration-form");
const message = document.querySelector("#message");

const loadUsersButton = document.querySelector("#load-users");
const usersList = document.querySelector("#users-list");

const editForm = document.querySelector("#edit-form");
const editId = document.querySelector("#edit-id");
const editName = document.querySelector("#edit-name");
const editEmail = document.querySelector("#edit-email");

// ==========================================
// READ USERS
// GET /api/users
// ==========================================
async function loadUsers() {
  try {
    usersList.innerHTML = "<p>Loading users...</p>";

    const response = await fetch("/api/users");

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load users.");
    }

    if (data.users.length === 0) {
      usersList.innerHTML = "<p>No users found.</p>";
      return;
    }

    usersList.innerHTML = data.users
      .map(
        (user) => `
          <article class="user-card">
            <h3>${user.name}</h3>

            <p>${user.email}</p>

            <small>User ID: ${user.id}</small>

            <button
              class="edit-user"
              data-id="${user.id}"
              data-name="${user.name}"
              data-email="${user.email}"
            >
              Edit User
            </button>
          </article>
        `,
      )
      .join("");

    // Attach click events to the newly created edit buttons
    attachEditListeners();
  } catch (error) {
    console.error("Failed to load users:", error);

    usersList.innerHTML = "<p>Something went wrong while loading users.</p>";
  }
}

// Load users when the button is clicked
loadUsersButton.addEventListener("click", loadUsers);

// ==========================================
// CREATE USER
// POST /api/users
// ==========================================
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

    if (!response.ok) {
      throw new Error(data.message || "Failed to create user.");
    }

    console.log("Server response:", data);

    message.textContent = data.message;

    // Clear the form after successful creation
    form.reset();

    // Reload users from the database
    await loadUsers();
  } catch (error) {
    console.error("Request failed:", error);

    message.textContent = error.message;
  }
});

// ==========================================
// EDIT USER BUTTONS
// ==========================================
function attachEditListeners() {
  const editButtons = document.querySelectorAll(".edit-user");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      editId.value = button.dataset.id;
      editName.value = button.dataset.name;
      editEmail.value = button.dataset.email;

      document.querySelector("#edit-section").scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// ==========================================
// UPDATE USER
// PUT /api/users/:id
// ==========================================
editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = editId.value;
  const name = editName.value;
  const email = editEmail.value;

  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update user.");
    }

    message.textContent = data.message;

    // Clear the edit form
    editForm.reset();

    // Reload users from the database
    await loadUsers();
  } catch (error) {
    console.error("Failed to update user:", error);

    message.textContent = error.message;
  }
});
