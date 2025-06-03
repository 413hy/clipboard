let password = '';

async function submitClipboard() {
  password = document.getElementById('password').value;
  const title = document.getElementById('title').value;
  const type = document.getElementById('type').value;
  const content = document.getElementById('content').value;

  const res = await fetch('https://你的-worker子域名.workers.dev', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, title, type, content })
  });

  if (res.ok) {
    loadClipboard();
  } else {
    alert('密码错误或提交失败');
  }
}

async function loadClipboard() {
  const res = await fetch('https://你的-worker子域名.workers.dev?password=' + password);
  const data = await res.json();
  const list = document.getElementById('list');
  list.innerHTML = data.map(item => `
    <div style="margin-bottom: 15px;">
      <strong>[${item.type}] ${item.title}</strong>
      <pre style="background:#eee;padding:10px;">${item.content}</pre>
    </div>
  `).join('');
} 

// 自动加载
setInterval(() => {
  if (password) loadClipboard();
}, 5000);