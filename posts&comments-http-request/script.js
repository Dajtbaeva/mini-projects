const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const commentTemplate = document.getElementById("single-comment");
const showPostsBtn = document.querySelector("#fetch");

const API_URL_POSTS = "https://jsonplaceholder.typicode.com/posts";
const API_URL_COMMENTS = "https://jsonplaceholder.typicode.com/comments";

async function sendHttpRequest(method, url, body) {
  const res = await fetch(url, {
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

showPostsBtn.addEventListener("click", async () => {
  const postsUserId = document.querySelector("#user_id");
  try {
    if (listElement) {
      while (listElement.firstChild) {
        listElement.firstChild.remove();
      }
    }
    const posts = await sendHttpRequest(
      "GET",
      `${API_URL_POSTS}?userId=${postsUserId.value}`
    );
    for (const post of posts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector(".post-item").id = post.id;
      listElement.appendChild(postEl);
    }
  } catch (err) {
    alert(err);
  }
});

listElement.addEventListener("click", async (e) => {
  const listOfComments = e.target.closest("li").querySelector(".comments");
  if (!listOfComments.childNodes.length) {
    try {
      if (e.target.tagName === "BUTTON") {
        const id = e.target.closest("li").id;
        const comments = await sendHttpRequest(
          "GET",
          `${API_URL_COMMENTS}?postId=${id}`
        );

        for (const comment of comments) {
          const commentEl = document.importNode(commentTemplate.content, true);

          commentEl.querySelector("h2").textContent =
            comment.name.toUpperCase();
          commentEl.querySelector("h3").textContent = comment.email;
          commentEl.querySelector("p").textContent = comment.body;
          commentEl.querySelector(".comment-item").id = comment.id;
          listOfComments.appendChild(commentEl);
        }
      }
    } catch (err) {
      alert(err);
    }
  }
});
