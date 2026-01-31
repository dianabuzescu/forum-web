const topicListEl = document.getElementById("topic-list");

// Show temporary loading message
topicListEl.innerHTML = "<li>Loading topics...</li>";

// Fetch all topics from the server
fetch("http://localhost:3000/topics")
  .then(res => res.json())
  .then(topics => {
    topicListEl.innerHTML = ""; // Clear the loading message

    if (topics.length === 0) {
      // If no topics are found, show a placeholder message
      topicListEl.innerHTML = "<li>No topics available yet.</li>";
      return;
    }

    // Create a link for each topic
    topics.forEach(topic => {
      const li = document.createElement("li");

      const link = document.createElement("a");
      link.href = `topic.html?id=${topic.id}`;
      link.textContent = topic.title;

      li.appendChild(link);
      topicListEl.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Failed to fetch topics:", err);
    topicListEl.innerHTML = "<li>Failed to load topics.</li>";
  });
