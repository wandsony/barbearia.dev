const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../agendamentos.db');
const db = new sqlite3.Database(dbPath);

db.run(`CREATE TABLE IF NOT EXISTS agendamentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  telefone TEXT,
  data TEXT,
  hora TEXT
)`);

module.exports = db;
