const db = require('./db');

module.exports = (req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const { id } = JSON.parse(body);
    db.run(`DELETE FROM agendamentos WHERE id = ?`, [id], () => {
      res.json({ sucesso: true });
    });
  });
};
