import { useState } from 'react';
import './App.css';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import ExportPDF from './components/ExportPDF';

function App() {
  const [cvData, setCvData] = useState({
    personal: {},
    experience: [],
    education: [],
    skills: []
  });

  return (
    <div className="app-container">
      <h1>Creador de CV Interactivo</h1>
      <div className="main-content">
        <CVForm cvData={cvData} setCvData={setCvData} />
        <div>
          <CVPreview cvData={cvData} />
          <ExportPDF cvData={cvData} />
        </div>
      </div>
    </div>
  );
}

export default App;
