import React from 'react';
import { BookOpen, PenTool, BrainCircuit, TextCursorInput, Sparkles } from 'lucide-react';

const Dashboard = ({ setTab }) => {
  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '3rem' }}>🐄</span>
      </div>
      <h1 style={{ marginBottom: '4px' }}>Tecnología de la Piel</h1>
      <p className="text-center mb-4" style={{ fontSize: '0.95rem' }}>
        Tu plataforma interactiva para preparar el examen de Confección Industrial.
      </p>

      {/* Stats card */}
      <div className="glass-card mb-4" style={{ 
        background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
        textAlign: 'center',
        padding: '20px'
      }}>
        <Sparkles size={28} color="var(--accent)" style={{ marginBottom: '8px' }} />
        <h3 style={{ color: 'var(--accent)', marginBottom: '4px' }}>Contenido disponible</h3>
        <div className="flex justify-between" style={{ flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
          <div style={{ flex: 1, minWidth: '80px' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>72</p>
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Preguntas test</p>
          </div>
          <div style={{ flex: 1, minWidth: '80px' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>40</p>
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Frases completar</p>
          </div>
          <div style={{ flex: 1, minWidth: '80px' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>10</p>
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Flashcards</p>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="glass-card" onClick={() => setTab('study')} style={{ cursor: 'pointer' }}>
          <div className="flex items-center mb-4" style={{ gap: '10px' }}>
            <BookOpen size={26} color="var(--accent)" />
            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Teoría</h3>
          </div>
          <p style={{ fontSize: '0.9rem', margin: 0 }}>Repasa los 6 bloques del temario con apuntes interactivos.</p>
        </div>

        <div className="glass-card" onClick={() => setTab('quiz')} style={{ cursor: 'pointer' }}>
          <div className="flex items-center mb-4" style={{ gap: '10px' }}>
            <PenTool size={26} color="var(--accent)" />
            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Test de Examen</h3>
          </div>
          <p style={{ fontSize: '0.9rem', margin: 0 }}>72 preguntas organizadas por temas. 10 aleatorias cada vez.</p>
        </div>

        <div className="glass-card" onClick={() => setTab('fill')} style={{ cursor: 'pointer' }}>
          <div className="flex items-center mb-4" style={{ gap: '10px' }}>
            <TextCursorInput size={26} color="var(--accent)" />
            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Completar Frases</h3>
          </div>
          <p style={{ fontSize: '0.9rem', margin: 0 }}>40 frases con huecos para memorizar datos técnicos clave.</p>
        </div>

        <div className="glass-card" onClick={() => setTab('flashcards')} style={{ cursor: 'pointer' }}>
          <div className="flex items-center mb-4" style={{ gap: '10px' }}>
            <BrainCircuit size={26} color="var(--accent)" />
            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Flashcards</h3>
          </div>
          <p style={{ fontSize: '0.9rem', margin: 0 }}>Tarjetas de memoria para repasar los conceptos clave rápido.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
