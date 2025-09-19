const db = require('./db');

module.exports = (req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const { nome, telefone, data, hora } = JSON.parse(body);

    db.get(`SELECT * FROM agendamentos WHERE data = ? AND hora = ?`, [data, hora], (err, row) => {
      if (row) return res.status(400).send("Horário já ocupado");

      db.run(`INSERT INTO agendamentos (nome, telefone, data, hora) VALUES (?, ?, ?, ?)`,
        [nome, telefone, data, hora],
        () => {
          const msg = `Olá, gostaria de confirmar meu agendamento para ${data} às ${hora}. Nome: ${nome}`;
          const link = `https://wa.me/55${telefone}?text=${encodeURIComponent(msg)}`;
          res.json({ link });
        });
    });
  });
};
