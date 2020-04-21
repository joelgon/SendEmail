require('dotenv/config');
const express = require('express');
const  sgMail  =  require('@sendgrid/mail');
const cors = require('cors');

const server = express()
server.use(cors())
server.use(express.json())

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

server.get('/', async (req, res) => {
    return await res.send('OK')
})

server.post('/enviar/email', async (req, res) => {
    try {
        const {to, subject, message} = req.body;
        
        const  msg  =  {
            to,
            from: process.env.from,
            subject,
            text: message,
            html: message,
        } ;

        await sgMail.send(msg);

        return res.json({message: 'Email enviado'})

    } catch (error) {
        return res.status(400).json({ 
            error: 'Não foi possivel enviar o email' 
        })
    }
})

server.listen(process.env.port, function() {
    console.log(`server running on http://localhost:${process.env.port}`)
})