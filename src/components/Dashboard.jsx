import React from 'react';
import { BookOpen, PenTool, BrainCircuit, Download } from 'lucide-react';

const Dashboard = ({ setTab }) => {
  return (
    <div className="animate-fade-in">
      <h1>Tecnología de la Piel</h1>
      <p className="text-center mb-4">Plataforma interactiva de estudio para tu examen de Confección Industrial.</p>

      <div className="glass-card mb-4 text-center">
        <h3>Resumen en PDF</h3>
        <p>Descarga el resumen completo original de 10-20 páginas en PDF para imprimirlo o leerlo offline.</p>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-secondary mt-4" style={{textDecoration: 'none'}}>
          <Download size={20} /> Descargar PDF
        </a>
      </div>

      <div className="grid grid-2">
        <div className="glass-card" onClick={() => setTab('study')} style={{cursor: 'pointer'}}>
          <div className="flex items-center mb-4">
            <BookOpen size={28} color="var(--accent)" />
            <h2 style={{margin:0, border: 'none'}}>Teoría</h2>
          </div>
          <p>Repasa los 6 bloques principales del temario con apuntes interactivos.</p>
        </div>

        <div className="glass-card" onClick={() => setTab('quiz')} style={{cursor: 'pointer'}}>
          <div className="flex items-center mb-4">
            <PenTool size={28} color="var(--accent)" />
            <h2 style={{margin:0, border: 'none'}}>Test de Examen</h2>
          </div>
          <p>Simulador de preguntas tipo test para comprobar lo que has aprendido.</p>
        </div>

        <div className="glass-card" onClick={() => setTab('flashcards')} style={{cursor: 'pointer'}}>
          <div className="flex items-center mb-4">
            <BrainCircuit size={28} color="var(--accent)" />
            <h2 style={{margin:0, border: 'none'}}>Flashcards</h2>
          </div>
          <p>Tarjetas de memoria para repasar rápidamente los conceptos clave.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
