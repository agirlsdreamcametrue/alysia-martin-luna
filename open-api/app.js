async function loadPosts() {
  const list = document.getElementById('posts');
  list.textContent = 'Loading...';
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    const data = await res.json();
    list.innerHTML = data.map(p => `<li><strong>${p.title}</strong><br>${p.body}</li>`).join('');
  } catch (err) {
    console.error(err);
    list.textContent = 'An error occurred loading posts.';
  }
}

async function createPost(title, body) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 })
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    const created = await res.json();
    const list = document.getElementById('posts');
    const li = document.createElement('li');
    li.innerHTML = `<strong>${created.title}</strong><br>${created.body}`;
    list.prepend(li);
  } catch (err) {
    console.error(err);
    alert('An error occurred creating the post.');
  }
}

document.getElementById('post-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const body = document.getElementById('body').value.trim();
  if (!title || !body) return;
  await createPost(title, body);
  e.target.reset();
});

document.addEventListener('DOMContentLoaded', loadPosts);
