const registerForm = document.getElementById("register-form");
const errorMsg = document.getElementById("error-msg");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const fullName = document.getElementById("full-name").value.trim();
    const birthDate = document.getElementById("birth-date").value;

    if (!username || !password || !fullName || !birthDate) {
      errorMsg.textContent = "All fields are required.";
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/users?username=${username}`);
      const existingUsers = await res.json();

      if (existingUsers.length > 0) {
        errorMsg.textContent = "Username already exists. Please choose another one.";
        return;
      }

      const [firstName, ...rest] = fullName.split(" ");
      const lastName = rest.join(" ");

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          firstName,
          lastName,
          birthDate,
          createdAt: new Date().toISOString().split("T")[0]
        })
      });

      if (!response.ok) throw new Error("Failed to create user");

      // After successful registration, redirect to login page
      window.location.href = "login.html";
    } catch (err) {
      console.error(err);
      errorMsg.textContent = "Registration failed. Please try again.";
    }
  });
}
