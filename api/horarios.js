const db = require('./db');

module.exports = (req, res) => {
  const { data } = req.query;
  const horarios = [
    "09:00", "09:40", "10:20", "11:00", "11:40",
    "13:00", "13:40", "14:20", "15:00", "15:40",
    "16:20", "17:00", "17:40"
  ];

  db.all(`SELECT hora FROM agendamentos WHERE data = ?`, [data], (err, rows) => {
    if (err) return res.status(500).send("Erro no banco");
    const ocupados = rows.map(r => r.hora);
    const disponiveis = horarios.filter(h => !ocupados.includes(h));
    res.json(disponiveis);
  });
};
