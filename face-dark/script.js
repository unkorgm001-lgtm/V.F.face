document.addEventListener("DOMContentLoaded", () => {
  const postInput = document.getElementById("postInput");
  const publishBtn = document.getElementById("publishBtn");
  const feedPosts = document.getElementById("feedPosts");

  // Top navigation tab switcher
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // Create new post
  function createPost() {
    const text = postInput.value.trim();
    if (!text) return;

    const article = document.createElement("article");
    article.className = "card post-card";
    article.innerHTML = `
      <div class="post-header">
        <div class="post-author-info">
          <div class="avatar avatar-md" style="background:#2d88ff;">OU</div>
          <div>
            <h4>ORG | UNK <span class="verified">&#10004;</span></h4>
            <span class="post-meta">Just now &middot; &#127760;</span>
          </div>
        </div>
        <button class="more-btn" aria-label="More options">&bull;&bull;&bull;</button>
      </div>
      <p class="post-text"></p>
      <div class="post-stats">
        <span>&#128077; <strong class="like-count">0</strong></span>
        <span><span class="comment-count">0</span> comments &middot; 0 shares</span>
      </div>
      <div class="divider"></div>
      <div class="post-actions">
        <button class="action-btn like-btn">&#128077; Like</button>
        <button class="action-btn comment-toggle-btn">&#128172; Comment</button>
        <button class="action-btn">&#8618; Share</button>
      </div>
      <div class="comments-section hidden">
        <div class="comment-list"></div>
        <form class="comment-form">
          <div class="avatar avatar-xs">OU</div>
          <input type="text" placeholder="Write a comment..." required />
        </form>
      </div>
    `;

    article.querySelector(".post-text").textContent = text;
    feedPosts.prepend(article);
    postInput.value = "";
  }

  publishBtn.addEventListener("click", createPost);
  postInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") createPost();
  });

  // Event delegation for Likes and Comments
  feedPosts.addEventListener("click", (e) => {
    const likeBtn = e.target.closest(".like-btn");
    if (likeBtn) {
      const card = likeBtn.closest(".post-card");
      const countEl = card.querySelector(".like-count");
      let count = parseInt(countEl.textContent, 10);
      const isLiked = likeBtn.classList.toggle("liked");
      countEl.textContent = isLiked ? count + 1 : count - 1;
    }

    const commentBtn = e.target.closest(".comment-toggle-btn");
    if (commentBtn) {
      const card = commentBtn.closest(".post-card");
      const section = card.querySelector(".comments-section");
      section.classList.toggle("hidden");
      const input = section.querySelector("input");
      if (!section.classList.contains("hidden")) input.focus();
    }
  });

  feedPosts.addEventListener("submit", (e) => {
    if (e.target.classList.contains("comment-form")) {
      e.preventDefault();
      const input = e.target.querySelector("input");
      const text = input.value.trim();
      if (!text) return;

      const card = e.target.closest(".post-card");
      const list = card.querySelector(".comment-list");
      const countEl = card.querySelector(".comment-count");

      const item = document.createElement("div");
      item.className = "comment-item";
      item.innerHTML = `
        <div class="avatar avatar-xs">OU</div>
        <div class="comment-bubble">
          <strong>ORG | UNK</strong>
          <p></p>
        </div>
      `;
      item.querySelector("p").textContent = text;
      list.appendChild(item);

      countEl.textContent = parseInt(countEl.textContent, 10) + 1;
      input.value = "";
    }
  });
});
