// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import htmlPdf, { CreateOptions } from "html-pdf"
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import path from "path";
import fs from "fs";

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
app.post('/api/download/docx', (req, res) => {
  const { content } = req.body;

  console.log('Content received:', content);

  // Carrega o arquivo de template DOCX
  const templatePath = path.resolve(__dirname, 'templates', 'template.docx');
  const templateContent = fs.readFileSync(templatePath, 'binary');

  // Cria uma instância do PizZip com o conteúdo do template
  const zip = new PizZip(templateContent);

  // Inicializa o Docxtemplater com o ZIP do template
  const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
  });

  // Define os dados que serão substituídos no template
  doc.setData({
      content: content, // Certifique-se que a chave 'content' corresponde ao placeholder no template DOCX
  });

  try {
      // Renderiza o documento (substitui as variáveis)
      doc.render();
  } catch (error) {
      console.error('Error rendering the document:', error);
      return res.status(500).send('Error rendering the document');
  }

  // Gera o buffer do DOCX
  const buffer = doc.getZip().generate({ type: 'nodebuffer' });

  // Envia o documento gerado para o cliente
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.send(buffer);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});