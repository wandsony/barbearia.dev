module.exports = (req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const { usuario, senha } = JSON.parse(body);
    if (usuario === 'admin' && senha === '1234') {
      res.json({ sucesso: true });
    } else {
      res.status(401).send("Credenciais inválidas");
    }
  });
};
