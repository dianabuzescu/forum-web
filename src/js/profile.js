// Extract user ID from URL (e.g., profile.html?id=2)
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

// References to HTML elements
const usernameEl = document.getElementById("username");
const fullNameEl = document.getElementById("full-name");
const birthDateEl = document.getElementById("birth-date");
const createdAtEl = document.getElementById("created-at");
const commentsContainer = document.getElementById("user-comments");

// Global variables for comment deletion
let selectedCommentId = null;
let selectedTopicTitle = "";

// References to modal elements
const modal = document.getElementById("delete-modal");
const confirmBtn = document.getElementById("confirm-delete");
const cancelBtn = document.getElementById("cancel-delete");
const resultMsg = document.getElementById("delete-result");

// Fetch user data
fetch(`http://localhost:3000/users/${userId}`)
  .then(res => {
    if (!res.ok) throw new Error("User not found");
    return res.json();
  })
  .then(user => {
    // Populate profile data
    usernameEl.textContent = `Profile of ${user.firstName} ${user.lastName}`;
    fullNameEl.textContent = `${user.firstName} ${user.lastName}`;
    birthDateEl.textContent = user.birthDate;
    createdAtEl.textContent = user.createdAt;

    // Fetch and display user's comments grouped by topic
    return fetch(`http://localhost:3000/comments?userId=${userId}`);
  })
  .then(res => res.json())
  .then(async (comments) => {
    if (comments.length === 0) {
      commentsContainer.innerHTML = "<p>This user has not posted any comments yet.</p>";
      return;
    }

    const grouped = {};
    for (const comment of comments) {
      if (!grouped[comment.topicId]) {
        grouped[comment.topicId] = [];
      }
      grouped[comment.topicId].push(comment);
    }

    for (const topicId in grouped) {
      const topicRes = await fetch(`http://localhost:3000/topics/${topicId}`);
      const topic = await topicRes.json();

      const section = document.createElement("section");

      const heading = document.createElement("h3");
      heading.textContent = `Topic: ${topic.title}`;
      section.appendChild(heading);

      const ul = document.createElement("ul");

      for (const comment of grouped[topicId]) {
        const li = document.createElement("li");
        li.id = `comment-${comment.id}`;

        const link = document.createElement("a");
        link.href = `topic.html?id=${topicId}#comment-${comment.id}`;
        link.textContent = comment.content;
        li.appendChild(link);

        // Show delete button only for logged-in user viewing their own profile
        const currentUserId = localStorage.getItem("currentUserId");
        if (currentUserId && currentUserId === userId) {
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.style.marginLeft = "10px";
          deleteBtn.style.backgroundColor = "#dc3545";
          deleteBtn.style.color = "#fff";
          deleteBtn.style.border = "none";
          deleteBtn.style.padding = "5px 10px";
          deleteBtn.style.cursor = "pointer";

          deleteBtn.addEventListener("click", () => {
            selectedCommentId = comment.id;
            selectedTopicTitle = topic.title;
            modal.classList.remove("hidden");
          });

          li.appendChild(deleteBtn);
        }

        ul.appendChild(li);
      }

      section.appendChild(ul);
      commentsContainer.appendChild(section);
    }
  })
  .catch(err => {
    console.error("Error loading profile:", err);
    usernameEl.textContent = "Error loading profile.";
    commentsContainer.innerHTML = "";
  });

// Confirm comment deletion
confirmBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`http://localhost:3000/comments/${selectedCommentId}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Error deleting comment");

    resultMsg.textContent = `Comment from topic "${selectedTopicTitle}" was successfully deleted.`;

    setTimeout(() => location.reload(), 1500);
  } catch (err) {
    resultMsg.textContent = "Failed to delete the selected comment.";
  }

  modal.classList.add("hidden");
});

// Cancel delete
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
