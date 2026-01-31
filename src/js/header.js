const userId = localStorage.getItem("currentUserId");

const profileLink = document.getElementById("profile-link");

if (profileLink && userId) {
  profileLink.href = `profile.html?id=${userId}`;
}
