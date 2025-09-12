// server.js

// Carrega variáveis de ambiente de .env para process.env
import 'dotenv/config';

import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import { JsonRpcProvider, Wallet, Contract, hexlify } from 'ethers';
import { PrismaClient } from '@prisma/client';
// Importa o ABI gerado pelo Hardhat para o contrato DocumentRegistry
import contractArtifact from './DocumentRegistry.json' assert { type: 'json' };

// Extrai a ABI do artifact
const contractAbi = contractArtifact.abi;

// Inicializa o Express
const app = express();
// Middleware para ler JSON em requisições (usado no endpoint de agreements)
app.use(express.json());

// Configura o Multer para uploads de arquivos multipart/form-data
const upload = multer();

// Instancia o cliente Prisma para interações com o PostgreSQL
const prisma = new PrismaClient();

// Configuração do provedor e da carteira com ethers.js
const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
// Cria instância do contrato, apontando para o endereço deployado
const registry = new Contract(
  process.env.CONTRACT_ADDRESS,
  contractAbi,
  wallet
);

// =============================================
// Endpoint: Upload de PDF
// - Recebe um arquivo PDF
// - Gera SHA-256 do conteúdo
// - Armazena no Postgres (filename, content, hash)
// - Chama registerDocument on-chain
// - Atualiza registro no banco com txHash
// =============================================
app.post('/api/documents', upload.single('pdf'), async (req, res, next) => {
  try {
    // 1) Lê o buffer do arquivo e calcula o hash
    const buffer = req.file.buffer;
    const hashHex = crypto.createHash('sha256').update(buffer).digest('hex');
    // Converte para BytesLike (0x...)
    const docHash = hexlify(Buffer.from(hashHex, 'hex'));

    // 2) Salva no PostgreSQL via Prisma
    const document = await prisma.document.create({
      data: {
        filename: req.file.originalname,
        content: buffer,
        sha256Hash: hashHex,
      },
    });

    // 3) Registra o hash on-chain
    const tx = await registry.registerDocument(docHash);
    await tx.wait();

    // 4) Atualiza o registro com o txHash retornado pelo contrato
    const updated = await prisma.document.update({
      where: { id: document.id },
      data: { txHash: tx.hash },
    });

    // 5) Retorna o resultado para o cliente
    res.json({
      id: updated.id,
      hash: updated.sha256Hash,
      txHash: updated.txHash,
    });
  } catch (err) {
    next(err);
  }
});

// =============================================
// Endpoint: Termo de Aceite (Assinatura)
// - Recebe docHash no corpo da requisição
// - Chama signAgreement on-chain para emitir evento de assinatura
// - Retorna txHash da transação de assinatura
// =============================================
app.post('/api/agreements', async (req, res, next) => {
  try {
    const { docHash } = req.body;
    // Executa a função do contrato para registrar a assinatura
    const tx = await registry.signAgreement(docHash);
    await tx.wait();
    // Retorna o txHash para o cliente
    res.json({ txHash: tx.hash });
  } catch (err) {
    next(err);
  }
});

// Middleware de tratamento de erros centralizado
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Inicia o servidor na porta definida em .env (ou 3001 se não definida)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
