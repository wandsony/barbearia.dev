const db = require('./db');

module.exports = (req, res) => {
  const { data } = req.query;

  if (!data || typeof data !== 'string') {
    return res.status(400).json({ erro: "Data inválida" });
  }

  const horarios = [
    "09:00", "09:40", "10:20", "11:00", "11:40",
    "13:00", "13:40", "14:20", "15:00", "15:40",
    "16:20", "17:00", "17:40"
  ];

  db.all(`SELECT hora FROM agendamentos WHERE data = ?`, [data], (err, rows) => {
    if (err) {
      console.error("Erro no banco:", err);
      return res.status(500).json({ erro: "Erro no banco de dados" });
    }

    const ocupados = rows.map(r => r.hora);
    const disponiveis = horarios.filter(h => !ocupados.includes(h));
    res.json(disponiveis);
  });
};
