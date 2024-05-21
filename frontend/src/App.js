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

  const data = { name, receipt, email, price1, price2, price3 };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`https://email-server-api.vercel.app/api/pdf/createPdf`, data);
      
      const response = await axios.get(`https://email-server-api.vercel.app/api/pdf/fetchPdf`, { responseType: 'blob' });
      
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'InvoiceDocument.pdf');

      // Clear all the inputs after downloading 
      setName('');
      setReceipt('');
      setEmail('');
      setPrice1(0);
      setPrice2(0);
      setPrice3(0);

      // Send PDF via email
      await axios.post("https://email-server-api.vercel.app/api/pdf/sendPdf", { email: email });
      alert("PDF sent to email successfully.");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  }

  return (
    <div className="main-block">
      <h1>Generate and Download Pdf</h1>
      <form onSubmit={submitForm}>
        <div className="info">
          <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
          <br />
          <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
          <input type="text" placeholder="Receipt Id" name="receipt" value={receipt} onChange={(e) => setReceipt(e.target.value)} autoComplete="off" />
          <input type="text" placeholder="Price1" name="price1" value={price1} onChange={(e) => setPrice1(e.target.value)} autoComplete="off" />
          <input type="number" placeholder="Price2" name="price2" value={price2} onChange={(e) => setPrice2(e.target.value)} autoComplete="off" />
          <input type="number" placeholder="Price3" name="price3" value={price3} onChange={(e) => setPrice3(e.target.value)} autoComplete="off" />
        </div>
        <button type="submit">Download Pdf & Send to Mail</button>
      </form>
    </div>
  );
}

export default App;
