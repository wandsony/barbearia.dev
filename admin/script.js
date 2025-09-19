// Login
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const dados = Object.fromEntries(form.entries());

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (res.ok) {
      window.location.href = 'painel.html';
    } else {
      document.getElementById('loginErro').textContent = "Usuário ou senha inválidos.";
    }
  });
}

// Painel
if (document.getElementById('tabelaAgendamentos')) {
  fetch('/api/painel')
    .then(res => res.json())
    .then(agendamentos => {
      const tbody = document.getElementById('tabelaAgendamentos');
      tbody.innerHTML = agendamentos.map(a => `
        <tr>
          <td>${a.nome}</td>
          <td>${a.telefone}</td>
          <td>${a.data}</td>
          <td>${a.hora}</td>
          <td><button onclick="cancelar(${a.id})">Cancelar</button></td>
        </tr>
      `).join('');
    });
}

function cancelar(id) {
  fetch('/api/cancelar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  }).then(() => location.reload());
}
