// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Tabs and results container
const results = document.getElementById('results');
const tabPosts = document.getElementById('tab-posts');
const tabUsers = document.getElementById('tab-users');

function setActive(tab){
  [tabPosts, tabUsers].forEach(t=>{
    t.classList.toggle('active', t===tab);
    t.setAttribute('aria-selected', String(t===tab));
  });
}
function setLoading(isLoading){
  results.classList.toggle('loading', isLoading);
  if(isLoading) results.innerHTML='';
}
function render(html){ results.innerHTML = html; }

// --- FETCH 1: Posts ---
async function fetchPosts(){
  setLoading(true);
  try{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    if(!res.ok) throw new Error('Failed to load posts');
    const posts = await res.json();
    const html = posts.map(p=>`
      <article class="card">
        <h4>${p.title}</h4>
        <p>${p.body}</p>
      </article>
    `).join('');
    render(html);
  }catch(err){
    console.error(err);
    render(`<div class="error">Could not load posts.</div>`);
  }finally{ setLoading(false); }
}

// --- FETCH 2: Users ---
async function fetchUsers(){
  setLoading(true);
  try{
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=10');
    if(!res.ok) throw new Error('Failed to load users');
    const users = await res.json();
    const html = users.map(u=>`
      <article class="card">
        <h4>${u.name}</h4>
        <p>${u.email}</p>
        <p>${u.company.name}</p>
      </article>
    `).join('');
    render(html);
  }catch(err){
    console.error(err);
    render(`<div class="error">Could not load users.</div>`);
  }finally{ setLoading(false); }
}

// --- New Post form (demo) ---
const form = document.getElementById('post-form');
form.addEventListener('submit', async e=>{
  e.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  try{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title, body})
    });
    const data = await res.json();
    alert(`Post created!\nTitle: ${data.title}`);
    form.reset();
  }catch(err){
    alert('Error creating post.');
  }
});

// --- Tab switching ---
tabPosts.addEventListener('click',()=>{ setActive(tabPosts); fetchPosts(); });
tabUsers.addEventListener('click',()=>{ setActive(tabUsers); fetchUsers(); });

// Initial load
setActive(tabPosts);
fetchPosts();
