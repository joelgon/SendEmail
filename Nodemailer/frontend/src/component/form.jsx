import React, {useState} from 'react'
import  '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './form.css'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3003'
})

function Form(){
    
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    function clear(){
        setTo('')
        setSubject('')
        setBody('')
    }

    async function sendEmail(){
        
        try {
            const data = {
                to,
                subject,
                message: body
            };

            const response = await api.post('/enviar/email', data)

            const {message}= response.data
            clear()

            alert(message)
        } catch (err) {
            clear()
            const {response} = err;
            const {error} = response.data;
            
            alert(error);
        }
    }

    return(
        <div className='container'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <span className="col-sm-12 spanTitle">
                    <span className="navbar-brand">Envio de email com sendgrid</span>
                </span>
            </nav>
            <div role='form' className='form-group Border'>
                <div className='col-sm-12 Height Bottom'>
                    <button className='btn btn-light'>Para</button>
                    <input type='email' className='form-control' value={to} onChange={ ({target}) => setTo(target.value)}></input>
                </div>
                <div className='Height Bottom'>
                    <input type='text' className='form-control' value={subject} onChange={ ({target}) => setSubject(target.value)} placeholder='Adicionar assunto'></input>
                </div>
                <div id='messageBody'>
                    <div className='Bottom'>
                        <textarea className='form-control' rows='11' value={body} onChange={ ({target}) => setBody(target.value) }>
                        </textarea>
                    </div>
                    <span className='col-sm-12 align-right'>
                        <button className='btn btn-primary' onClick={sendEmail} >Enviar</button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Form