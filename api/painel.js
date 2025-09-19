const db = require('./db');

module.exports = (req, res) => {
  db.all(`SELECT * FROM agendamentos ORDER BY data, hora`, [], (err, rows) => {
    if (err) return res.status(500).send("Erro");
    res.json(rows);
  });
};
