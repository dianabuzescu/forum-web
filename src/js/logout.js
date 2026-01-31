// Initializes the logout button functionality
function initLogout() {
  const logoutBtn = document.getElementById("logout-btn");

  if (!logoutBtn) {
    console.warn("Logout button not found in the DOM.");
    return;
  }

  logoutBtn.addEventListener("click", () => {
    // Clear the logged-in user from localStorage
    localStorage.removeItem("currentUserId");

    // Redirect to login page
    window.location.href = "login.html";
  });
}

// Direct call (header is already injected before this runs)
initLogout();
