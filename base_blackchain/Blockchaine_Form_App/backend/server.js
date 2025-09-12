// backend/server.js

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import { JsonRpcProvider, Wallet, Contract, hexlify } from 'ethers';
import { PrismaClient } from '@prisma/client';

// Import do ABI gerado pelo Hardhat
import contractArtifact from './DocumentRegistry.json' assert { type: 'json' };
const contractAbi = contractArtifact.abi;

// 1) Criação do app e middlewares globais
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));  // Permite chamadas do front Next.js
app.use(express.json());                             // Para ler JSON no body das requisições

// Multer para uploads multipart/form-data
const upload = multer();

// Prisma Client para PostgreSQL
const prisma = new PrismaClient();

// 2) Configuração do ethers.js (v6) e instância do contrato
const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet    = new Wallet(process.env.PRIVATE_KEY, provider);
const registry  = new Contract(
  process.env.CONTRACT_ADDRESS,
  contractAbi,
  wallet
);

// =============================================
// Rota: Upload de PDF e registro on-chain
// =============================================
app.post('/api/documents', upload.single('pdf'), async (req, res, next) => {
  try {
    // 1) Buffer do PDF e hash SHA-256
    const buffer  = req.file.buffer;
    const hashHex = crypto.createHash('sha256').update(buffer).digest('hex');
    const docHash = hexlify(Buffer.from(hashHex, 'hex'));

    // 2) Armazena no PostgreSQL via Prisma
    const document = await prisma.document.create({
      data: {
        filename:   req.file.originalname,
        content:    buffer,
        sha256Hash: hashHex,
      },
    });

    // 3) Registra o hash on-chain
    const tx = await registry.registerDocument(docHash);
    await tx.wait();

    // 4) Atualiza o registro com o txHash on-chain
    const updated = await prisma.document.update({
      where: { id: document.id },
      data:  { txHash: tx.hash },
    });

    // 5) Retorna ao cliente
    res.json({
      id:     updated.id,
      hash:   updated.sha256Hash,
      txHash: updated.txHash,
    });
  } catch (err) {
    next(err);
  }
});

// =============================================
// Rota: Termo de Aceite (assinatura on-chain)
// =============================================
app.post('/api/agreements', async (req, res, next) => {
  try {
    const { docHash } = req.body;

    // Chama signAgreement no contrato
    const tx = await registry.signAgreement(docHash);
    await tx.wait();

    res.json({ txHash: tx.hash });
  } catch (err) {
    next(err);
  }
});

// =============================================
// Middleware de tratamento de erros
// =============================================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// =============================================
// Inicialização do servidor
// =============================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
