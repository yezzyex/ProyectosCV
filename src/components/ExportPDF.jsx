import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import CVPreview from './CVPreview';

export default function ExportPDF({ cvData }) {
  const previewRef = useRef();

  const handleExport = async () => {
    const element = previewRef.current;
    // Ajustar el tamaño del canvas para calidad alta
    const canvas = await html2canvas(element, { scale: 3, backgroundColor: '#f9fafc' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // Calcular tamaño para que el CV quede centrado y con márgenes
    const imgWidth = pageWidth - 60;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const yOffset = Math.max(30, (pageHeight - imgHeight) / 2);
    pdf.addImage(imgData, 'PNG', 30, yOffset, imgWidth, imgHeight, '', 'FAST');
    pdf.save('cv_profesional.pdf');
  };

  return (
    <div>
      {/* Render oculto para exportar la vista previa con calidad alta */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, width: 800 }}>
        <div ref={previewRef} style={{ width: 800, background: '#f9fafc', padding: 0, margin: 0 }}>
          <CVPreview cvData={cvData} />
        </div>
      </div>
      <button onClick={handleExport} style={{marginTop: '1rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 5, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px #1976d2aa'}}>
        Exportar CV profesional a PDF
      </button>
    </div>
  );
}
