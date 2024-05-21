import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [receipt, setReceipt] = useState('');
    const [price1, setPrice1] = useState(0);
    const [price2, setPrice2] = useState(0);
    const [price3, setPrice3] = useState(0);
    const [backendMessage, setBackendMessage] = useState('');

    const data = { name, receipt, email, price1, price2, price3 };
            console.log(email)

    const SubmitForm = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://email-server-api.vercel.app/api/createPdf', data);
            console.log(data)
            const response = await axios.get('https://email-server-api.vercel.app/api/fetchPdf', { responseType: 'blob' });
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            console.log(response)
            console.log(pdfBlob)
            saveAs(pdfBlob, 'InvoiceDocument.pdf');

            // Clear inputs
            setName('');
            setReceipt('');
            setEmail('');
            setPrice1(0);
            setPrice2(0);
            setPrice3(0);

            // Send PDF via email
            const emailResponse = await axios.post('https://email-server-api.vercel.app/api/sendPdf', { email });
            console.log(emailResponse)
            alert(emailResponse.data);
        } catch (error) {
            console.error('Error:', error);
            setBackendMessage('Error generating or sending PDF');
        }
    };

    return (
        <div className="main-block">
            <h1>Generate and Download Pdf</h1>
            <form onSubmit={SubmitForm}>
                <div className="info">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                    />
                    <br />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        placeholder="Receipt Id"
                        name="receipt"
                        value={receipt}
                        onChange={(e) => setReceipt(e.target.value)}
                        autoComplete="off"
                    />
                    <input
                        type="number"
                        placeholder="Price1"
                        name="price1"
                        value={price1}
                        onChange={(e) => setPrice1(Number(e.target.value))}
                        autoComplete="off"
                    />
                    <input
                        type="number"
                        placeholder="Price2"
                        name="price2"
                        value={price2}
                        onChange={(e) => setPrice2(Number(e.target.value))}
                        autoComplete="off"
                    />
                    <input
                        type="number"
                        placeholder="Price3"
                        name="price3"
                        value={price3}
                        onChange={(e) => setPrice3(Number(e.target.value))}
                        autoComplete="off"
                    />
                </div>
                <button type="submit">Download Pdf & Send to Mail</button>
            </form>
            <p>{backendMessage}</p>
        </div>
    );
}

export default App;
