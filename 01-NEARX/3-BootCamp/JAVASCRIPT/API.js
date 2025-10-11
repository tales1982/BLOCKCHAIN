import express, { json } from 'express';
const app = express();
app.use(json());

let usuarios = []; // Simulando um banco de dados

// GET: Listar todos
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// POST: Criar um
app.post('/usuarios', (req, res) => {
  const novoUsuario = req.body;
  usuarios.push(novoUsuario);
  res.json({ mensagem: 'Usuário criado!', usuario: novoUsuario });
});

// DELETE: Apagar um (pelo ID no body, ex: { "id": 123 })
app.delete('/usuarios', (req, res) => {
  const { id } = req.body; // Pega o ID do body
  const index = usuarios.findIndex(u => u.id === id); // Encontra o índice
  
  if (index !== -1) {
    const usuarioDeletado = usuarios.splice(index, 1)[0]; // Remove e pega o usuário
    res.json({ mensagem: 'Usuário apagado!', usuario: usuarioDeletado });
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado.' });
  }
});

app.listen(3000, () => console.log('API rodando!'));