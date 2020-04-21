require('dotenv/config');
const express = require('express');

const cors = require('cors');
const nodeMailer = require('nodemailer')
const server = express()
server.use(cors())
server.use(express.json())



server.get('/', async (req, res) => {
    return await res.send('OK')
})

server.post('/enviar/email', async (req, res) => {
    try {
        const {to, subject, message} = req.body;

        let transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: process.env.from, 
                pass: process.env.pass 
            }
        });

        
        const msg =  {
            from: process.env.from, 
            to: to, 
            subject: subject, 
            text: message,
            html: message
        };

        await transporter.sendMail(msg)
        return res.json({message: 'Enviada com sucesso'})

    } catch (error) {
       res.status(400).json({message: 'Falha ao enviar'})
    }
})

server.listen(process.env.port, function() {
    console.log(`server running on http://localhost:${process.env.port}`)
})