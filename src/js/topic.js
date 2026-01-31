// Extract topic ID from the URL (e.g., topic.html?id=1)
const params = new URLSearchParams(window.location.search);
const topicId = params.get("id");

// References to HTML elements
const topicTitleEl = document.getElementById("topic-title");
const commentListEl = document.getElementById("comment-list");

// Display the topic title
fetch(`http://localhost:3000/topics/${topicId}`)
  .then(res => {
    if (!res.ok) throw new Error("Topic not found");
    return res.json();
  })
  .then(topic => {
    topicTitleEl.textContent = topic.title;
  })
  .catch(err => {
    console.error("Error loading topic title:", err);
    topicTitleEl.textContent = "Error loading topic.";
  });

// 4. Display comments related to this topic
fetch(`http://localhost:3000/comments?topicId=${topicId}`)
  .then(res => {
    if (!res.ok) throw new Error("Error loading comments");
    return res.json();
  })
  .then(comments => {
    commentListEl.innerHTML = "";

    if (comments.length === 0) {
      commentListEl.innerHTML = "<li>No comments yet.</li>";
      return;
    }

    comments.forEach(comment => {
      const li = document.createElement("li");
      li.id = `comment-${comment.id}`;
      li.textContent = comment.content;

      // Display author (if userId exists)
      if (comment.userId) {
        fetch(`http://localhost:3000/users/${comment.userId}`)
          .then(res => res.json())
          .then(user => {
            const userLink = document.createElement("a");
            userLink.href = `profile.html?id=${user.id}`;
            userLink.textContent = `${user.firstName} ${user.lastName}`;
            userLink.style.float = "right";
            userLink.style.fontSize = "0.9em";
            userLink.style.color = "#007bff";
            userLink.style.marginLeft = "1em";
            userLink.style.textDecoration = "none";

            li.appendChild(userLink);
          })
          .catch(err => {
            console.warn(`Could not load user with ID ${comment.userId}`, err);
          });
      }

      commentListEl.appendChild(li);
    });

    // Scroll to specific comment (if #comment-xyz is present in URL)
    const hash = window.location.hash;
    if (hash.startsWith("#comment-")) {
      const commentEl = document.querySelector(hash);
      if (commentEl) {
        commentEl.scrollIntoView({ behavior: "smooth", block: "center" });
        commentEl.classList.add("highlight");

        setTimeout(() => {
          commentEl.classList.remove("highlight");
        }, 1500);
      }
    }
  })
  .catch(err => {
    console.error("Error loading comments:", err);
    commentListEl.innerHTML = "<li>Failed to load comments.</li>";
  });

// Handle the comment submission form
const commentForm = document.getElementById("comment-form");
const commentContent = document.getElementById("comment-content");

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const content = commentContent.value.trim();
  if (!content) {
    alert("Comment cannot be empty.");
    return;
  }

  const currentUserId = localStorage.getItem("currentUserId");
  if (!currentUserId) {
    alert("You must be logged in to post a comment.");
    return;
  }

  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      topicId: topicId,
      content: content,
      userId: parseInt(currentUserId)
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Error posting comment.");
      return res.json();
    })
    .then(newComment => {
      const li = document.createElement("li");
      li.id = `comment-${newComment.id}`;
      li.textContent = newComment.content;

      fetch(`http://localhost:3000/users/${newComment.userId}`)
        .then(res => res.json())
        .then(user => {
          const userLink = document.createElement("a");
          userLink.href = `profile.html?id=${user.id}`;
          userLink.textContent = `${user.firstName} ${user.lastName}`;
          userLink.style.float = "right";
          userLink.style.fontSize = "0.9em";
          userLink.style.color = "#007bff";
          userLink.style.marginLeft = "1em";
          userLink.style.textDecoration = "none";

          li.appendChild(userLink);
        });

      commentListEl.appendChild(li);
      commentContent.value = "";
    })
    .catch(err => {
      console.error(err);
      alert("Comment could not be submitted.");
    });
});
