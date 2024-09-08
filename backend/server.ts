import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import htmlPdf, { CreateOptions } from "html-pdf";
import htmlDocx from "html-docx-js";
import { Buffer } from "buffer";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Endpoint para gerar PDF
app.post('/api/download/pdf', (req, res) => {
  const { content } = req.body;
  const options: CreateOptions = { format: "A4" };

  htmlPdf.create(content, options).toBuffer((err, buffer) => {
    if (err) return res.status(500).send('Error creating PDF');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  });
});

// Endpoint para gerar DOCX
app.post('/api/download/docx', async (req, res) => {
  const { content } = req.body;

  console.log('HTML content received:', content);

  // Converte o HTML para o formato DOCX como Blob
  const docxBlob = htmlDocx.asBlob(content);

  // Converte o Blob para Buffer
  const arrayBuffer = await docxBlob.toLocaleString(); // Converte Blob para ArrayBuffer
  const docxBuffer = Buffer.from(arrayBuffer); // Converte ArrayBuffer para Buffer

  // Envia o buffer como arquivo DOCX
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename=output.docx');
  res.send(docxBuffer);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});