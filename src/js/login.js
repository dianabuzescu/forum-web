const form = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

// Handle login form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Validate input fields
  if (!username || !password) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  try {
    // Search for the user in the database by username
    const res = await fetch(`http://localhost:3000/users?username=${username}`);
    const users = await res.json();

    // Check credentials
    if (users.length === 0 || users[0].password !== password) {
      errorMsg.textContent = "Invalid username or password.";
      return;
    }

    // Store the logged-in user in localStorage
    localStorage.setItem("currentUserId", users[0].id);

    // Redirect to the forum homepage
    window.location.href = "index.html";
  } catch (err) {
    console.error("Login error:", err);
    errorMsg.textContent = "An error occurred during login.";
  }
});
