const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração do Nodemailer usando variáveis de ambiente
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Variável de ambiente para o e-mail
        pass: process.env.EMAIL_PASS  // Variável de ambiente para a App Password
    }
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.error("Erro: Campos obrigatórios ausentes.");
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Configuração do e-mail
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER, // Envia para o e-mail configurado na variável de ambiente
        subject: `Nova mensagem de ${name}`,
        text: `Você recebeu uma nova mensagem de ${name} (${email}):\n\n${message}`
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erro ao enviar e-mail:", error);
            return res.status(500).json({ message: "Erro ao enviar a mensagem." });
        }
        console.log("E-mail enviado com sucesso:", info.response);
        res.status(200).json({ message: "Mensagem enviada com sucesso!" });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
